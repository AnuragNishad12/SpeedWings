
// import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Cars from './pages/cars'
import Blog from './pages/Blog'
import HelicopterBooking from './pages/HelicopterBooking'
import InquiryForm from './pages/InquiryForm'
import ImagePage from './NewPages/Jets/JetDetails'
import AboutUs from './NewPages/AboutUs'
import ContactPage from './NewPages/ContactPage'
import YachtPage from './NewPages/YachtPage' 
import DealoftheDay from './NewPages/Dealoftheday'
import EventsPage from './NewPages/EventsPage'
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
import EmptyLegsPage from './NewPages/Emptylegspage'

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
    {path:"dealoftheday", element:<DealoftheDay/>},
    {path:"EventsPage",element:<EventsPage/>},
    {path:"EmptyLeg",element:<EmptyLegsPage/>}
  ]);

  return all_allroutes;
}
