import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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

const activities = [
  {
    id: 1,
    title: 'You have a bug that needs...',
    time: 'Just now',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 2,
    title: 'Released a new version',
    time: '59 minutes ago',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 3,
    title: 'Submitted a bug',
    time: '12 hours ago',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 4,
    title: 'Modified A data in Page X',
    time: 'Today, 11:59 AM',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 5,
    title: 'Deleted a page in Project X',
    time: 'Feb 2, 2023',
    avatar: '/api/placeholder/32/32',
  },
];

const contacts = [
  {
    id: 1,
    name: 'Natali Craig',
    avatar: 'N',
    online: true,
    color: '#FF5630',
  },
  {
    id: 2,
    name: 'Drew Cano',
    avatar: 'D',
    online: false,
    color: '#1890FF',
  },
  {
    id: 3,
    name: 'Orlando Diggs',
    avatar: 'O',
    online: true,
    color: '#00A76F',
  },
  {
    id: 4,
    name: 'Andi Lane',
    avatar: 'A',
    online: false,
    color: '#FFAB00',
  },
  {
    id: 5,
    name: 'Kate Morrison',
    avatar: 'K',
    online: true,
    color: '#7B61FF',
  },
  {
    id: 6,
    name: 'Koray Okumus',
    avatar: 'K',
    online: false,
    color: '#FF9800',
  },
];

export default function ExactNotificationsPanel({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

      <Divider />

      {/* Activities Section */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, fontSize: '0.875rem' }}>
          Activities
        </Typography>
        <List disablePadding>
          {activities.map((activity) => (
            <ListItem key={activity.id} disablePadding sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'grey.300',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {activity.id}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem', mb: 0.5 }}>
                    {activity.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    {activity.time}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Contacts Section */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, fontSize: '0.875rem' }}>
          Contacts
        </Typography>
        <List disablePadding>
          {contacts.map((contact) => (
            <ListItem key={contact.id} disablePadding sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Badge
                  color={contact.online ? 'success' : 'default'}
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: contact.color,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'white',
                    }}
                  >
                    {contact.avatar}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {contact.name}
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