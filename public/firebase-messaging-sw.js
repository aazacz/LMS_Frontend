importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging.js');


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2iktw7tUrDdLk9YZFQnX2_LMOdfKHv3s",
    authDomain: "temp-d3f23.firebaseapp.com",
    projectId: "temp-d3f23",
    storageBucket: "temp-d3f23.appspot.com",
    messagingSenderId: "45096425166",
    appId: "1:45096425166:web:21676044c17590e01e629f",
    measurementId: "G-RE0TLHC1YE"
  };


  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
