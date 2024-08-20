import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB2iktw7tUrDdLk9YZFQnX2_LMOdfKHv3s",
  authDomain: "temp-d3f23.firebaseapp.com",
  projectId: "temp-d3f23",
  storageBucket: "temp-d3f23.appspot.com",
  messagingSenderId: "45096425166",
  appId: "1:45096425166:web:21676044c17590e01e629f",
  measurementId: "G-RE0TLHC1YE"
};
 
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getFirebaseToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BI73U5crgaqnNDMRfCxSAaZx4sdUnIEHku7MUbwe9DQTCXhcNFunhZfqd8bSO_1TELPJXV6T9ldMosp3vv_DDew"
    });
    if (currentToken) {
      console.log("Token received: ", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });