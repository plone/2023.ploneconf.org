import { defineMessages } from 'react-intl';
const messages = defineMessages({
  imageSide: {
    id: 'imageSide',
    defaultMessage: 'Image side',
  },
  imageSideDescription: {
    id: 'imageSideDescription',
    defaultMessage: 'Where to place the image',
  },
});

export const TeaserImageSideSchemaEnhancer = (props) => {
  const { intl, schema } = props;
  return {
    ...schema,
    fieldsets: [
      {
        ...schema.fieldsets[0],
        fields: [...schema.fieldsets[0].fields, 'imageSide'],
      },
    ],
    properties: {
      ...schema.properties,
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
