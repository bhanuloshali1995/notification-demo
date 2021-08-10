import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

window.addEventListener('load', async () => {
  const registration = await navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  });
  Notification.requestPermission(async function (permission) {
    if (permission === "granted") {
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BAA8TGQbVGRUXO-geg-vm4VBORoemXcWDEMW6MQIbwz_zL4DKAp1aaWJg2qqxhHB-xP81y0Th5i8IE88w88vGPo"
      })
      fetch('192.168.0.1:4000/api/asd',{
        method:'POST',
        body: JSON.stringify(pushSubscription)
      })
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
