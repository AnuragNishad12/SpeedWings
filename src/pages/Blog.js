import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Blog.css";
import Footer from '../NewPages/Footer';
import Navbar from '../components/Navbar';
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig"; // Make sure this path matches your firebase config file

const BlogPage = () => {
  const [blogs, setBlogs] = useState({
    featured: [],
    recommended: []
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    });

    // Fetch data from Firebase
    const jetsRef = ref(database, "luxuryJets");
    const unsubscribe = onValue(jetsRef, (snapshot) => {
      const jetsData = snapshot.val();
      if (jetsData) {
        const allJets = Object.keys(jetsData).map(key => ({
          id: key,
          ...jetsData[key]
        }));

        // Split into featured (first 4) and recommended (rest)
        const featuredJets = allJets.slice(0, 4);
        const recommendedJets = allJets.slice(4);

        setBlogs({
          featured: featuredJets,
          recommended: recommendedJets
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to render blog cards
  const renderBlogCards = (blogArray) => {
    return blogArray.map(blog => (
      <article key={blog.id} className="blog-card" data-aos="fade-up">
        <div className="blog-image-container">
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <span className="blog-category">{blog.category}</span>
        </div>
        <div className="blog-content bg-black">
          <h2 className="blog-title">{blog.title}</h2>
          <div className="blog-meta">
            <span className="blog-author">by {blog.author}</span>
            <span className="blog-date">{new Date(blog.date).toLocaleDateString()}</span>
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
            {/* <div className="hero-search">
              <input type="text" placeholder="Search articles..." />
              <button><i className="fas fa-search"></i></button>
            </div> */}
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