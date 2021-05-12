import React, { useState } from 'react';



const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 800) {
            setVisible(true)
        }
        else if (scrolled <= 800) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div
            className='back-to-top'
            onClick={scrollToTop}
            style={{ display: visible ? 'inline' : 'none' }}>
            <i className="fas fa-chevron-up justify-content-center align-items-center d-flex"/>
        </div>
    );
}

export default ScrollButton;