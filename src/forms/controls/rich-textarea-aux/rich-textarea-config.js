export const toolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS'],
  INLINE_STYLE_BUTTONS: [{ label: 'Bold', style: 'BOLD' }, { label: 'Italic', style: 'ITALIC' }],
  LINK_BUTTONS: {
    ADD: { label: 'Link or Tooltip', iconName: 'link', placeholder: 'Insert an URL or a tooltip' },
    REMOVE: { label: 'Remove Link or Tooltip', iconName: 'remove-link' },
  },
};

export const rootStyle = {
  display: 'flex',
  flexDirection: 'column-reverse',
};