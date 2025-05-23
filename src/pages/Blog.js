import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Blog.css";
import Footer from '../NewPages/Footer';
import Navbar from '../components/Navbar';
import { ref, onValue, push, set } from "firebase/database";
import { database } from "../firebaseConfig"; // Make sure this path matches your firebase config file

const BlogPage = () => {
  const [blogs, setBlogs] = useState({
    featured: [],
    recommended: []
  });
  const [activeDialog, setActiveDialog] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Add event listener to close dialog with ESC key
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setActiveDialog(null);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);

    // Cleanup subscription and event listener on unmount
    return () => {
      unsubscribe();
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle subscribe button click
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setSubscribeStatus({
        message: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Reference to the 'subscribers' node in your database
      const subscribersRef = ref(database, 'subscribers');
      
      // Generate a unique key for this subscription
      const newSubscriberRef = push(subscribersRef);
      
      // Save the email with timestamp
      await set(newSubscriberRef, {
        email: email,
        timestamp: new Date().toISOString(),
        source: 'blog_newsletter'
      });
      
      // Show success message
      setSubscribeStatus({
        message: 'Successfully subscribed to our newsletter!',
        type: 'success'
      });
      
      // Clear the input field
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus({ message: '', type: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setSubscribeStatus({
        message: 'Failed to subscribe. Please try again later.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to open dialog with blog content
  const openDialog = (blog) => {
    setActiveDialog(blog);
    // Prevent body scrolling when dialog is open
    document.body.style.overflow = 'hidden';
  };

  // Function to close dialog
  const closeDialog = () => {
    setActiveDialog(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

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
          <p className="blog-excerpt">
            {blog.excerpt.split(" ").slice(0, 30).join(" ")}...
          </p>
          <button className="read-more-btn" onClick={() => openDialog(blog)}>
            Read more
          </button>
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
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscribeStatus.message && (
              <div className={`subscription-message ${subscribeStatus.type}`}>
                {subscribeStatus.message}
              </div>
            )}
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

      {/* Read More Dialog */}
      {activeDialog && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div 
            className="dialog-content" 
            onClick={(e) => e.stopPropagation()}
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            <div className="dialog-header">
              <h2 className="dialog-title">{activeDialog.title}</h2>
              <button className="close-dialog-btn" onClick={closeDialog}>
                <span>×</span>
              </button>
            </div>
            <div className="dialog-meta">
              <span className="dialog-author">by {activeDialog.author}</span>
              <span className="dialog-date">{new Date(activeDialog.date).toLocaleDateString()}</span>
              <span className="dialog-category">{activeDialog.category}</span>
            </div>
            <div className="dialog-body">
              <p className="dialog-text">{activeDialog.excerpt}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;