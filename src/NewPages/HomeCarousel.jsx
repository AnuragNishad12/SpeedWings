import  { useState, useEffect } from 'react';
import { database } from '../../src/firebaseConfig';
import { ref, get, push } from 'firebase/database';
import { motion } from "framer-motion";
import EnquireButton from '../NewPages/CssAnimation/EnquireButton'
import EnquiryForm from '../components/EnquiryForm';


const HomeCarousel = () => {
  const [rentalData, setRentalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
    setSubmitMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enquiry = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      transport: formData.get('transport'),
      travelDate: formData.get('travelDate'),
      message: formData.get('message') || '',
      timestamp: new Date().toISOString(),
    };

    try {
      const enquiriesRef = ref(database, 'enquiries');
      await push(enquiriesRef, enquiry);
      setSubmitMessage('Enquiry submitted successfully!');
      setTimeout(() => {
        setIsDialogOpen(false);
        setSubmitMessage('');
      }, 1500);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setSubmitMessage('Failed to submit enquiry. Please try again.');
    }
  };

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        setLoading(true);
        const dealsRef = ref(database, "admin/Dealoftehday/");
        const snapshot = await get(dealsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const dealsArray = Object.entries(data).map(([id, dealData]) => ({
            id,
            ...dealData,
          }));
          setRentalData(dealsArray);
        } else {
          setRentalData([]);
        }
      } catch (err) {
        console.error("Error fetching rental data:", err);
        setError("Failed to load deals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentalData();
  }, []);

  const categories = [
    {
      title: "Jets",
      listings: "14 LISTINGS",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Jets by Seats",
      listings: "8 LISTINGS",
      image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1208&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Choppers",
      listings: "12 LISTINGS",
      image: "https://images.unsplash.com/photo-1728719812207-2ad4640ac986?q=80&w=1304&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Choppers by Seats",
      listings: "6 LISTINGS",
      image: "https://images.unsplash.com/photo-1682597463829-4582d7f6569b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    // {
    //   title: "Luxury Yachts",
    //   listings: "5 LISTINGS",
    //   image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1170&auto=format&fit=crop"
    // },
    // {
    //   title: "Premium Cars",
    //   listings: "20 LISTINGS",
    //   image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1170&auto=format&fit=crop"
    // }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#C88A56] text-xl font-light tracking-widest">LOADING...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#C88A56] text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@200;300;400;500;600;700&display=swap');
        
        .luxury-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .luxury-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(200, 138, 86, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        
        .luxury-card:hover::before {
          opacity: 1;
        }
        
        .luxury-card img {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .luxury-card:hover img {
          transform: scale(1.05);
        }
        
        .luxury-card .arrow-icon {
          transition: transform 0.3s ease;
        }
        
        .luxury-card:hover .arrow-icon {
          transform: translateX(8px);
        }
        
        .gold-line {
          width: 0;
          height: 1px;
          background: #C88A56;
          transition: width 0.4s ease;
        }
        
        .luxury-card:hover .gold-line {
          width: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4" 
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C88A56' }}>
            Deals of The Day
          </h1>
          <div className="w-24 h-px bg-[#C88A56] mx-auto"></div>
        </div>

        {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="luxury-card bg-white group"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-black">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              </div>

              {/* Content */}
              <div className="bg-white p-8 relative">
                {/* Gold accent line */}
                <div className="gold-line absolute top-0 left-8"></div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-light mb-2 text-black" 
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {category.title}
                    </h3>
                    <p className="text-sm tracking-widest text-gray-600" 
                       style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
                      {category.listings}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="arrow-icon">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#C88A56" 
                      strokeWidth="1.5"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enquire Button */}
        <div className="mt-24 text-center">
          <EnquireButton
  text="Enquire now"
  onClick={handleDialogToggle}
/>
        
          </div>
        
        

      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
  <EnquiryForm 
    isOpen={isDialogOpen} 
    closeForm={handleDialogToggle} 
  />
)}
    </div>
  );
};

export default HomeCarousel;