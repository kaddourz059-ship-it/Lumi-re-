
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// حل مشكلة الشاشة البيضاء: تعريف process.env للمتصفح
(window as any).process = {
  env: {
    API_KEY: "AIzaSyCrgCY0G0thuXQNIGX2qlC0gCi4U9xRl14" // دمج مفتاحك مباشرة لضمان العمل الفوري
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);