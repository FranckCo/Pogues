import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/questionnaires/')({
  loader: ({ context }) => {
    throw redirect({
      to: '/questionnaires/$stamp',
      params: { stamp: context.user?.stamp ?? '' },
    });
  },
});
