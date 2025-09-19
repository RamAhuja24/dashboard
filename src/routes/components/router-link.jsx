import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const RouterLink = forwardRef(({ href, children, ...other }, ref) => (
  <a ref={ref} href={href} {...other}>
    {children}
  </a>
));

RouterLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default RouterLink;