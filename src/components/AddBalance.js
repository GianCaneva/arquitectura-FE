import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import {
  Box, Modal, Typography, Button, Grid, FormControl,
  InputAdornment, InputLabel, OutlinedInput
} from '@mui/material';
import style from './modalStyle';

const AddBalance = () => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const addBalance = useStoreActions(actions => actions.addBalance);

  const handleBalance = () => {
    // TODO: verify that the amount is a number
    addBalance(Number(amount));
    setOpen(false);
    setAmount(0);
  }

  return (
    <>
      <Button variant='outlined' sx={{ marginTop: 2 }} onClick={() => setOpen(true)}>
        Recargar
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant='h6'>Recargar saldo</Typography>
          <FormControl fullWidth sx={{ marginY: 3 }}>
            <InputLabel>Monto</InputLabel>
            <OutlinedInput
              label='Monto'
              type='number'
              variant='outlined'
              value={amount ? amount : ''}
              onChange={(e) => setAmount(e.target.value)}
              inputProps={{ min: 0 }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              autoFocus
            />
          </FormControl>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Grid item xs={4}>
              <Button fullWidth onClick={() => setOpen(false)}>Cancelar</Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                onClick={handleBalance}
                sx={{ height: '50px' }}
                variant='contained'
                fullWidth
              >
                Recargar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default AddBalance;
