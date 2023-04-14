import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Alert, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import PaymentsTable from "../../components/PaymentsTable";
import MakePaymentModal from "../../components/MakePaymentModal";
import AddBalance from "../../components/AddBalance";
import { useNavigate } from "react-router-dom";

const PaymentsPage = () => {
  const navigate = useNavigate();
  const getBalances = useStoreActions(actions => actions.getBalances);
  const setLoggedUser = useStoreActions(actions => actions.setLoggedUser);
  const last30days = useStoreState(state => state.last30days);
  const balance = useStoreState(state => state.balance);
  const alert = useStoreState(state => state.alert);
  const loggedUser = useStoreState(state => state.loggedUser);

  useEffect(() => {
    getBalances();
  }, [getBalances]);

  if (loggedUser === false) {
    navigate('/login');
  }

  if (loggedUser === null) {
    const user = localStorage.getItem("username");
    if (user) {
      setLoggedUser(user);
    }
  }

  return (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1, margin: "1.5rem" }}>
        {alert && (
          <Alert sx={{ marginBottom: 2 }} severity={alert.severity}>
            {alert.message}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography>Saldo disponible</Typography>
                <Typography variant="h4">$ {balance}</Typography>
                <AddBalance />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography>Pagos realizados - últimos 30 días</Typography>
                <Typography variant="h4">$ {last30days?.payments}</Typography>
                <MakePaymentModal />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography>Pagos recibidos - últimos 30 días</Typography>
                <Typography variant="h4">$ {last30days?.credit}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 2 }}>
          Historial de pagos
        </Typography>
        <PaymentsTable />
      </Box>
    </div>
  );
};

export default PaymentsPage;
