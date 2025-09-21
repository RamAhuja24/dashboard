import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Stack,
  TextField,
  IconButton,
  Select,
  FormControl,
  MenuItem,
  Checkbox,
  Typography,
  Button,
  Drawer,
  Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const OrdersTableFilters = memo(({
  open,
  filters,
  statusOptions,
  onClose,
  onFilterChange,
  onFilterReset,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      PaperProps={{
        sx: { width: 350 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2, pr: 1, pl: 2.5 }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filter Orders
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>
      <Divider />

      <Box sx={{ p: 2.5 }}>
        <Stack spacing={3}>
          {/* Status Filter */}
          <Stack>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Status
            </Typography>
            <FormControl fullWidth>
              <Select
                multiple
                value={filters.status}
                onChange={(e) => onFilterChange('status', e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    <Checkbox checked={filters.status.indexOf(status) > -1} />
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* Date Range Filter */}
          <Stack>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Date Range
            </Typography>
            <Stack spacing={2}>
              <TextField
                type="date"
                label="From Date"
                value={filters.dateFrom || ''}
                onChange={(e) => onFilterChange('dateFrom', e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                type="date"
                label="To Date"
                value={filters.dateTo || ''}
                onChange={(e) => onFilterChange('dateTo', e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Stack>
          </Stack>

          {/* Amount Range Filter */}
          <Stack>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Amount Range
            </Typography>
            <Stack spacing={2}>
              <TextField
                type="number"
                label="Min Amount"
                value={filters.amountMin}
                onChange={(e) => onFilterChange('amountMin', e.target.value)}
                fullWidth
              />
              <TextField
                type="number"
                label="Max Amount"
                value={filters.amountMax}
                onChange={(e) => onFilterChange('amountMax', e.target.value)}
                fullWidth
              />
            </Stack>
          </Stack>

          {/* Filter Actions */}
          <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
            <Button
              variant="outlined"
              onClick={onFilterReset}
              fullWidth
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              fullWidth
            >
              Apply Filters
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
});

OrdersTableFilters.displayName = 'OrdersTableFilters';

OrdersTableFilters.propTypes = {
  open: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  statusOptions: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onFilterReset: PropTypes.func.isRequired,
};

export default OrdersTableFilters;