import { Pi } from "pi-network-sdk";

export const initializePiNetwork = () => {
  Pi.init({
    version: "2.0",
    sandbox: process.env.REACT_APP_PI_NETWORK_SANDBOX === 'true',
    appId: process.env.REACT_APP_PI_NETWORK_SDK_KEY
  });
};
