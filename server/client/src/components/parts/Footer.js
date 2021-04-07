import React from 'react';

const Footer= () => (
        <div>
             <footer id="footer">
                    <div className="footer-top">
                    <div className="container">
                        <div className="row">

                        <div className="col-lg-3 col-md-6 footer-contact" data-aos="fade-up" data-aos-delay="100">
                            <h3>Growflow <br /> Insights</h3>
                            <p>
                            Verkkosaarenkatu 5 <br />
                            00580 Helsinki<br />
                            </p>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links" data-aos="fade-up" data-aos-delay="200">
                            <h4>Pikalinkit</h4>
                            <ul>
                            <li> <a href="#kukka">Visio</a></li>
                            <li><a href="#kasvut">Kasvuvaikkutaja</a></li>
                            <li><a href="#growflow">Growflow</a></li>
                            <li><a href="#voima">Voima</a></li>
                            </ul>
                        </div>

                       

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Seuraa meitä</h4>
                            <div className="social-links mt-3">
                            <a 
                                target="_blank" 
                                rel="noopener noreferrer"
                                href="https://www.facebook.com/Kasvuvirta" 
                                className="facebook">
                                <i className="bx bxl-facebook"></i>
                            </a>
                            <a 
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.instagram.com/growflowoy/" 
                                className="instagram">
                                <i className="bx bxl-instagram"></i>
                            </a>
                            <a 
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/company/growflowoy" 
                                className="google-plus">
                                <i className="bx bxl-linkedin"></i>
                            </a>
                                <a 
                                    href="#page-top" 
                                    className="back-to-top">
                                    <i className='bx bxs-chevrons-up' ></i>
                                </a>
                            
                            </div>
                            
                        </div>

                        </div>
                    </div>
                    </div>

                    <div className="container py-4">
                    <div className="copyright">
                        &copy; Copyright <strong><span>AxwDigital</span></strong>. All Rights Reserved
                    </div>
                    </div>
                    
        </footer>
        </div>
);
export default Footer;