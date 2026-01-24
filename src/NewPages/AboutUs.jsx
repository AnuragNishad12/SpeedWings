
import Footer from './Footer';
import Navbar from '../components/Navbar';


const teamMembers = [
  { 
    name: 'Mayank', 
    role: 'Founder', 
    image: 'https://static.vecteezy.com/system/resources/previews/000/546/107/original/businessman-in-suit-head-vector-icon.jpg',
    bio: 'Visionary leader with over 15 years in aviation, pioneering innovative flight solutions.'
  },
  { 
    name: 'Akshat Aggarwal', 
    role: 'CFO', 
    image: 'https://static.vecteezy.com/system/resources/previews/000/546/107/original/businessman-in-suit-head-vector-icon.jpg',
    bio: 'Strategic financial expert ensuring sustainable growth and operational excellence.'
  },
  { 
    name: 'Arijit Moulik', 
    role: 'Sr. VP Commercial', 
    image: 'https://static.vecteezy.com/system/resources/previews/000/546/107/original/businessman-in-suit-head-vector-icon.jpg',
    bio: 'Leading market expansion and partnership development across global markets.'
  },
  { 
    name: 'Hinata', 
    role: 'Co-Founder', 
    image: 'https://static.vecteezy.com/system/resources/previews/000/546/107/original/businessman-in-suit-head-vector-icon.jpg',
    bio: 'Technology innovator with expertise in aviation systems and passenger experience.'
  },
];

function AboutUs() {
  return (
    <div className="font-sans  bg-[#161617]">
      <Navbar />
      
      {/* Hero Section */}
      {/* <div className="relative bg-black text-gray-700 py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1551590192-8070a16d9f67?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-6xl font-bold mb-4">About Us</h1>
          <div className="h-1 w-24 bg-[#F9672C] mb-8"></div>
          <p className="text-xl max-w-2xl">
            Elevating your journey with innovation, luxury, and a commitment to excellence.
          </p>
        </div>
      </div> */}
      
      {/* Mission Section */}
      <div className="container mx-auto px-6 py-16 bg-[#161617]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 bg-[#161617]">
          <h2 className="text-4xl font-bold mt-6 mb-6 text-white">Our Mission</h2>

            <div className="h-1 w-16 bg-[#F9672C] mb-8"></div>
            <p className="text-[#8b868a] text-lg leading-relaxed mb-8">
              At Xelevate Aviation, we are committed to redefining air travel with cutting-edge technology and exceptional service. With a fleet of modern, fuel-efficient aircraft, we connect passengers to over 100 destinations worldwide, ensuring safety, comfort, and sustainability at every altitude.
            </p>
            <p className="text-[#8b868a] text-lg leading-relaxed mb-8">
              Our team of aviation experts brings decades of combined experience to deliver a seamless, luxurious flight experience that exceeds expectations and sets new industry standards.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F9672C] p-8 text-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">100+</h3>
                <p>Global Destinations</p>
              </div>
              <div className="bg-blue-900 p-8 text-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">15+</h3>
                <p>Years Experience</p>
              </div>
              <div className="bg-blue-900 p-8 text-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">50+</h3>
                <p>Modern Aircraft</p>
              </div>
              <div className="bg-[#F9672C] p-8 text-white rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-2">24/7</h3>
                <p>Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="bg-[#161617] py-16">
        <div className="container mx-auto px-6 bg-[#161617]">
          <div className="text-center mb-12 bg-[#161617]">
            <h2 className="text-4xl font-bold text-white">Our Leadership Team</h2>
            <div className="h-1 w-24 bg-[#F9672C] mx-auto my-4"></div>
            <p className="text-[#8b868a] text-lg leading-relaxed mb-8">
              Meet the experts behind SkyWings Aviation's success, driving innovation and excellence in private aviation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-6 py-6 bg-black border-t-4 border-blue-900">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-white font-small mb-3">{member.role}</p>
                    <p className="text-[#8b868a] text-sm">{member.bio}</p>
                    <div className="flex mt-4 space-x-3">
                      <a href="#" className="text-gray-500 hover:text-[#F9672C]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-[#F9672C]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="text-gray-500 hover:text-[#F9672C]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="container mx-auto px-6 py-16 bg-[#161617]">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Our Core Values</h2>
          <div className="h-1 w-24 bg-[#F9672C] mx-auto my-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#161617]">
          <div className="bg-black p-8 rounded-xl shadow-lg border-t-4 border-blue-900">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-6 ">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Safety First</h3>
            <p className="text-[#8b868a]">
              We maintain the highest safety standards across our fleet and operations, ensuring peace of mind for every passenger.
            </p>
          </div>
          
          <div className="bg-black p-8 rounded-xl shadow-lg border-t-4 border-blue-900">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Innovation</h3>
            <p className="text-[#8b868a]">
              We continuously explore new technologies and approaches to enhance the aviation experience and lead industry advancement.
            </p>
          </div>
          
          <div className="bg-black p-8 rounded-xl shadow-lg border-t-4 border-blue-900">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Sustainability</h3>
            <p className="text-[#8b868a]">
              We're committed to environmentally responsible operations, investing in fuel-efficient aircraft and green initiatives.
            </p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      {/* <div className="bg-[#F9672C] text-gray-700 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury in the Skies?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our team today to learn more about our services and how we can elevate your air travel experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/contact" className="bg-white text-[#F9672C] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Contact Us
            </a>
            <a href="/enquiry" className="bg-transparent border-2 border-white text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-white hover:text-[#F9672C] transition-colors">
              Make an Enquiry
            </a>
          </div>
        </div>
      </div> */}
      
      <Footer />
    </div>
  );
}

export default AboutUs;
