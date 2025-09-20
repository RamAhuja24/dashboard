import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function CustomBreadcrumbs({
  heading,
  links = [],
  action,
  activeLast = false,
  separator,
  autoGenerate = false,
  sx,
  ...other
}) {
  const location = useLocation();

  const formatSegmentName = (segment) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) {
      return [{ name: 'Dashboard' }, { name: 'Default' }];
    }

    const breadcrumbs = [];

    // Process all path segments dynamically
    pathSegments.forEach((segment, index) => {
      const name = formatSegmentName(segment);

      // Build the href for each breadcrumb (except the last one)
      const href = index < pathSegments.length - 1
        ? '/' + pathSegments.slice(0, index + 1).join('/')
        : undefined;

      breadcrumbs.push({ name, href });
    });

    // Special handling for root dashboard case
    if (pathSegments.length === 0 || (pathSegments.length === 1 && pathSegments[0] === '')) {
      return [{ name: 'Dashboard' }, { name: 'Default' }];
    }

    return breadcrumbs;
  };

  // Use auto-generated links if autoGenerate is true and no links provided
  const finalLinks = autoGenerate && links.length === 0 ? generateBreadcrumbs() : links;

  return (
    <Box sx={sx} {...other}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING */}
          {heading && (
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS */}
          {!!finalLinks.length && (
            <Breadcrumbs
              separator={separator || <Separator />}
              sx={{
                '& .MuiBreadcrumbs-ol': {
                  alignItems: 'center',
                },
                '& .MuiBreadcrumbs-separator': {
                  mx: { xs: 0.5, sm: 0.75 },
                  color: 'text.secondary',
                },
              }}
              {...other}
            >
              {finalLinks.map((link, index) => {
                const { name, href } = link;
                const isLast = index === finalLinks.length - 1;

                return (
                  <LinkItem
                    key={`${name}-${index}`}
                    link={link}
                    activeLast={activeLast}
                    isLast={isLast}
                    disabled={(!href && !isLast) || false}
                  />
                );
              })}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>
    </Box>
  );
}

CustomBreadcrumbs.propTypes = {
  action: PropTypes.node,
  activeLast: PropTypes.bool,
  autoGenerate: PropTypes.bool,
  heading: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
      icon: PropTypes.node,
    })
  ),
  separator: PropTypes.node,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

function LinkItem({ link, activeLast, isLast, disabled }) {
  const { name, href, icon } = link;

  const getColor = () => {
    if (isLast) {
      return activeLast ? 'text.disabled' : 'text.primary';
    }
    return disabled ? 'text.disabled' : 'text.breadcrumbInactive';
  };

  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: getColor(),
    display: 'inline-flex',
    fontSize: { xs: '0.8rem', sm: '0.875rem' },
    fontWeight: isLast ? 600 : 400,
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
    ...(href && {
      cursor: 'pointer',
      '&:hover': {
        color: isLast ? 'text.primary' : 'text.secondary',
        textDecoration: 'none',
      },
    }),
    ...(disabled && {
      cursor: 'default',
      pointerEvents: 'none',
    }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </>
  );

  if (href) {
    return (
      <Link href={href} sx={styles}>
        {renderContent}
      </Link>
    );
  }

  return (
    <Typography
      variant="body2"
      sx={styles}
    >
      {renderContent}
    </Typography>
  );
}

LinkItem.propTypes = {
  activeLast: PropTypes.bool,
  disabled: PropTypes.bool,
  isLast: PropTypes.bool,
  link: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    icon: PropTypes.node,
  }),
};

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: 'text.disabled',
      }}
    />
  );
}