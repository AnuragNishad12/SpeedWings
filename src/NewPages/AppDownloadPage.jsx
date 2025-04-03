import React from 'react';
import { ArrowDown, Download, Smartphone, Check, Star } from 'lucide-react';

const AppDownloadPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-orange-500" style={{ backgroundColor: "#F9672C" }}></div>
            <h1 className="ml-3 text-xl font-bold">AppName</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="hover:text-orange-500" style={{ color: "#1A202C", hoverColor: "#F9672C" }}>Features</a></li>
              <li><a href="#testimonials" className="hover:text-orange-500" style={{ color: "#1A202C", hoverColor: "#F9672C" }}>Testimonials</a></li>
              <li><a href="#download" className="hover:text-orange-500" style={{ color: "#1A202C", hoverColor: "#F9672C" }}>Download</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F9672C" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Transform Your Experience</h1>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">Download our revolutionary app today and join thousands of satisfied users worldwide.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <a href="#download" className="bg-white text-orange-500 hover:bg-gray-100 font-bold rounded-full px-8 py-4 flex items-center justify-center gap-2 transition shadow-lg" style={{ color: "#F9672C" }}>
              <Download size={20} />
              Download Now
            </a>
            <a href="#learn-more" className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-medium rounded-full px-8 py-4 flex items-center justify-center gap-2 transition" style={{ hoverColor: "#F9672C" }}>
              Learn More
              <ArrowDown size={20} />
            </a>
          </div>
          
          <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-xl">
            <img src="/api/placeholder/300/600" alt="App Screenshot" className="rounded-lg mx-auto" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our App?</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 mb-6" style={{ backgroundColor: "#FFF0EB", color: "#F9672C" }}>
                <Smartphone size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Intuitive Design</h3>
              <p className="text-gray-600">Our sleek interface makes navigation effortless, ensuring a smooth user experience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 mb-6" style={{ backgroundColor: "#FFF0EB", color: "#F9672C" }}>
                <Check size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Powerful Features</h3>
              <p className="text-gray-600">Access advanced tools that boost productivity and enhance your daily workflow.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 mb-6" style={{ backgroundColor: "#FFF0EB", color: "#F9672C" }}>
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Support</h3>
              <p className="text-gray-600">Our dedicated team is always ready to help with any questions or concerns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <div className="flex text-orange-500" style={{ color: "#F9672C" }}>
                    <Star size={16} fill="#F9672C" />
                    <Star size={16} fill="#F9672C" />
                    <Star size={16} fill="#F9672C" />
                    <Star size={16} fill="#F9672C" />
                    <Star size={16} fill="#F9672C" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"This app has completely transformed how I manage my daily tasks. The interface is intuitive and the features are exactly what I needed!"</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Michael Chen</h4>
                  <div className="flex text-orange-500" style={{ color: "#F9672C" }}>
                    <Star size={16} fill="#F9672C" />
                    <Star size={16} fill="#F9672C" />
                    <Star size={16} fill="#F9672C" />
                    <Star size={16} fill="#F9672C" />
                    <Star size={16} fill="#F9672C" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"I've tried many similar apps, but nothing compares to this one. The customer support is outstanding and the regular updates keep improving the experience."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Download Our App Today</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of satisfied users and experience the difference.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a href="#ios" className="bg-black hover:bg-gray-800 text-white font-bold rounded-lg px-8 py-4 flex items-center justify-center gap-3 transition w-64">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="currentColor"/>
              </svg>
              App Store
            </a>
            <a href="#android" className="bg-black hover:bg-gray-800 text-white font-bold rounded-lg px-8 py-4 flex items-center justify-center gap-3 transition w-64">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M17.77 10.32C18.29 11.18 18.29 12.82 17.77 13.68L15.43 17.49C15.09 18.05 14.49 18.37 13.86 18.37C13.33 18.37 12.8 18.13 12.42 17.68L12 17.21L11.58 17.68C11.21 18.11 10.67 18.37 10.14 18.37C9.51 18.37 8.91 18.05 8.57 17.49L6.23 13.68C5.71 12.82 5.71 11.18 6.23 10.32L8.57 6.51C8.91 5.95 9.51 5.63 10.14 5.63C10.67 5.63 11.2 5.87 11.58 6.32L12 6.79L12.42 6.32C12.8 5.87 13.33 5.63 13.86 5.63C14.49 5.63 15.09 5.95 15.43 6.51L17.77 10.32ZM12 9.36L11.21 8.5C11.08 8.35 10.92 8.26 10.74 8.26C10.56 8.26 10.39 8.35 10.27 8.5L8.79 10.5C8.52 10.87 8.52 11.35 8.79 11.71L10.27 13.73C10.39 13.89 10.55 13.98 10.74 13.98C10.92 13.98 11.07 13.9 11.21 13.74L12 12.89L12.79 13.73C12.93 13.89 13.08 13.98 13.26 13.98C13.44 13.98 13.61 13.89 13.73 13.73L15.21 11.73C15.48 11.36 15.48 10.88 15.21 10.51L13.73 8.51C13.61 8.35 13.45 8.26 13.26 8.26C13.08 8.26 12.92 8.35 12.79 8.5L12 9.36Z" fill="currentColor"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-md bg-orange-500" style={{ backgroundColor: "#F9672C" }}></div>
                <h3 className="ml-2 text-lg font-bold text-white">AppName</h3>
              </div>
              <p className="mb-4">Transforming the way you experience digital solutions.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-10 pt-6 text-center">
            <p>© 2025 AppName. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppDownloadPage;