import { Pi } from "pi-network-sdk";

export const initializePiNetwork = () => {
  Pi.init({
    version: "2.0",
    sandbox: process.env.REACT_APP_PI_NETWORK_SANDBOX === 'true',
    appId: process.env.REACT_APP_PI_NETWORK_SDK_KEY
  });
};
const signIn = async () => {
  const scopes = ["username", "payments"]; 
  const authResponse = await window.Pi.authenticate(scopes, onIncompletePaymentFound);

  await signInUser(authResponse);
  setUser(authResponse.user);
};

const signInUser = (authResult: any) => {
  axios.post("/signin", { authResult })
    .then(() => setShowModal(false))  
    .catch(err => console.error(err));  
};
