import { defineMessages } from 'react-intl';
const messages = defineMessages({
  mapslink: {
    id: 'mapslink',
    defaultMessage: 'mapslink',
  },
});

export const ImagedCardSchemaEnhancer = (props) => {
  const { intl, schema } = props;
  const fieldsToRemove = [];
  return {
    ...schema,
    fieldsets: [
      {
        ...schema.fieldsets[0],
        fields: [
          ...schema.fieldsets[0].fields.filter(
            (f) => !fieldsToRemove.includes(f),
          ),
          'mapslink',
        ],
      },
      {
        ...schema.fieldsets[1],
      },
    ],
    properties: {
      ...schema.properties,
      mapslink: {
        title: intl.formatMessage(messages.mapslink),
        type: 'boolean',
      },
    },
  };
};
