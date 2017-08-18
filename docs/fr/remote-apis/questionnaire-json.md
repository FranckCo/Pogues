# Représentation en JSON des questionnaires

Pour être visalisé, un questionnaire doit satisfaire le [schéma XML](./schema.md). En `JSON`, les éléments où `maxMaxOccurs` à la valeur `unbounded` sont représentés par des tableaux.

Par exemple, cet élément défini dans le schéma:
```xml
<xs:element name="Child" type="ComponentType" minOccurs="0" maxOccurs="unbounded"/>
```
sera représenté en `JSON` de la façon suivante:
```json
{
  "Child": [...]
}
```

TODO validate from a server perspective

Ainsi, en `JSON`, le questionnaire est représenté ressemble à:

```json
{
  "Questionnaire": {
    "id": "iytt95l9",
    "Name": "FIRSTQUESTIONNAIRE",
    "Label": [""],
    "Declaration": [],
    "GoTo": [],
    "Control": [],
    "genericName": "QUESTIONNAIRE",
    "Child": [
      {
        "id": "iytt3i83",
        "Name": "SEQ1",
        "Label": ["About you"],
        "Declaration": [],
        "GoTo": [],
        "Control": [],
        "genericName": "MODULE",
        "Child": [
          {
            "id": "iytssbr3",
            "Name": "QUESTION11",
            "Label": ["##{\"label\":\"How old are you ?\",\"conditions\":[]}\nHow old are you ?"],
            "Declaration": [],
            "GoTo": [],
            "Control": [],
            "questionType": "SIMPLE",
            "Response": [
              {
                "mandatory": false,
                "Datatype": {
                  "typeName": "TEXT",
                  "MaxLength": 1,
                  "Pattern": "",
                  "type": "TextDatatypeType"
                }
              }
            ],
            "type": "QuestionType"
          },
          {
            "id": "iytt2wlp",
            "Name": "QUESTION12",
            "Label": ["##{\"label\":\"Are you happy ?\",\"conditions\":[]}\nAre you happy ?"],
            "Declaration": [],
            "GoTo": [],
            "Control": [],
            "questionType": "SINGLE_CHOICE",
            "Response": [
              {
                "CodeListReference": "iyttj4zk",
                "mandatory": false,
                "Datatype": {
                  "typeName": "TEXT",
                  "MaxLength": 1,
                  "Pattern": "",
                  "type": "TextDatatypeType",
                  "visualizationHint": "CHECKBOX"
                }
              }
            ],
            "type": "QuestionType"
          }
        ],
        "depth": 1,
        "type": "SequenceType"
      },
      {
        "id": "iyttf4qh",
        "Name": "SEQ2",
        "Label": ["About your job"],
        "Declaration": [],
        "GoTo": [],
        "Control": [],
        "genericName": "MODULE",
        "Child": [
          {
            "id": "iytth8g0",
            "Name": "QUESTION21",
            "Label": ["##{\"label\":\"Do you have a job ?\",\"conditions\":[]}\nDo you have a job ?"],
            "Declaration": [],
            "GoTo": [],
            "Control": [],
            "questionType": "SIMPLE",
            "Response": [
              {
                "mandatory": false,
                "Datatype": {
                  "typeName": "BOOLEAN",
                  "type": "BooleanDatatypeType"
                }
              }
            ],
            "type": "QuestionType"
          }
        ],
        "depth": 1,
        "type": "SequenceType"
      }
    ],
    "depth": 0,
    "type": "SequenceType",
    "agency": "fr.insee",
    "Survey": {
      "agency": "fr.insee",
      "Name": "POPO",
      "id": "iytszu62"
    },
    "ComponentGroup": [
      {
        "Name": "PAGE_1",
        "Label": "Components for page 1",
        "MemberReference": [
          "iytt3i83",
          "iytssbr3",
          "iytt2wlp",
          "iyttf4qh",
          "iytth8g0"
        ],
        "id": "iytth42b"
      }
    ],
    "CodeLists": {
      "CodeList": [
        {
          "id": "iyttj4zk",
          "Name": "",
          "Label": "mood",
          "Code": [
            {
              "Label": "unhappy",
              "Value": ""
            },
            {
              "Label": "happy",
              "Value": ""
            },
            {
              "Label": "very happy",
              "Value": ""
            }
          ]
        }
      ],
      "CodeListSpecification": []
    }
  }
}
```