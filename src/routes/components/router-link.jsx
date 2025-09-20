import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const RouterLink = forwardRef(({ href, children, ...other }, ref) => (
  <Link ref={ref} to={href} {...other}>
    {children}
  </Link>
));

RouterLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default RouterLink;