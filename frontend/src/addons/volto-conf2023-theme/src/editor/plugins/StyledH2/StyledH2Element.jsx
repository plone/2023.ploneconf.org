import React from 'react';

const StyledH2Element = (props) => {
  const { attributes, children } = props;

  return (
    <h2 className={'underlined-header'} {...attributes}>
      {children}
    </h2>
  );
};

export default StyledH2Element;
