export const MainFeaturedSchemaEnhancer = (props) => {
  const { schema } = props;
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
        ],
      },
      {
        ...schema.fieldsets[1],
      },
    ],
  };
};
