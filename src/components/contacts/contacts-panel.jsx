import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

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

export default function ContactsPanel({ open, onClose }) {

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
          Contacts
        </Typography>
      </Box>

      <Divider />

      {/* Contacts Section */}
      <Box sx={{ px: 3, py: 2 }}>
        <List disablePadding>
          {contacts.map((contact) => (
            <ListItem key={contact.id} disablePadding sx={{ py: 1.5 }}>
              <ListItemAvatar>
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
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {contact.name}
                  </Typography>
                }
              />
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: contact.online ? 'success.main' : 'grey.400',
                  ml: 1,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

ContactsPanel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};