import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function CustomBreadcrumbs({
  heading,
  links,
  action,
  activeLast,
  sx,
  ...other
}) {
  const lastLink = links[links.length - 1].name;

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
          {!!links.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link) => {
                const { name, href, icon } = link;

                return (
                  <LinkItem
                    key={name}
                    link={link}
                    activeLast={activeLast}
                    disabled={(!href && name !== lastLink) || false}
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
  heading: PropTypes.string,
  links: PropTypes.array,
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

function LinkItem({ link, activeLast, disabled }) {
  const { name, href, icon } = link;

  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        pointerEvents: 'none',
        color: 'text.disabled',
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
      sx={{
        ...styles,
        ...(activeLast && { color: 'text.disabled' }),
      }}
    >
      {renderContent}
    </Typography>
  );
}

LinkItem.propTypes = {
  activeLast: PropTypes.bool,
  disabled: PropTypes.bool,
  link: PropTypes.object,
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