import Navbar from "../../components/Navbar";
import AircraftShowcase from "./ImageGallery";

export default function ImagePage() {
    return (
        <div>
            <Navbar/>
            <div className="relative w-full h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <img
        src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Unsplash Image"
        className="w-full h-full object-cover"
      />
      <p className="absolute bottom-6 left-6 text-white text-5xl font-sans font-extrabold italic drop-shadow-lg">
        Private Jet
      </p>
    </div>
    <AircraftShowcase/>
   
    </div>
      
    );
  }
  