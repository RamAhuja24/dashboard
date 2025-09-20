import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

const notifications = [
  {
    id: 1,
    title: 'You have a bug that needs...',
    time: 'Just now',
    avatar: null,
    type: 'bug',
    color: '#00A76F',
  },
  {
    id: 2,
    title: 'New user registered',
    time: '59 minutes ago',
    avatar: null,
    type: 'user',
    color: '#1890FF',
  },
  {
    id: 3,
    title: 'You have a bug that needs...',
    time: '12 hours ago',
    avatar: null,
    type: 'bug',
    color: '#00A76F',
  },
  {
    id: 4,
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM',
    avatar: null,
    type: 'subscribe',
    color: '#7B61FF',
  },
];


export default function ExactNotificationsPanel({ open, onClose }) {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 360 },
          bgcolor: 'background.default',
          borderLeft: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.125rem' }}>
          Notifications
        </Typography>
      </Box>

      <Divider />

      {/* Notifications Section */}
      <Box sx={{ px: 3, py: 2 }}>
        <List disablePadding>
          {notifications.map((notification) => (
            <ListItem key={notification.id} disablePadding sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: alpha(notification.color, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    className="material-icons"
                    sx={{
                      fontSize: 20,
                      color: notification.color,
                    }}
                  >
                    {notification.type === 'bug' ? 'bug_report' :
                     notification.type === 'user' ? 'person_add' :
                     notification.type === 'subscribe' ? 'person_add' : 'notifications'}
                  </Box>
                  {notification.id <= 2 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: notification.color,
                      }}
                    />
                  )}
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem', mb: 0.5 }}>
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    {notification.time}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

    </Drawer>
  );
}

ExactNotificationsPanel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};