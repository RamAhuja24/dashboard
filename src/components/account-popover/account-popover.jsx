import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Dialog, Button, ListItemIcon, Popover } from '@mui/material';

import { Settings, Logout, DarkMode, LightMode } from '@mui/icons-material';

import { useSettingsContext } from 'src/components/settings';

const OPTIONS = [
  {
    icon: <DarkMode />,
    label: 'Dark Mode',
  },
];

export default function AccountPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const settings = useSettingsContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setConfirmLogoutOpen(false);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          B
        </Avatar>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 286, p: 0 },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5, display: 'flex' }}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              mr: 2,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            B
          </Avatar>
          <div>
            <Typography variant="subtitle2" sx={{ fontSize: '16px' }} noWrap>
              ByeWind User
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '12px' }} noWrap>
              user@byewind.com
            </Typography>
          </div>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span>{option.label}</span>
                {option.label === 'Dark Mode' && (
                  <Switch
                    checked={settings.themeMode === 'dark'}
                    onChange={(event) =>
                      settings.onUpdate('themeMode', event.target.checked ? 'dark' : 'light')
                    }
                    sx={{ ml: 'auto' }}
                  />
                )}
              </Box>
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ m: 1 }}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          General Settings
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => setConfirmLogoutOpen(true)} sx={{ m: 1 }}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Popover>

      <Dialog open={confirmLogoutOpen} onClose={() => setConfirmLogoutOpen(false)}>
        <Box sx={{ px: 3, py: 2 }}>
          <Typography variant="h6">Are you sure you want to log out?</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            You will be signed out of your account and redirected to the login page.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={() => setConfirmLogoutOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Log out
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}