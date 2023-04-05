import React from 'react';

const H2StyledElement = (props) => {
  const { attributes, children } = props;

  return (
    <h2 className={'underlined-header'} {...attributes}>
      {children}
    </h2>
  );
};

export default H2StyledElement;
