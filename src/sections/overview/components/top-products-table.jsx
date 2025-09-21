import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const TopProductsTable = memo(({ products }) => {
  const theme = useTheme();

  const tableHeaderSx = {
    fontWeight: 600,
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    color: 'text.secondary',
    border: 'none',
    py: { xs: 1, sm: 1.5 },
    px: { xs: 1, sm: 2 }
  };

  const tableCellSx = {
    border: 'none',
    py: { xs: 1, sm: 1.5 },
    px: { xs: 1, sm: 2 }
  };

  const bodyTextSx = {
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: alpha(theme.palette.grey[300], 0.5),
        bgcolor: 'background.card'
      }}
    >
      <CardHeader
        title="Top Selling Products"
        titleTypographyProps={{
          variant: 'h6',
          fontWeight: 600,
          fontSize: '1.125rem'
        }}
        sx={{ pb: 2 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: 'none',
            overflowX: 'auto',
            bgcolor: 'transparent',
            backgroundImage: 'none'
          }}
        >
          <Table sx={{ minWidth: { xs: 500, sm: 'auto' } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderSx}>
                  Name
                </TableCell>
                <TableCell align="right" sx={tableHeaderSx}>
                  Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    ...tableHeaderSx,
                    display: { xs: 'none', sm: 'table-cell' }
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell align="right" sx={tableHeaderSx}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(theme.palette.grey[500], 0.04)
                    },
                    '&:last-child td': { border: 'none' }
                  }}
                >
                  <TableCell sx={tableCellSx}>
                    <Typography
                      variant="body2"
                      sx={{
                        ...bodyTextSx,
                        fontWeight: 500,
                        lineHeight: { xs: 1.3, sm: 1.5 }
                      }}
                    >
                      {product.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={tableCellSx}>
                    <Typography
                      variant="body2"
                      sx={{
                        ...bodyTextSx,
                        color: 'text.secondary'
                      }}
                    >
                      {product.price}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      ...tableCellSx,
                      display: { xs: 'none', sm: 'table-cell' }
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        ...bodyTextSx,
                        color: 'text.secondary'
                      }}
                    >
                      {product.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={tableCellSx}>
                    <Typography
                      variant="body2"
                      sx={{
                        ...bodyTextSx,
                        fontWeight: 600
                      }}
                    >
                      {product.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
});

TopProductsTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      amount: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TopProductsTable;