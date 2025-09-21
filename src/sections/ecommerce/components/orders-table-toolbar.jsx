import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  FormControl,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  FilterList,
  Clear,
  Download,
} from '@mui/icons-material';

const OrdersTableToolbar = memo(({
  searchQuery,
  searchKey,
  selected,
  orders,
  hasActiveFilters,
  searchOptions,
  onSearchChange,
  onSearchKeyChange,
  onSearchClear,
  onAddOrder,
  onEditOrder,
  onDeleteOrder,
  onBulkDelete,
  onFilterToggle,
  onExportClick,
}) => {
  const handleEditSingleOrder = useCallback(() => {
    const order = orders.find(o => o.orderId === selected[0]);
    onEditOrder(order);
  }, [orders, selected, onEditOrder]);

  const handleDeleteSingleOrder = useCallback(() => {
    const order = orders.find(o => o.orderId === selected[0]);
    onDeleteOrder(order);
  }, [orders, selected, onDeleteOrder]);

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-start', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      {/* Left side - Dynamic Action buttons */}
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {selected.length === 0 && (
          <IconButton
            size="small"
            onClick={onAddOrder}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 0.75
            }}
          >
            <Add sx={{ fontSize: 16 }} />
          </IconButton>
        )}

        {selected.length === 1 && (
          <>
            <IconButton
              size="small"
              onClick={handleEditSingleOrder}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 0.75
              }}
            >
              <Edit sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDeleteSingleOrder}
              sx={{
                border: '1px solid',
                borderColor: 'error.main',
                borderRadius: 1,
                p: 0.75,
                color: 'error.main'
              }}
            >
              <Delete sx={{ fontSize: 16 }} />
            </IconButton>
          </>
        )}

        {selected.length > 1 && (
          <IconButton
            size="small"
            onClick={onBulkDelete}
            sx={{
              border: '1px solid',
              borderColor: 'error.main',
              borderRadius: 1,
              p: 0.75,
              color: 'error.main'
            }}
          >
            <Delete sx={{ fontSize: 16 }} />
          </IconButton>
        )}

        <Badge color="error" variant="dot" invisible={!hasActiveFilters}>
          <IconButton
            size="small"
            onClick={onFilterToggle}
            sx={{
              border: '1px solid',
              borderColor: hasActiveFilters ? 'primary.main' : 'divider',
              borderRadius: 1,
              p: 0.75,
              color: hasActiveFilters ? 'primary.main' : 'text.secondary'
            }}
          >
            <FilterList sx={{ fontSize: 16 }} />
          </IconButton>
        </Badge>

        <IconButton
          size="small"
          onClick={onExportClick}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 0.75
          }}
        >
          <Download sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>

      {/* Right side - Search */}
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <FormControl
          size="small"
          sx={{
            flexShrink: 0,
            width: { xs: 120, md: 140 },
          }}
        >
          <Select
            value={searchKey}
            onChange={onSearchKeyChange}
            sx={{
              height: 36,
              borderRadius: 1.5,
              bgcolor: 'background.paper',
            }}
          >
            {searchOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={onSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary', fontSize: 18 }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={onSearchClear}
                  sx={{ color: 'text.secondary' }}
                >
                  <Clear sx={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: { xs: '100%', md: 400 },
            '& .MuiOutlinedInput-root': {
              height: 36,
              borderRadius: 1.5,
              bgcolor: 'background.paper',
              '& fieldset': {
                borderColor: 'divider',
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
});

OrdersTableToolbar.displayName = 'OrdersTableToolbar';

OrdersTableToolbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  searchKey: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  hasActiveFilters: PropTypes.bool.isRequired,
  searchOptions: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchKeyChange: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired,
  onAddOrder: PropTypes.func.isRequired,
  onEditOrder: PropTypes.func.isRequired,
  onDeleteOrder: PropTypes.func.isRequired,
  onBulkDelete: PropTypes.func.isRequired,
  onFilterToggle: PropTypes.func.isRequired,
  onExportClick: PropTypes.func.isRequired,
};

export default OrdersTableToolbar;