import { FieldApi, useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { postQuestionnaire } from '@/api/questionnaires';
import { getAccessToken } from '@/api/utils';
import Button, { ButtonType } from '@/components/ui/Button';
import ButtonLink from '@/components/ui/ButtonLink';
import Checkbox from '@/components/ui/Checkbox';
import ContentHeader from '@/components/ui/ContentHeader';
import ContentMain from '@/components/ui/ContentMain';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Questionnaire, TargetModes } from '@/models/questionnaires';
import { uid } from '@/utils/utils';

interface FormValues {
  title: string;
  targetModes: Set<TargetModes>;
}

const questionnaireSchema = z.object({
  title: z.string().min(1, 'You must provide a title'),
  targetModes: z
    .set(z.nativeEnum(TargetModes))
    .min(1, 'You must select at least one target mode'),
});

/** Create a new questionnaire. */
export default function CreateQuestionnaire() {
  const { user } = useRouteContext({
    from: '__root__',
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      questionnaire,
      stamp,
      token,
    }: {
      questionnaire: Questionnaire;
      stamp: string;
      token: string;
    }) => {
      return postQuestionnaire(questionnaire, stamp, token);
    },
  });

  const { Field, Subscribe, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: '',
      targetModes: new Set(),
    },
    validators: { onMount: questionnaireSchema, onChange: questionnaireSchema },
    onSubmit: async ({ value }) => {
      // Handle form submission
      await submitQuestionnaire(value);
      //submitQuestionnaire(value)
    },
  });

  const submitQuestionnaire = async ({ title, targetModes }: FormValues) => {
    if (user) {
      // TODO get token from tanstack router
      const token = await getAccessToken();
      // TODO should never happen and be handled in auth route
      if (!token || user.stamp === undefined) {
        toast.error('Unauthorized.');
        return;
      }
      const id = uid();
      const questionnaire = {
        id,
        title,
        targetModes,
      };
      const promise = mutation.mutateAsync(
        { questionnaire, stamp: user.stamp, token },
        {
          onSuccess: () =>
            void navigate({
              to: '/questionnaire/$questionnaireId',
              params: { questionnaireId: id },
            }),
        },
      );
      toast.promise(promise, {
        loading: 'Loading',
        success: 'Questionnaire created',
        error: (err: Error) => err.toString(),
      });
    }
  };

  return (
    <div>
      <ContentHeader title="Nouveau questionnaire" />
      <ContentMain>
        <div className="bg-default p-4 border border-default shadow-xl">
          <div className="grid gap-4">
            <Field name="title">
              {(field) => (
                <Input
                  label={'Titre'}
                  onChange={(v) => field.handleChange(v as string)}
                  autoFocus
                  value={field.state.value}
                  required
                />
              )}
            </Field>
            <div>
              <Label required>Mode de collecte</Label>
              <div className="flex gap-x-4">
                <Field name="targetModes">
                  {(field) => (
                    <>
                      <TargetModeCheckbox
                        label="CAPI"
                        value={TargetModes.CAPI}
                        field={field}
                      />
                      <TargetModeCheckbox
                        label="CAWI"
                        value={TargetModes.CAWI}
                        field={field}
                      />
                      <TargetModeCheckbox
                        label="CATI"
                        value={TargetModes.CATI}
                        field={field}
                      />
                      <TargetModeCheckbox
                        label="PAPI"
                        value={TargetModes.PAPI}
                        field={field}
                      />
                    </>
                  )}
                </Field>
              </div>
            </div>
            <Input
              label={'Spécification dynamique'}
              value={'Filtres'}
              disabled
              onChange={() => {}}
            />
            <Input
              label={'Spécification des formules'}
              value={'VTL'}
              disabled
              onChange={() => {}}
            />
          </div>
          <div className="flex gap-x-2 mt-6">
            <ButtonLink to={'/questionnaires'}>Annuler</ButtonLink>
            <Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type={ButtonType.Primary}
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={!canSubmit}
                >
                  Valider
                </Button>
              )}
            </Subscribe>
          </div>
        </div>
      </ContentMain>
    </div>
  );
}

function TargetModeCheckbox({
  label,
  value,
  field,
}: Readonly<{
  label: string;
  value: TargetModes;
  field: FieldApi<
    FormValues,
    'targetModes',
    undefined,
    undefined,
    Set<TargetModes>
  >;
}>) {
  return (
    <Checkbox
      label={label}
      checked={field.state.value.has(value)}
      onChange={(v) =>
        field.handleChange(changeSetValue(field.state.value, value, v))
      }
    />
  );
}

function changeSetValue<T>(
  set: Set<T>,
  value: T,
  shouldHaveValue: boolean,
): Set<T> {
  if (shouldHaveValue) return addSetValue(set, value);
  return removeSetValue(set, value);
}

function addSetValue<T>(set: Set<T>, value: T): Set<T> {
  return new Set(set).add(value);
}

function removeSetValue<T>(set: Set<T>, value: T): Set<T> {
  const res = new Set(set);
  res.delete(value);
  return res;
}
