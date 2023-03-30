export const StyledH2EditorSchema = {
  title: 'StyledH2',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [],
    },
  ],
  properties: {
    tooltip_position: {
      title: 'Position',
      type: 'string',
      factory: 'Choice',
      choices: [
        ['right center', 'Right'],
        ['left center', 'Left'],
      ],
    },
    tooltip_text: {
      title: 'Text',
      type: 'string',
    },
  },
  required: [],
};
