import React, { Component } from 'react';
import ScrollButton from './ScrollButton'
import { connect } from 'react-redux'
// import store from '../../store/index';
import storeReducer from '../../reducers/storeReducer'
import { configureStore } from '@reduxjs/toolkit'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: null,
        };

        const store = configureStore({ reducer: storeReducer })        

        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.

            
            this.setState({
                modalOpen: store.getState().modalOpen
            });
            console.log('state changed', this.state)
            
        });

        // this.sortShuffle = this.sortShuffle.bind(this);
    }


    render() {
        
        return (
            <div>
                <footer id="footer">
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">

                                <div className="col-lg-3 col-md-6 footer-contact" data-aos="fade-up" data-aos-delay="100">
                                    <h3 className='footer-text'>Growflow <br /> Insights</h3>
                                    <p>
                                        Verkkosaarenkatu 5 <br />
                            00580 Helsinki<br />
                                    </p>
                                </div>

                                {/* <div className="col-lg-3 col-md-6 footer-links" data-aos="fade-up" data-aos-delay="200">
                            <h4>Pikalinkit</h4>
                            <ul>
                            <li> <a href="#kukka">Visio</a></li>
                            <li><a href="#kasvut">Kasvuvaikkutaja</a></li>
                            <li><a href="#growflow">Growflow</a></li>
                            <li><a href="#voima">Voima</a></li>
                            </ul>
                        </div> */}



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
                                        {this.props.data.store.modalOpen === false ? <ScrollButton /> : null}

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
        )
    }
};

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(Footer);