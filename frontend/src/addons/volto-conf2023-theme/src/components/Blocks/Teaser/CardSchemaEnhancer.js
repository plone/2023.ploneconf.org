import { defineMessages } from 'react-intl';
const messages = defineMessages({
  subtitle: {
    id: 'subtitle',
    defaultMessage: 'Subtitle',
  },

  dates: {
    id: 'dates',
    defaultMessage: 'Dates',
  },
  color: {
    id: 'color',
    defaultMessage: 'Color',
  },
});

export const CardSchemaEnhancer = (props) => {
  const { intl, schema } = props;
  const fieldsToRemove = ['head_title'];
  return {
    ...schema,
    fieldsets: [
      {
        ...schema.fieldsets[0],
        fields: [
          ...schema.fieldsets[0].fields.filter(
            (f) => !fieldsToRemove.includes(f),
          ),
          'subtitle',
          'dates',
          'color',
        ],
      },
      {
        ...schema.fieldsets[1],
      },
    ],
    properties: {
      ...schema.properties,
      subtitle: {
        title: intl.formatMessage(messages.subtitle),
      },
      color: {
        title: intl.formatMessage(messages.color),
        choices: [
          ['primary', 'primary'],
          ['secondary', 'secondary'],
          ['tertiary', 'tertiary'],
        ],
      },
      dates: {
        title: intl.formatMessage(messages.dates),
      },
    },
  };
};
