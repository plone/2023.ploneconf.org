import React from 'react';
import PropTypes from 'prop-types';

/**
 * StringToHTML component doc.
 * @function StringToHTML
 * @param {string} string string to parse to html.
 * @example <StringToHTML string="<p>HTML String</p>"/>
 *
 */
const StringToHTML = ({ string, className, as = null }) => {
  const Tagname = as ? as : 'div';
  return (
    <Tagname
      className={className}
      dangerouslySetInnerHTML={{ __html: string }}
    />
  );
};

StringToHTML.propTypes = {
  string: PropTypes.string.isRequired,
};
export default StringToHTML;
