import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

export default function NotificationItem({ notification, onMarkAsRead }) {
  const handleClick = useCallback(() => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  }, [notification.id, notification.read, onMarkAsRead]);

  const renderAvatar = (
    <ListItemAvatar>
      {notification.avatar ? (
        <Avatar src={notification.avatar} sx={{ width: 40, height: 40 }} />
      ) : (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: getNotificationColor(notification.type),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <Box className="material-icons" sx={{ fontSize: 20 }}>
            {getNotificationIcon(notification.type)}
          </Box>
        </Box>
      )}
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: '0.875rem',
            fontWeight: notification.read ? 400 : 600,
            color: notification.read ? 'text.secondary' : 'text.primary',
            mb: 0.5,
          }}
        >
          {notification.title}
        </Typography>
      }
      secondary={
        <Stack spacing={0.5}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              lineHeight: 1.4,
            }}
          >
            {notification.description}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
              fontSize: '0.6875rem',
            }}
          >
            {fToNow(notification.createdAt)}
          </Typography>
        </Stack>
      }
    />
  );

  const renderUnReadBadge = !notification.read && (
    <Box
      sx={{
        top: 16,
        right: 16,
        width: 8,
        height: 8,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  return (
    <ListItemButton
      disableRipple
      onClick={handleClick}
      sx={{
        py: 2,
        px: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        ...(notification.read && {
          bgcolor: 'action.hover',
          opacity: 0.8,
        }),
        '&:hover': {
          bgcolor: 'action.selected',
        },
      }}
    >
      {renderUnReadBadge}
      {renderAvatar}
      <Box sx={{ flexGrow: 1, ml: 2 }}>{renderText}</Box>
    </ListItemButton>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
  onMarkAsRead: PropTypes.func,
};

function getNotificationColor(type) {
  switch (type) {
    case 'order':
      return '#00A76F';
    case 'chat':
      return '#1890FF';
    case 'mail':
      return '#FF5630';
    case 'delivery':
      return '#FFAB00';
    default:
      return '#637381';
  }
}

function getNotificationIcon(type) {
  switch (type) {
    case 'order':
      return 'shopping_bag';
    case 'chat':
      return 'chat';
    case 'mail':
      return 'mail';
    case 'delivery':
      return 'local_shipping';
    default:
      return 'notifications';
  }
}