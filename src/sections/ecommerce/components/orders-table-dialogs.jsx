import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Menu,
} from '@mui/material';
import { Download } from '@mui/icons-material';

const OrdersTableDialogs = memo(({
  // Add Order Dialog
  addDialogOpen,
  newOrderForm,
  statusOptions,
  onAddDialogClose,
  onAddOrderSave,
  onNewOrderFormChange,

  // Edit Order Dialog
  editDialogOpen,
  selectedOrderForEdit,
  onEditDialogClose,
  onEditOrderSave,
  onEditOrderFormChange,

  // Delete Confirmation Dialog
  deleteDialogOpen,
  selectedOrderForDelete,
  onDeleteDialogClose,
  onDeleteOrderConfirm,

  // Export Menu
  exportMenuAnchor,
  onExportMenuClose,
  onExportCSV,
}) => {
  return (
    <>
      {/* Add Order Dialog */}
      <Dialog open={addDialogOpen} onClose={onAddDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Name"
                value={newOrderForm.user.name}
                onChange={(e) => onNewOrderFormChange('user', { ...newOrderForm.user, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Project"
                value={newOrderForm.project}
                onChange={(e) => onNewOrderFormChange('project', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={newOrderForm.address}
                onChange={(e) => onNewOrderFormChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Select
                  value={newOrderForm.status.label}
                  onChange={(e) => {
                    const statusColors = {
                      'In Progress': 'info',
                      'Complete': 'success',
                      'Pending': 'warning',
                      'Approved': 'success',
                      'Rejected': 'error'
                    };
                    onNewOrderFormChange('status', { label: e.target.value, color: statusColors[e.target.value] });
                  }}
                  displayEmpty
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={newOrderForm.amount}
                onChange={(e) => onNewOrderFormChange('amount', e.target.value)}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAddDialogClose}>Cancel</Button>
          <Button onClick={onAddOrderSave} variant="contained">Add Order</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={editDialogOpen} onClose={onEditDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          {selectedOrderForEdit && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  value={selectedOrderForEdit.user.name}
                  onChange={(e) => onEditOrderFormChange('user', { ...selectedOrderForEdit.user, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Project"
                  value={selectedOrderForEdit.project}
                  onChange={(e) => onEditOrderFormChange('project', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={selectedOrderForEdit.address}
                  onChange={(e) => onEditOrderFormChange('address', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Select
                    value={selectedOrderForEdit.status.label}
                    onChange={(e) => {
                      const statusColors = {
                        'In Progress': 'info',
                        'Complete': 'success',
                        'Pending': 'warning',
                        'Approved': 'success',
                        'Rejected': 'error'
                      };
                      onEditOrderFormChange('status', { label: e.target.value, color: statusColors[e.target.value] });
                    }}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={selectedOrderForEdit.amount}
                  onChange={(e) => onEditOrderFormChange('amount', parseInt(e.target.value))}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                  }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onEditDialogClose}>Cancel</Button>
          <Button onClick={onEditOrderSave} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={onDeleteDialogClose}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <Typography>
            {selectedOrderForDelete?.orderId?.includes('orders')
              ? `Are you sure you want to delete ${selectedOrderForDelete.orderId}? This action cannot be undone.`
              : `Are you sure you want to delete order ${selectedOrderForDelete?.orderId}? This action cannot be undone.`
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteDialogClose}>Cancel</Button>
          <Button onClick={onDeleteOrderConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Export Menu */}
      <Menu
        anchorEl={exportMenuAnchor}
        open={Boolean(exportMenuAnchor)}
        onClose={onExportMenuClose}
      >
        <MenuItem onClick={onExportCSV}>
          <Download sx={{ mr: 1, fontSize: 18 }} />
          <Typography variant="body2">Export as CSV</Typography>
        </MenuItem>
      </Menu>
    </>
  );
});

OrdersTableDialogs.displayName = 'OrdersTableDialogs';

OrdersTableDialogs.propTypes = {
  // Add Order Dialog
  addDialogOpen: PropTypes.bool.isRequired,
  newOrderForm: PropTypes.object.isRequired,
  statusOptions: PropTypes.array.isRequired,
  onAddDialogClose: PropTypes.func.isRequired,
  onAddOrderSave: PropTypes.func.isRequired,
  onNewOrderFormChange: PropTypes.func.isRequired,

  // Edit Order Dialog
  editDialogOpen: PropTypes.bool.isRequired,
  selectedOrderForEdit: PropTypes.object,
  onEditDialogClose: PropTypes.func.isRequired,
  onEditOrderSave: PropTypes.func.isRequired,
  onEditOrderFormChange: PropTypes.func.isRequired,

  // Delete Confirmation Dialog
  deleteDialogOpen: PropTypes.bool.isRequired,
  selectedOrderForDelete: PropTypes.object,
  onDeleteDialogClose: PropTypes.func.isRequired,
  onDeleteOrderConfirm: PropTypes.func.isRequired,

  // Export Menu
  exportMenuAnchor: PropTypes.object,
  onExportMenuClose: PropTypes.func.isRequired,
  onExportCSV: PropTypes.func.isRequired,
};

export default OrdersTableDialogs;