import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBAqOcWyVZbLKo3Wdt4B9B7qINxEtNapeI",
  authDomain: "netlify-demo-app.firebaseapp.com",
  databaseURL: "https://netlify-demo-app-default-rtdb.firebaseio.com",
  projectId: "netlify-demo-app",
  storageBucket: "netlify-demo-app.appspot.com",
  messagingSenderId: "738200397308",
  appId: "1:738200397308:web:5d2df9b77449ec29a2be79",
  measurementId: "G-BGQCY4YZPB"
};
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

window.addEventListener('load', async () => {
  const userid = await window.prompt('Enter user name');
  const registration = await navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  });
  Notification.requestPermission(async function (permission) {
    if (permission === "granted") {
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BAA8TGQbVGRUXO-geg-vm4VBORoemXcWDEMW6MQIbwz_zL4DKAp1aaWJg2qqxhHB-xP81y0Th5i8IE88w88vGPo"
      })
      const db = firebase.firestore();
      db.collection("users").add(
        {...JSON.parse(JSON.stringify(pushSubscription)), userid }
      ).then(()=> alert('Registered')).catch(e => {console.log(e)})
      
    } else if (permission === 'default') {

    } else {

    }
  });
})
//



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
