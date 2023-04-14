import { action, createStore, thunk } from "easy-peasy";
import {
  loginUser,
  logoutUser,
  getPaymentsApi,
  newPaymentApi,
  getBalanceApi,
  rechargeBalance,
  getReceiversApi,
  newReceiverApi,
} from "./api";

const credentialsActions = {
  // Actions
  setLoggedUser: action((state, payload) => {
    state.loggedUser = payload;
  }),
  // Thunks
  login: thunk(async (actions, payload) => {
    const { docType, user, password } = payload;
    const response = await loginUser(docType, user, password);
    if (!response.error) {
      actions.setLoggedUser(response.user.name);
      localStorage.setItem("username", response.user.name);
    }
    return response;
  }),
  logout: thunk(async (actions, payload) => {
    await logoutUser();
    actions.setLoggedUser(null);
    localStorage.removeItem("username");
    return;
  }),
}

const paymentsActions = {
  // Actions
  addPayment: action((state, payload) => {
    state.paymentsHistory.push(payload);
  }),
  setPayments: action((state, payload) => {
    state.paymentsHistory = payload;
  }),
  addBalanceState: action((state, payload) => {
    state.balance += payload;
  }),
  setBalance: action((state, payload) => {
    state.balance = payload;
  }),
  setLast30days: action((state, payload) => {
    state.last30days = payload;
  }),
  setAlert: action((state, payload) => {
    state.alert = payload;
  }),
  setReceivers: action((state, payload) => {
    state.receivers = payload;
  }),
  addReceiver: action((state, payload) => {
    state.receivers.push(payload);
  }),
  setSelectedReceiver: action((state, payload) => {
    state.selectedReceiver = payload;
  }),
  // Thunks
  newPayment: thunk(async (actions, payload, { getState }) => {
    const response = await newPaymentApi(payload);
    if (!response.error) {
      actions.addPayment(response);
      // Update balance & alert
      actions.setAlert({
        severity: "success",
        message: "Pago realizado con éxito",
      });
      const last30days = getState().last30days;
      // Add to last30days payments
      actions.addBalanceState(payload.amount * -1);
      actions.setLast30days({
        ...last30days,
        payments: Number(last30days.payments) + Number(payload.amount),
      });
    }
  }),
  getBalances: thunk(async (actions, payload) => {
    const response = await getBalanceApi();
    if (!response.error) {
      actions.setBalance(response.account.balance);
      actions.setLast30days(
        {
          payments: response.last30Balance.debit,
          credit: response.last30Balance.credit
        }
      );
    } else {
      actions.setLoggedUser(false);
    }
  }),
  addBalance: thunk(async (actions, payload) => {
    const response = await rechargeBalance(payload);
    if (!response.error) {
      await actions.getPayments();
      actions.addBalanceState(payload);
      actions.setAlert({
        severity: "success",
        message: "Recarga realizada con éxito",
      });
    }
  }),
  getPayments: thunk(async (actions) => {
    const payments = await getPaymentsApi();
    if (!payments.error) {
      actions.setPayments(payments);
    }
  }),
  getReceivers: thunk(async (actions) => {
    const response = await getReceiversApi();
    if (!response.error) {
      actions.setReceivers(response);
    }
  }),
  newReceiver: thunk(async (actions, payload) => {
    const response = await newReceiverApi(payload);
    if (!response.error) {
      actions.addReceiver(payload);
    }
  }),
};

const model = {
  loggedUser: null,
  paymentsHistory: [],
  balance: 0,
  last30days: { payments: 0, credit: 0 },
  receivers: [],
  selectedReceiver: '',
  alert: null,
  ...credentialsActions,
  ...paymentsActions,
};

const store = createStore(model);

export default store;
