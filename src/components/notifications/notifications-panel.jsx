import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Drawer,
  Typography,
  Stack,
  Avatar,
  Divider,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Close, BugReport, PersonAdd, Code, Delete } from '@mui/icons-material';

const notifications = [
  {
    id: 1,
    title: 'You have a bug that needs...',
    time: 'Just now',
    avatar: '/api/placeholder/32/32',
    color: 'info',
    icon: <BugReport />,
  },
  {
    id: 2,
    title: 'New user registered',
    time: '59 minutes ago',
    avatar: '/api/placeholder/32/32',
    color: 'success',
    icon: <PersonAdd />,
  },
  {
    id: 3,
    title: 'You have a bug that needs...',
    time: '12 hours ago',
    avatar: '/api/placeholder/32/32',
    color: 'info',
    icon: <BugReport />,
  },
  {
    id: 4,
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM',
    avatar: '/api/placeholder/32/32',
    color: 'primary',
    icon: <PersonAdd />,
  },
];

const activities = [
  {
    id: 1,
    title: 'You have a bug that needs...',
    time: '59 minutes ago',
    avatar: '/api/placeholder/32/32',
    icon: <BugReport />,
  },
  {
    id: 2,
    title: 'Released a new version',
    time: '59 minutes ago',
    avatar: '/api/placeholder/32/32',
    icon: <Code />,
  },
  {
    id: 3,
    title: 'Submitted a bug',
    time: '12 hours ago',
    avatar: '/api/placeholder/32/32',
    icon: <BugReport />,
  },
  {
    id: 4,
    title: 'Modified A data in Page X',
    time: 'Today, 11:59 AM',
    avatar: '/api/placeholder/32/32',
    icon: <Code />,
  },
  {
    id: 5,
    title: 'Deleted a page in Project X',
    time: 'Feb 2, 2023',
    avatar: '/api/placeholder/32/32',
    icon: <Delete />,
  },
];

const contacts = [
  {
    id: 1,
    name: 'Natali Craig',
    avatar: '/api/placeholder/32/32',
    online: true,
  },
  {
    id: 2,
    name: 'Drew Cano',
    avatar: '/api/placeholder/32/32',
    online: false,
  },
  {
    id: 3,
    name: 'Orlando Diggs',
    avatar: '/api/placeholder/32/32',
    online: true,
  },
  {
    id: 4,
    name: 'Andi Lane',
    avatar: '/api/placeholder/32/32',
    online: false,
  },
  {
    id: 5,
    name: 'Kate Morrison',
    avatar: '/api/placeholder/32/32',
    online: true,
  },
  {
    id: 6,
    name: 'Koray Okumus',
    avatar: '/api/placeholder/32/32',
    online: false,
  },
];

export default function NotificationsPanel({ open, onClose }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          bgcolor: 'background.default',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold">
          Notifications
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {/* Notifications Section */}
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemAvatar>
                <Badge
                  color={notification.color}
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {notification.icon}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="medium">
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Activities Section */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Activities
          </Typography>
        </Box>

        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemAvatar>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="medium">
                    {activity.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Contacts Section */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Contacts
          </Typography>
        </Box>

        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <ListItemAvatar>
                <Badge
                  color={contact.online ? 'success' : 'default'}
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {contact.name.charAt(0)}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="medium">
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

NotificationsPanel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};