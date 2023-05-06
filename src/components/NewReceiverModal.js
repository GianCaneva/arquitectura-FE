import React, { useState } from 'react';
import {
  Box, Modal, Typography, Button, TextField, Grid,
} from '@mui/material';
import { useStoreActions } from 'easy-peasy';
import style from './modalStyle';

const NewReceiverModal = () => {
  const [open, setOpen] = useState(false);
  const [alias, setAlias] = useState('');
  const [name, setName] = useState('');
  const [cbu, setCBU] = useState('');
  const [notes, setNotes] = useState('');

  const newReceiver = useStoreActions(actions => actions.newReceiver);

  const handleAddReceiver = () => {
    // TODO: verify values
    const receiverData = {
      alias,
      name,
      cbu,
      notes
    }
    newReceiver(receiverData);
    cleanFields();
    setOpen(false);
  }

  const handleCancel = () => {
    cleanFields();
    setOpen(false);
  }

  const cleanFields = () => {
    setAlias('');
    setName('');
    setCBU('');
    setNotes('');
  }

  return (
    <>
      <Button
        sx={{ alignSelf: 'center', marginTop: 1 }}
        variant='outlined'
        onClick={() => setOpen(true)}
      >
        Nuevo destinatario
      </Button>
      <Modal open={open} onClose={handleCancel}>
        <Box sx={style}>
          <Typography variant='h6'>Nuevo destinatario</Typography>
          <TextField
            sx={{ marginTop: 2 }}
            value={alias}
            onChange={e => setAlias(e.target.value)}
            label='Alias'
            variant='outlined'
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={cbu}
            onChange={e => setCBU(e.target.value)}
            label='CBU'
            variant='outlined'
            inputProps={{ maxLength: 22, pattern: '[0-9]*', inputMode: 'numeric', min: 0 }}
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={name}
            onChange={e => setName(e.target.value)}
            label='Nombre'
            variant='outlined'
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            label='Notas'
            variant='outlined'
          />
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <Grid item xs={4}>
              <Button fullWidth sx={{ height: '50px' }} onClick={handleCancel}>
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                sx={{ height: '50px' }}
                variant='contained'
                onClick={handleAddReceiver}
                fullWidth
              >Agregar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default NewReceiverModal;
