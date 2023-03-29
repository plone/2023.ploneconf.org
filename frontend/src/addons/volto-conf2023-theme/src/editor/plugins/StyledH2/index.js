import { defineMessages } from 'react-intl';
import StyledH2Element from './StyledH2Element';
import { withStyledH2 } from './extensions';
import { StyledH2 } from './constants';
import tooltipSVG from '@plone/volto/icons/help.svg';
import { makeInlineElementPlugin } from '@plone/volto-slate/elementEditor';
import { StyledH2EditorSchema } from './schema';

const messages = defineMessages({
  edit: {
    id: 'Edit styled h2',
    defaultMessage: 'Edit styled h2',
  },
  delete: {
    id: 'Remove styled h2',
    defaultMessage: 'Remove styled h2',
  },
});

export default function installStyledH2Plugin(config) {
  const opts = {
    title: 'StyledH2',
    pluginId: StyledH2,
    elementType: StyledH2,
    element: StyledH2Element,
    isInlineElement: true,
    editSchema: StyledH2EditorSchema,
    extensions: [withStyledH2],
    hasValue: (formData) => !!formData,
    toolbarButtonIcon: tooltipSVG,
    messages,
  };
  const [installEditor] = makeInlineElementPlugin(opts);
  config = installEditor(config);
  return config;
}
