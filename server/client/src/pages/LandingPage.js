import React, { Component } from 'react';
//components

import Vaikuttava from './../components/sections/Vaikuttava';
import Kukkavoi from './../components/sections/Kukkavoi'
import Kasvuvaikkuttajat from './../components/sections/Kasvuvaikkuttajat'
import Growflow from './../components/sections/Growflow'
import Voima from './../components/sections/Voima'
import Footer from './../components/parts/Footer'
import AOS from 'aos';


class LandingPage extends Component {
    componentDidMount(){
        AOS.init({
          duration : 1500,
          once: true
        })
      }
      
    render() {
        return (
            <React.Fragment>

                <Vaikuttava />
                <Kukkavoi />
                <Kasvuvaikkuttajat />
                <Growflow />
                <Voima />
                <Footer />
            </React.Fragment>
        );
    }
}

export default LandingPage;