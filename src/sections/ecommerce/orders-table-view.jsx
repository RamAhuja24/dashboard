import { memo, useState, useCallback, useMemo } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  Stack,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Import our new modular components
import OrdersTableToolbar from './components/orders-table-toolbar';
import OrdersTableFilters from './components/orders-table-filters';
import OrdersTableDialogs from './components/orders-table-dialogs';
import OrdersTableRow from './components/orders-table-row';

// Move mock data generation to separate utility
import { generateMockOrders } from './utils/mock-data';

const OrdersTableView = memo(() => {
  const theme = useTheme();

  // State management
  const [orders, setOrders] = useState(generateMockOrders());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    dateFrom: null,
    dateTo: null,
    amountMin: '',
    amountMax: ''
  });
  const [searchKey, setSearchKey] = useState('all');
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState(null);
  const [selectedOrderForDelete, setSelectedOrderForDelete] = useState(null);
  const [newOrderForm, setNewOrderForm] = useState({
    user: { name: '', avatar: '👤' },
    project: '',
    address: '',
    status: { label: 'Pending', color: 'warning' },
    amount: ''
  });

  // Constants
  const searchOptions = [
    { value: 'all', label: 'All Fields' },
    { value: 'user', label: 'User' },
    { value: 'project', label: 'Project' },
    { value: 'orderId', label: 'Order ID' },
    { value: 'address', label: 'Address' }
  ];

  const statusOptions = [
    'In Progress',
    'Complete',
    'Pending',
    'Approved',
    'Rejected'
  ];

  // Computed values
  const hasActiveFilters = filters.status.length > 0 || filters.dateFrom || filters.dateTo || (filters.amountMin && filters.amountMin.trim() !== '') || (filters.amountMax && filters.amountMax.trim() !== '');

  // Filter and search logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search logic
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        if (searchKey === 'all') {
          matchesSearch = order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.address.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchKey === 'user') {
          matchesSearch = order.user.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchKey === 'project') {
          matchesSearch = order.project.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchKey === 'orderId') {
          matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchKey === 'address') {
          matchesSearch = order.address.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }

      // Status filter
      const matchesStatus = filters.status.length === 0 || filters.status.includes(order.status.label);

      // Date filter
      const matchesDateFrom = !filters.dateFrom || order.date >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || order.date <= new Date(filters.dateTo);

      // Amount filter
      const matchesAmountMin = !filters.amountMin || order.amount >= parseInt(filters.amountMin);
      const matchesAmountMax = !filters.amountMax || order.amount <= parseInt(filters.amountMax);

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax;
    });
  }, [orders, searchQuery, searchKey, filters]);

  // Sorting logic
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders].sort((a, b) => {
      let aValue, bValue;

      switch (orderBy) {
        case 'orderId':
          aValue = a.orderId;
          bValue = b.orderId;
          break;
        case 'user':
          aValue = a.user.name;
          bValue = b.user.name;
          break;
        case 'project':
          aValue = a.project;
          bValue = b.project;
          break;
        case 'address':
          aValue = a.address;
          bValue = b.address;
          break;
        case 'date':
          aValue = a.date;
          bValue = b.date;
          break;
        case 'status':
          aValue = a.status.label;
          bValue = b.status.label;
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        default:
          return 0;
      }

      if (orderBy === 'date' || orderBy === 'amount') {
        if (order === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      } else {
        if (order === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
    });

    return sorted;
  }, [filteredOrders, orderBy, order]);

  // Pagination
  const paginatedOrders = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedOrders.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedOrders, page, rowsPerPage]);

  // Check how many of the current page orders are selected
  const currentPageSelectedCount = useMemo(() => {
    return paginatedOrders.filter(order => selected.includes(order.orderId)).length;
  }, [paginatedOrders, selected]);

  // Event handlers
  const handleRequestSort = useCallback((property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [orderBy, order]);

  const handleSelectAllClick = useCallback((event) => {
    if (event.target.checked) {
      const newSelected = paginatedOrders.map((order) => order.orderId);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  }, [paginatedOrders]);

  const handleSelectClick = useCallback((orderId) => {
    const selectedIndex = selected.indexOf(orderId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, orderId];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }

    setSelected(newSelected);
  }, [selected]);

  const handleChangePage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  }, []);

  const isSelected = useCallback((orderId) => selected.indexOf(orderId) !== -1, [selected]);

  // Toolbar handlers
  const handleSearchKeyChange = useCallback((event) => {
    setSearchKey(event.target.value);
    setPage(0);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleFilterToggle = useCallback(() => {
    setFilterDrawerOpen(!filterDrawerOpen);
  }, [filterDrawerOpen]);

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(0);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters({
      status: [],
      dateFrom: null,
      dateTo: null,
      amountMin: '',
      amountMax: ''
    });
    setPage(0);
  }, []);

  const handleExportClick = useCallback((event) => {
    setExportMenuAnchor(event.currentTarget);
  }, []);

  const handleExportClose = useCallback(() => {
    setExportMenuAnchor(null);
  }, []);

  const handleExportCSV = useCallback(() => {
    const csvContent = [
      ['Order ID', 'User', 'Project', 'Address', 'Date', 'Status', 'Amount'],
      ...filteredOrders.map(order => [
        order.orderId,
        order.user.name,
        order.project,
        order.address,
        order.dateLabel,
        order.status.label,
        `$${order.amount}`
      ])
    ].map(row => row.join(',')).join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    handleExportClose();
  }, [filteredOrders, handleExportClose]);

  // Order CRUD handlers
  const handleAddOrder = useCallback(() => {
    setAddDialogOpen(true);
  }, []);

  const handleAddOrderSave = useCallback(() => {
    if (!newOrderForm.user.name || !newOrderForm.project || !newOrderForm.address || !newOrderForm.amount) {
      return;
    }

    const newOrder = {
      id: `#ORD${String(orders.length + 1).padStart(4, '0')}`,
      orderId: `#CM98${String(orders.length + 200).padStart(2, '0')}`,
      user: newOrderForm.user,
      project: newOrderForm.project,
      address: newOrderForm.address,
      date: new Date(),
      dateLabel: 'Just now',
      status: newOrderForm.status,
      amount: parseInt(newOrderForm.amount)
    };

    setOrders(prev => [newOrder, ...prev]);
    setAddDialogOpen(false);
    setNewOrderForm({
      user: { name: '', avatar: '👤' },
      project: '',
      address: '',
      status: { label: 'Pending', color: 'warning' },
      amount: ''
    });
  }, [newOrderForm, orders.length]);

  const handleAddOrderCancel = useCallback(() => {
    setAddDialogOpen(false);
    setNewOrderForm({
      user: { name: '', avatar: '👤' },
      project: '',
      address: '',
      status: { label: 'Pending', color: 'warning' },
      amount: ''
    });
  }, []);

  const handleEditOrder = useCallback((order) => {
    setSelectedOrderForEdit(order);
    setEditDialogOpen(true);
  }, []);

  const handleEditOrderSave = useCallback(() => {
    if (!selectedOrderForEdit) return;

    setOrders(prev => prev.map(order =>
      order.orderId === selectedOrderForEdit.orderId ? selectedOrderForEdit : order
    ));
    setEditDialogOpen(false);
    setSelectedOrderForEdit(null);
  }, [selectedOrderForEdit]);

  const handleEditOrderCancel = useCallback(() => {
    setEditDialogOpen(false);
    setSelectedOrderForEdit(null);
  }, []);

  const handleDeleteOrder = useCallback((order) => {
    setSelectedOrderForDelete(order);
    setDeleteDialogOpen(true);
  }, []);

  const handleBulkDelete = useCallback(() => {
    setDeleteDialogOpen(true);
    setSelectedOrderForDelete({ orderId: `${selected.length} orders` });
  }, [selected.length]);

  const handleDeleteOrderConfirm = useCallback(() => {
    if (!selectedOrderForDelete) return;

    if (selectedOrderForDelete.orderId.includes('orders')) {
      setOrders(prev => prev.filter(order => !selected.includes(order.orderId)));
      setSelected([]);
    } else {
      setOrders(prev => prev.filter(order => order.orderId !== selectedOrderForDelete.orderId));
    }
    setDeleteDialogOpen(false);
    setSelectedOrderForDelete(null);
  }, [selectedOrderForDelete, selected]);

  const handleDeleteOrderCancel = useCallback(() => {
    setDeleteDialogOpen(false);
    setSelectedOrderForDelete(null);
  }, []);

  // Form handlers for dialogs
  const handleNewOrderFormChange = useCallback((field, value) => {
    setNewOrderForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleEditOrderFormChange = useCallback((field, value) => {
    setSelectedOrderForEdit(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <Box sx={{
      bgcolor: 'background.default',
      minHeight: '100vh',
      p: { xs: 1, sm: 2, md: 3 }
    }}>
      {/* Page Title */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, fontSize: '1.25rem', color: 'text.primary' }}>
        Orders List
      </Typography>

      {/* Toolbar */}
      <OrdersTableToolbar
        searchQuery={searchQuery}
        searchKey={searchKey}
        selected={selected}
        orders={orders}
        hasActiveFilters={hasActiveFilters}
        searchOptions={searchOptions}
        onSearchChange={handleSearchChange}
        onSearchKeyChange={handleSearchKeyChange}
        onSearchClear={handleSearchClear}
        onAddOrder={handleAddOrder}
        onEditOrder={handleEditOrder}
        onDeleteOrder={handleDeleteOrder}
        onBulkDelete={handleBulkDelete}
        onFilterToggle={handleFilterToggle}
        onExportClick={handleExportClick}
      />

      {/* Table Card */}
      <Card sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}>
        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{
                bgcolor: theme.palette.table.header
              }}>
                <TableCell
                  padding="checkbox"
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    py: 1.5
                  }}
                >
                  <Checkbox
                    indeterminate={false}
                    checked={paginatedOrders.length > 0 && currentPageSelectedCount === paginatedOrders.length}
                    onChange={handleSelectAllClick}
                    size="small"
                  />
                </TableCell>

                {[
                  { key: 'orderId', label: 'Order ID' },
                  { key: 'user', label: 'User' },
                  { key: 'project', label: 'Project' },
                  { key: 'address', label: 'Address' },
                  { key: 'date', label: 'Date', icon: <CalendarToday sx={{ fontSize: 14 }} /> },
                  { key: 'status', label: 'Status' }
                ].map((column) => (
                  <TableCell
                    key={column.key}
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      py: 1.5
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === column.key}
                      direction={orderBy === column.key ? order : 'asc'}
                      onClick={() => handleRequestSort(column.key)}
                      sx={{ color: 'inherit', '&:hover': { color: 'inherit' } }}
                    >
                      {column.icon && (
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          {column.icon}
                          <span>{column.label}</span>
                        </Stack>
                      )}
                      {!column.icon && column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => (
                <OrdersTableRow
                  key={order.orderId}
                  order={order}
                  isSelected={isSelected(order.orderId)}
                  onSelectClick={handleSelectClick}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Custom Pagination */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: theme.palette.table.pagination
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, sortedOrders.length)} of {sortedOrders.length} entries
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Rows per page:
              </Typography>
              <FormControl size="small">
                <Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  sx={{
                    fontSize: '0.875rem',
                    '& .MuiOutlinedInput-input': {
                      py: 0.5,
                      px: 1
                    }
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            {/* Pagination buttons - simplified for space */}
            {Array.from({ length: Math.ceil(sortedOrders.length / rowsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => handleChangePage(index)}
                style={{
                  border: '1px solid',
                  borderColor: page === index ? theme.palette.primary.main : theme.palette.divider,
                  borderRadius: 4,
                  width: 32,
                  height: 32,
                  backgroundColor: page === index ? theme.palette.primary.main : 'transparent',
                  color: page === index ? 'white' : theme.palette.text.primary,
                  cursor: 'pointer'
                }}
              >
                {index + 1}
              </button>
            )).slice(0, 5)}
          </Stack>
        </Box>
      </Card>

      {/* Filters Drawer */}
      <OrdersTableFilters
        open={filterDrawerOpen}
        filters={filters}
        statusOptions={statusOptions}
        onClose={() => setFilterDrawerOpen(false)}
        onFilterChange={handleFilterChange}
        onFilterReset={handleFilterReset}
      />

      {/* All Dialogs */}
      <OrdersTableDialogs
        // Add Order Dialog
        addDialogOpen={addDialogOpen}
        newOrderForm={newOrderForm}
        statusOptions={statusOptions}
        onAddDialogClose={handleAddOrderCancel}
        onAddOrderSave={handleAddOrderSave}
        onNewOrderFormChange={handleNewOrderFormChange}

        // Edit Order Dialog
        editDialogOpen={editDialogOpen}
        selectedOrderForEdit={selectedOrderForEdit}
        onEditDialogClose={handleEditOrderCancel}
        onEditOrderSave={handleEditOrderSave}
        onEditOrderFormChange={handleEditOrderFormChange}

        // Delete Confirmation Dialog
        deleteDialogOpen={deleteDialogOpen}
        selectedOrderForDelete={selectedOrderForDelete}
        onDeleteDialogClose={handleDeleteOrderCancel}
        onDeleteOrderConfirm={handleDeleteOrderConfirm}

        // Export Menu
        exportMenuAnchor={exportMenuAnchor}
        onExportMenuClose={handleExportClose}
        onExportCSV={handleExportCSV}
      />
    </Box>
  );
});

OrdersTableView.displayName = 'OrdersTableView';

export default OrdersTableView;