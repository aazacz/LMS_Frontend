// try {
//   importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js');
//   importScripts('https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging.js');

//   // Firebase configuration
//   const firebaseConfig = {
//       apiKey: "AIzaSyB2iktw7tUrDdLk9YZFQnX2_LMOdfKHv3s",
//       authDomain: "temp-d3f23.firebaseapp.com",
//       projectId: "temp-d3f23",
//       storageBucket: "temp-d3f23.appspot.com",
//       messagingSenderId: "45096425166",
//       appId: "1:45096425166:web:21676044c17590e01e629f",
//       measurementId: "G-RE0TLHC1YE"
//   };

//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   const messaging = firebase.messaging();

//   messaging.onBackgroundMessage(function(payload) {
//       console.log('[firebase-messaging-sw.js] Received background message ', payload);

//       const notificationTitle = payload.notification.title;
//       const notificationOptions = {
//           body: payload.notification.body,
//           icon: '/firebase-logo.png'
//       };

//       self.registration.showNotification(notificationTitle, notificationOptions);
//   });

// } catch (e) {
//   console.error('Failed to load Firebase scripts in service worker:', e);
// }



try {
  importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js');

//   // Firebase configuration
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
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      // icon: '/firebase-logo.png'
      icon: paload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });

} catch (e) {
  console.error('Failed to load Firebase scripts in service worker:', e);
}
