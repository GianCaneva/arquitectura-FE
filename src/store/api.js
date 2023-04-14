import axios from "axios";

const BASE_URL = "http://pay.deliver.ar:4000";

const ROUTES = {
  login: "/users/login",
  logout: "/users/logout",
  getPayments: "/movements",
  newPayment: "/transfers",
  getBalance: "/accounts/",
  rechargeBalance: "/accounts/recharge",
  getReceivers: "/contacts/",
  newReceiver: "/contacts/",
};

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const loginUser = async (docType, user, password) => {
  let resp;
  const login_data = {
    docTypeId: docType,
    docNumber: user,
    password: password,
  };
  await instance
    .post(ROUTES.login, login_data)
    .then(response => resp = response.data)
    .catch(error => {
      resp = { error: true, message: error.response.data.message };
    })
    .catch(e => resp = { error: true, message: "Internal server error" });
  return resp;
};

const logoutUser = async () => {
  await instance.post(ROUTES.logout);
  return;
};

const getPaymentsApi = async () => {
  let resp;
  await instance.get(ROUTES.getPayments)
    .then(r => resp = r.data)
    .catch(e => resp = { error: true });
  return resp;
};

const newPaymentApi = async (payment) => {
  let resp;
  await instance.post(ROUTES.newPayment, payment)
    .then(r => resp = r.data)
    .catch(e => resp = { error: true });
  return resp;
};

const getBalanceApi = async () => {
  let resp;
  await instance.get(ROUTES.getBalance)
    .then(r => resp = r.data)
    .catch(e => resp = { error: true });
  return resp;
};

const rechargeBalance = async (amount) => {
  const resp = await instance.patch(ROUTES.rechargeBalance, { amount });
  return resp.data;
}

const getReceiversApi = async () => {
  const resp = await instance.get(ROUTES.getReceivers);
  return resp.data;
}

const newReceiverApi = async (receiverData) => {
  const resp = await instance.post(ROUTES.newReceiver, receiverData);
  return resp.data;
}

export {
  loginUser,
  logoutUser,
  getPaymentsApi,
  newPaymentApi,
  getBalanceApi,
  rechargeBalance,
  getReceiversApi,
  newReceiverApi,
};
