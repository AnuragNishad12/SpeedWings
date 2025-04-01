import React, { useEffect, useRef, useState } from 'react';

const FloatingButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const progressCircleRef = useRef(null);
    const floatingBtnRef = useRef(null);
    const radius = 36; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Total length of circle stroke

    useEffect(() => {
        const progressCircle = progressCircleRef.current;

        // Set initial stroke properties
        if (progressCircle) {
            progressCircle.style.strokeDasharray = `${circumference}`;
            progressCircle.style.strokeDashoffset = `${circumference}`;
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Ensure .hero exists before accessing height
            const heroSection = document.querySelector('.hero');
            const heroHeight = heroSection ? heroSection.clientHeight : 200; // Default fallback

            setIsVisible(scrollTop > heroHeight);

            // Calculate and update progress
            const scrollPercent = (scrollTop / docHeight) * 100;
            const offset = circumference - (scrollPercent / 100) * circumference;

            if (progressCircle) {
                progressCircle.style.strokeDashoffset = offset;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [circumference]);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            className={`floating-btn ${isVisible ? 'show' : ''}`}
            ref={floatingBtnRef}
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000,
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: '#002D62',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
            }}
        >
            <svg className="progress-ring" width="80" height="80" viewBox="0 0 80 80">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff66cc" stopOpacity="1" />
                        <stop offset="100%" stopColor="#66ccff" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <circle
                    className="progress-ring__circle"
                    stroke="url(#grad1)"
                    strokeWidth="6"
                    fill="transparent"
                    r={radius}
                    cx="40"
                    cy="40"
                    ref={progressCircleRef}
                    style={{
                        transition: 'stroke-dashoffset 0.3s ease-in-out',
                        strokeLinecap: 'round',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                    }}
                />
            </svg>
            <i
                className="fas fa-arrow-up"
                style={{
                    position: 'absolute',
                    fontSize: '20px',
                    color: 'white',
                }}
            ></i>
        </div>
    );
};

export default FloatingButton;
