import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { RouterProvider } from 'react-router-dom';
import all_routes from './all_routes';
import "./index.css";
// import App from "./App";
// import reportWebVitals from './reportWebVitals';
import AOS from 'aos';             
import 'aos/dist/aos.css';  


// function printColorfulMessage() {
//   console.clear();

//   const developer = '🌟 Developer: Karan Kumar 🌟';
//   const organization = '🎓 Organization: Cyber Zone Academy 🎓';

//   const currentDate = new Date().toLocaleString();

//   let batteryInfo = 'Battery: N/A';
//   if (navigator.getBattery) {
//     navigator.getBattery().then(battery => {
//       const batteryLevel = (battery.level * 100).toFixed(0) + '%';
//       batteryInfo = `Battery: ${batteryLevel} ${battery.charging ? '(Charging)' : '(Not Charging)'}`;
//       printInfo(batteryInfo);
//     });
//   } else {
//     printInfo(batteryInfo);
//   }

//   const printInfo = (batteryInfo) => {
//     console.log(`%c=============================================`, 'color: blue');
//     console.log(`%c${developer}`, 'color: green');
//     console.log(`%c${organization}`, 'color: yellow');
//     console.log(`%c---------------------------------------------`, 'color: blue');
//     console.log(`%cCurrent Date & Time: ${currentDate}`, 'color: green');
//     console.log(`%c${batteryInfo}`, 'color: yellow');
//     console.log(`%c=============================================`, 'color: blue');
//   };


//   try {
//     printInfo(batteryInfo);
//   } catch (error) {
//     console.log(`%cError retrieving system information: ${error.message}`, 'color: yellow');
//   }
// }

// printColorfulMessage();

const AppWithAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,   
    });
  }, []);

  return (
    <React.StrictMode>
      <RouterProvider router={all_routes()} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWithAOS />
);
// reportWebVitals();