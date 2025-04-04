import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Blog.css";
import Footer from '../NewPages/Footer';
import Navbar from '../components/Navbar';

const BlogPage = () => {
  // Blog data as JSON
  const [blogs, setBlogs] = useState({
    featured: [
      {
        id: 1,
        image: "https://images.pexels.com/photos/9599604/pexels-photo-9599604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Luxury Jets Dominating the Sky",
        author: "Hype Luxury",
        date: "October 2, 2024",
        excerpt: "Private jets have redefined luxury air travel with speed, comfort, and exclusivity. These high-performance planes ensure you arrive at your destination in style. The newest models come equipped with the latest in technology and safety, offering not just speed but also an unparalleled flying experience...",
        category: "Aviation Luxury"
      },
      {
        id: 2,
        image: "https://images.pexels.com/photos/28919311/pexels-photo-28919311/free-photo-of-private-jet-taxiing-at-airport-runway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "The Future of Electric Aviation",
        author: "Hype Luxury",
        date: "September 1, 2024",
        excerpt: "The aviation industry is embracing electric power. Electric planes are a growing trend in luxury aviation, and companies are innovating to build sustainable, zero-emission aircraft. Imagine flying across the world with minimal environmental impact while enjoying the same luxury and speed...",
        category: "Sustainable Aviation"
      },
      {
        id: 3,
        image: "https://images.pexels.com/photos/11080085/pexels-photo-11080085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Top 5 Most Luxurious Jet Interiors",
        author: "Hype Luxury",
        date: "August 15, 2024",
        excerpt: "Step inside the world's most opulent private jets where luxury knows no bounds. From gold-plated fixtures to master bedrooms with ensuite bathrooms, these flying mansions redefine what's possible at 40,000 feet. Discover the design philosophies and premium materials that make these jet interiors true masterpieces...",
        category: "Interior Design"
      },
      {
        id: 4,
        image: "https://images.pexels.com/photos/17377677/pexels-photo-17377677/free-photo-of-private-jet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Charter vs. Ownership: Which is Right for You?",
        author: "Hype Luxury",
        date: "July 28, 2024",
        excerpt: "The decision between chartering and owning a private jet comes with significant financial considerations. This in-depth analysis breaks down the costs, benefits, and lifestyle factors to consider when making this important choice for your luxury travel needs...",
        category: "Investment"
      }
    ],
    recommended: [
      {
        id: 5,
        image: "https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936",
        title: "The World's Most Exclusive Airports",
        author: "Hype Luxury",
        date: "June 12, 2024",
        excerpt: "Discover the ultra-luxurious terminals and FBOs catering exclusively to private jet travelers. These exclusive facilities offer personalized services, privacy, and amenities that redefine the airport experience for the discerning traveler...",
        category: "Destinations"
      },
      {
        id: 6,
        image: "https://images.pexels.com/photos/20212472/pexels-photo-20212472/free-photo-of-private-plane-on-tarmac.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Technological Innovations in Private Aviation",
        author: "Hype Luxury",
        date: "May 25, 2024",
        excerpt: "From advanced avionics to revolutionary cabin connectivity, private aviation continues to push technological boundaries. Explore the cutting-edge innovations that are enhancing safety, efficiency, and the passenger experience in modern luxury jets...",
        category: "Technology"
      },
      {
        id: 7,
        image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "The Art of In-Flight Dining",
        author: "Hype Luxury",
        date: "April 18, 2024",
        excerpt: "Private jet culinary experiences have evolved beyond simple meals to become gourmet adventures at altitude. Learn how top chefs are collaborating with private jet companies to create memorable dining experiences that rival the world's finest restaurants...",
        category: "Lifestyle"
      },
      {
        id: 8,
        image: "https://images.pexels.com/photos/17687399/pexels-photo-17687399/free-photo-of-view-of-a-yacht.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Investing in Aviation: Market Trends for 2024",
        author: "Hype Luxury",
        date: "March 30, 2024",
        excerpt: "The private aviation market continues to evolve with new investment opportunities emerging. From fractional ownership to aviation stocks, this analysis explores the market trends and investment strategies for those looking to capitalize on luxury aviation's growth...",
        category: "Business"
      }
    ]
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    });
  }, []);

  // Function to render blog cards
  const renderBlogCards = (blogArray) => {
    return blogArray.map(blog => (
      <article key={blog.id} className="blog-card" data-aos="fade-up">
        <div className="blog-image-container">
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <span className="blog-category ">{blog.category}</span>
        </div>
        <div className="blog-content bg-black">
          <h2 className="blog-title">{blog.title}</h2>
          <div className="blog-meta">
            <span className="blog-author">by {blog.author}</span>
            <span className="blog-date">{blog.date}</span>
          </div>
          <p className="blog-excerpt">{blog.excerpt}</p>
          <button className="read-more-btn">Read more</button>
        </div>
      </article>
    ));
  };

  return (
    <div className="blog-page bg-[#161617]">
      <Navbar />

      <div className="blog-container bg-[#161617]">
        {/* Hero Section */}
        <section className="blog-hero" data-aos="fade-down">
          <div className="hero-content">
            <h1 className="hero-title">Luxury Jets Blog</h1>
            <p className="hero-quote">"The sky is not the limit; it's just the beginning of your journey."</p>
            <div className="hero-search">
              <input type="text" placeholder="Search articles..." />
              <button><i className="fas fa-search"></i></button>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="blog-section">
          <div className="section-header">
            <h2 className="section-title" data-aos="fade-right">Featured Articles</h2>
            <div className="section-line" data-aos="fade-left"></div>
          </div>
          <div className="blog-grid">
            {renderBlogCards(blogs.featured)}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section" data-aos="zoom-in">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest in luxury aviation.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </section>
        
        {/* Recommended Section */}
        <section className="blog-section">
          <div className="section-header">
            <h2 className="section-title" data-aos="fade-right">Recommended Reading</h2>
            <div className="section-line" data-aos="fade-left"></div>
          </div>
          <div className="blog-grid">
            {renderBlogCards(blogs.recommended)}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;