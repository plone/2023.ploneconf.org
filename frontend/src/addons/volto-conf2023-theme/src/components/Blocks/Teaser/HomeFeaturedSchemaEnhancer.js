import { defineMessages } from 'react-intl';
const messages = defineMessages({
  subtitle: {
    id: 'subtitle',
    defaultMessage: 'Subtitle',
  },
  richtext: {
    id: 'richtext',
    defaultMessage: 'Text',
  },
  imageSide: {
    id: 'imageSide',
    defaultMessage: 'Image side',
  },
  imageSideDescription: {
    id: 'imageSideDescription',
    defaultMessage: 'Where to place the image',
  },
});

export const HomeFeaturedSchemaEnhancer = (props) => {
  const { intl, schema } = props;
  const fieldsToRemove = ['head_title', 'description'];
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
          'imageSide',
          'richtext',
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
      richtext: {
        title: intl.formatMessage(messages.richtext),
        widget: 'richtext',
      },
      imageSide: {
        title: intl.formatMessage(messages.imageSide),
        description: intl.formatMessage(messages.imageSideDescription),
        choices: [
          ['left', 'left'],
          ['right', 'right'],
        ],
        default: 'left',
      },
    },
  };
};
