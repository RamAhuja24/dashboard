import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

const OrdersTableRow = memo(({
  order,
  isSelected,
  onSelectClick,
}) => {
  const theme = useTheme();

  return (
    <TableRow
      hover
      selected={isSelected}
      sx={{
        '&:hover': {
          bgcolor: alpha(theme.palette.grey[50], 0.5),
        },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <TableCell
        padding="checkbox"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2
        }}
      >
        <Checkbox
          checked={isSelected}
          onChange={() => onSelectClick(order.orderId)}
          size="small"
        />
      </TableCell>

      <TableCell
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2
        }}
      >
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {order.orderId}
        </Typography>
      </TableCell>

      <TableCell
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: '0.875rem',
              bgcolor: order.user.name === 'Drew Cano' ? 'error.main' : 'grey.300',
              color: order.user.name === 'Drew Cano' ? 'white' : 'text.primary'
            }}
          >
            {order.user.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Typography variant="body2" fontWeight={500} color="text.primary">
            {order.user.name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2
        }}
      >
        <Typography variant="body2" color="text.primary">
          {order.project}
        </Typography>
      </TableCell>

      <TableCell
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {order.address}
        </Typography>
      </TableCell>

      <TableCell
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {order.dateLabel}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2
        }}
      >
        <Chip
          label={order.status.label}
          size="small"
          color={order.status.color}
          variant="outlined"
          sx={{
            fontWeight: 500,
            fontSize: '0.75rem',
            height: 24,
          }}
        />
      </TableCell>
    </TableRow>
  );
});

OrdersTableRow.displayName = 'OrdersTableRow';

OrdersTableRow.propTypes = {
  order: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectClick: PropTypes.func.isRequired,
};

export default OrdersTableRow;