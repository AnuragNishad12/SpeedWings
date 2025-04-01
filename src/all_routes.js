import React from 'react'
// import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Products from './pages/products'
import Cars from './pages/cars'
import About from './pages/About'
import Blog from './pages/Blog'
import HelicopterBooking from './pages/HelicopterBooking'
import YachtBooking from './pages/YachtBooking'
import InquiryForm from './pages/InquiryForm'
import ImagePage from './NewPages/Jets/JetDetails'
import AboutUs from './NewPages/AboutUs'
import ContactPage from './NewPages/ContactPage'
import YachtPage from './NewPages/YachtPage'
// export default function all_routes() {
//   let  all_allroutes = createBrowserRouter(
//     [
//         {
//             path:'/',
//             element:<App />

//         },
//         {
//             path:'p',
//             element: <ImagePage />

//         },
//         {
//           path:'c',
//           element: <Cars />
//         }
//         ,{
//           path:'about',
//           element: <AboutUs />
//         },
//         {
//           path:'blog',
//           element: <Blog />
//         },{
//           path:'helicopter',
//           element:<HelicopterBooking   />     },
//           {
//             path:'yacht',
//             element:<YachtPage   />     },
//             {
//               path:'Enqiry',
//             element:<InquiryForm   />  
//             },{
//               path:'contact',
//               element:<ContactPage/>
//             }
          

//     ]
//   )
//   return all_allroutes;

// }
import { createHashRouter } from "react-router-dom";

export default function all_routes() {
  let all_allroutes = createHashRouter([
    { path: "/", element: <App /> },
    { path: "p", element: <ImagePage /> },
    { path: "c", element: <Cars /> },
    { path: "about", element: <AboutUs /> },
    { path: "blog", element: <Blog /> },
    { path: "helicopter", element: <HelicopterBooking /> },
    { path: "yacht", element: <YachtPage /> },
    { path: "Enqiry", element: <InquiryForm /> },
    { path: "contact", element: <ContactPage /> },
  ]);

  return all_allroutes;
}
