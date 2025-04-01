import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Blog.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BlogPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div>
        <Navbar />

    <div className="blog-container">
      {/* Header Section */}
      <header className="blog-header" data-aos="fade-down">
        <div className="header-content">
          <h1 className="blog-title">Luxury Jets Blog</h1>
          <p className="inspirational-quote">"The sky is not the limit; it’s just the beginning of your journey."</p>
        </div>
      </header>

      
      {/* Featured Blog Section */}
      <section className="featured-blog">
        <article className="blog-post" data-aos="flip-left">
          <img src="https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936" alt="Luxury Jet" className="blog-image" />
          <h2>Luxury Jets Dominating the Sky</h2>
          <p>by Hype Luxury | October 2, 2024</p>
          <p>
            Private jets have redefined luxury air travel with speed, comfort, and exclusivity. These high-performance planes ensure you arrive at your destination in style. The newest models come equipped with the latest in technology and safety, offering not just speed but also an unparalleled flying experience...
          </p>
          <button className="read-more">Read more</button>
        </article>

        <article className="blog-post" data-aos="flip-left">
          <img src="https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936" alt="Electric Aviation" className="blog-image" />
          <h2>The Future of Electric Aviation</h2>
          <p>by Hype Luxury | September 1, 2024</p>
          <p>
            The aviation industry is embracing electric power. Electric planes are a growing trend in luxury aviation, and companies are innovating to build sustainable, zero-emission aircraft. Imagine flying across the world with minimal environmental impact while enjoying the same luxury and speed...
          </p>
          <button className="read-more">Read more</button>
        </article>

        <article className="blog-post" data-aos="flip-left">
          <img src="https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936" alt="Luxury Jet" className="blog-image" />
          <h2>Luxury Jets Dominating the Sky</h2>
          <p>by Hype Luxury | October 2, 2024</p>
          <p>
            Private jets have redefined luxury air travel with speed, comfort, and exclusivity. These high-performance planes ensure you arrive at your destination in style. The newest models come equipped with the latest in technology and safety, offering not just speed but also an unparalleled flying experience...
          </p>
          <button className="read-more">Read more</button>
        </article>

        <article className="blog-post" data-aos="flip-left">
          <img src="https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936" alt="Luxury Jet" className="blog-image" />
          <h2>Luxury Jets Dominating the Sky</h2>
          <p>by Hype Luxury | October 2, 2024</p>
          <p>
            Private jets have redefined luxury air travel with speed, comfort, and exclusivity. These high-performance planes ensure you arrive at your destination in style. The newest models come equipped with the latest in technology and safety, offering not just speed but also an unparalleled flying experience...
          </p>
          <button className="read-more">Read more</button>
        </article>
      </section>

      <h1 className="blog-title" data-aos="fade-up">Recommended Blogs</h1>

        
      {/* Featured Blog Section */}
      <section className="featured-blog">
        <article className="blog-post" data-aos="flip-left">
          <img src="https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936" alt="Luxury Jet" className="blog-image" />
          <h2>Luxury Jets Dominating the Sky</h2>
          <p>by Hype Luxury | October 2, 2024</p>
          <p>
            Private jets have redefined luxury air travel with speed, comfort, and exclusivity. These high-performance planes ensure you arrive at your destination in style. The newest models come equipped with the latest in technology and safety, offering not just speed but also an unparalleled flying experience...
          </p>
          <button className="read-more">Read more</button>
        </article>

        <article className="blog-post" data-aos="flip-left">
          <img src="https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936" alt="Electric Aviation" className="blog-image" />
          <h2>The Future of Electric Aviation</h2>
          <p>by Hype Luxury | September 1, 2024</p>
          <p>
            The aviation industry is embracing electric power. Electric planes are a growing trend in luxury aviation, and companies are innovating to build sustainable, zero-emission aircraft. Imagine flying across the world with minimal environmental impact while enjoying the same luxury and speed...
          </p>
          <button className="read-more">Read more</button>
        </article>

        <article className="blog-post" data-aos="flip-left">
          <img src="https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936" alt="Luxury Jet" className="blog-image" />
          <h2>Luxury Jets Dominating the Sky</h2>
          <p>by Hype Luxury | October 2, 2024</p>
          <p>
            Private jets have redefined luxury air travel with speed, comfort, and exclusivity. These high-performance planes ensure you arrive at your destination in style. The newest models come equipped with the latest in technology and safety, offering not just speed but also an unparalleled flying experience...
          </p>
          <button className="read-more">Read more</button>
        </article>

        <article className="blog-post" data-aos="flip-left">
          <img src="https://ik.imagekit.io/egrcxziyv/avatar/jets/H6.jpg?updatedAt=1724305833936" alt="Luxury Jet" className="blog-image" />
          <h2>Luxury Jets Dominating the Sky</h2>
          <p>by Hype Luxury | October 2, 2024</p>
          <p>
            Private jets have redefined luxury air travel with speed, comfort, and exclusivity. These high-performance planes ensure you arrive at your destination in style. The newest models come equipped with the latest in technology and safety, offering not just speed but also an unparalleled flying experience...
          </p>
          <button className="read-more">Read more</button>
        </article>
      </section>
    </div>
    <Footer /></div>

  );
};

export default BlogPage; 
