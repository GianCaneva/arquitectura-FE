import React, { useState, useEffect } from 'react';
import {
  Box, Modal, Typography, FormControl, InputLabel,
  Select, MenuItem, Button, TextField, Grid
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import NewReceiverModal from './NewReceiverModal';
import style from './modalStyle';

const MakePaymentModal = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const getReceivers = useStoreActions(actions => actions.getReceivers);
  const newPayment = useStoreActions(actions => actions.newPayment);
  const setSelectedReceiver = useStoreActions(actions => actions.setSelectedReceiver);
  const receivers = useStoreState(state => state.receivers);
  const selectedReceiver = useStoreState(state => state.selectedReceiver);

  useEffect(() => {
    getReceivers();
  }, [getReceivers]);

  const cleanFields = () => {
    setSelectedReceiver('');
    setAmount(0);
    setDescription('');
  }

  const handlePayment = () => {
    // TODO: verify values
    if (!selectedReceiver) {
      alert('Debe seleccionar un receptor');
      return null;
    }
    const paymentData = {
      creditUser: {
        docTypeId: 1,
        docNumber: selectedReceiver.id
      },
      amount,
      description,
    }
    newPayment(paymentData);
    cleanFields();
    setOpen(false);
  }

  const handleCancel = () => {
    cleanFields();
    setOpen(false);
  }

  return (
    <>
      <Button variant='contained' sx={{ marginTop: 2 }} onClick={() => setOpen(true)}>
        Realizar pago
      </Button>
      <Modal open={open} onClose={handleCancel}>
        <Box sx={style}>
          <Typography variant='h6'>Realizar pago</Typography>
          <FormControl fullWidth sx={{ marginTop: 3 }}>
            <InputLabel>Seleccionar destinatario</InputLabel>
            <Select
              label='Seleccionar destinatario'
              value={selectedReceiver}
              onChange={e => setSelectedReceiver(e.target.value)}
            >
              {receivers.map(receiver => (
                <MenuItem key={receiver.id} value={receiver.account}>
                  {receiver.account.user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <NewReceiverModal />
          <TextField
            sx={{ marginTop: 3 }}
            label='Monto'
            variant='outlined'
            value={amount > 0 ? amount : ''}
            onChange={e => setAmount(e.target.value)}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
          />
          <TextField
            sx={{ marginTop: 2 }}
            label='Descripción'
            variant='outlined'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <Grid item xs={4}>
              <Button fullWidth sx={{ height: '50px' }} onClick={handleCancel}>
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                fullWidth
                sx={{ height: '50px' }}
                variant='contained'
                onClick={handlePayment}
              >Realizar pago</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default MakePaymentModal;
