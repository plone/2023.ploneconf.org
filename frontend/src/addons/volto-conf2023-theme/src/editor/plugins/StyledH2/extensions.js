import { StyledH2 } from './constants';

export const withStyledH2 = (editor) => {
  const { isInline } = editor; // we can also normalize plugin data here

  editor.isInline = (element) => {
    return element.type === StyledH2 ? true : isInline(element);
  };

  return editor;
};
