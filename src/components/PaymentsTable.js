import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination,
} from '@mui/material';
import Moment from 'moment';

const HeadRow = ({ children }) => (
  <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
    {children}
  </TableCell>
)

const PaymentsTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const getPayments = useStoreActions(actions => actions.getPayments);
  const payments = useStoreState(state => state.paymentsHistory);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer sx={{ border: '1px solid black' }}>
        <Table>
          <TableHead>
            <TableRow>
              <HeadRow>Nro operación</HeadRow>
              <HeadRow>Fecha</HeadRow>
              <HeadRow>Descripción</HeadRow>
              <HeadRow>Envía</HeadRow>
              <HeadRow>Recibe</HeadRow>
              <HeadRow>Monto</HeadRow>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{Moment(row.creationDate).zone('-0300').format('DD/MM/yyyy HH:mm')}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.usernameDebit}</TableCell>
                <TableCell>{row.usernameCredit}</TableCell>
                <TableCell>
                  {row.amount > 0 ? `+ $ ${row.amount}` : `- $ ${row.amount * -1}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={payments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default PaymentsTable;