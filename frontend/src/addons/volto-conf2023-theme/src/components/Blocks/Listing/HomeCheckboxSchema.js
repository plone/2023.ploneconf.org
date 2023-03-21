import { defineMessages } from 'react-intl';

const messages = defineMessages({
  homeBlockConfiguration: {
    id: 'homeBlockConfiguration',
    defaultMessage: 'Is it a home Block?',
  },
  homeBlockTitle: {
    id: 'homeBlockTitle',
    defaultMessage: 'Is it a home Block?',
  },
  homeBlockDescription: {
    id: 'homeBlockDescription',
    defaultMessage: 'Check it if it is a home block',
  },
});

export const HomeCheckboxSchema = (props) => {
  const { intl, schema } = props;

  return {
    ...schema,
    fieldsets: [
      ...schema.fieldsets,
      {
        id: 'homeBlock',
        title: intl.formatMessage(messages.homeBlockConfiguration),
        fields: ['homeBlock'],
      },
    ],
    properties: {
      ...schema.properties,
      homeBlock: {
        title: intl.formatMessage(messages.homeBlockTitle),
        description: intl.formatMessage(messages.homeBlockDescription),
        type: 'boolean',
        default: false,
      },
    },
  };
};
