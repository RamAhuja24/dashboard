import { memo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import { Search, Close } from '@mui/icons-material';

function Searchbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchQuery('');
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const renderButton = (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={handleOpen}>
        <Search />
      </IconButton>
    </Stack>
  );

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{
          sx: {
            mt: 15,
            overflow: 'unset',
            borderRadius: 2,
          },
        }}
        sx={{
          [`& .${dialogClasses.container}`]: {
            alignItems: 'flex-start',
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Search sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  ESC
                </Typography>
              </InputAdornment>
            }
            inputProps={{
              sx: { typography: 'h6' },
            }}
          />
        </Box>

        <Box sx={{ p: 3, height: 400 }}>
          {searchQuery ? (
            <Typography variant="body2" color="text.secondary">
              Search results for "{searchQuery}"
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Start typing to search...
            </Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
}

export default memo(Searchbar);