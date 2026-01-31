import Navbar from "../../components/Navbar";
import AircraftShowcase from "./ImageGallery";

export default function ImagePage() {
    return (
        <div>
            <Navbar/>
            <div className="relative w-full h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <img
        src="https://images.unsplash.com/photo-1605753731802-4fd66a9b7093?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Unsplash Image"
        className="w-full h-full object-cover"
      />
     
    </div>
    
    <AircraftShowcase/>
   
    </div>
      
    );
  }
  