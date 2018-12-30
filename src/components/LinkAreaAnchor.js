import React from 'react';
import { Link } from '@reach/router';
import { LinkAreaContext } from './LinkArea';

export const LinkAreaAnchor = props => {
  const ref = React.useContext(LinkAreaContext);

  if (props.href) {
    return <a {...props} ref={ref} />;
  }
  return <Link {...props} ref={ref} />;
};
