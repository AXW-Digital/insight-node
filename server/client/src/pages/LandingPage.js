import React, { Component } from 'react';
import { connect } from 'react-redux';
//components

import Vaikuttava from './../components/sections/Vaikuttava';
import Kukkavoi from './../components/sections/Kukkavoi'
import Kasvuvaikkuttajat from './../components/sections/Kasvuvaikkuttajat'
import Growflow from './../components/sections/Growflow'
import Voima from './../components/sections/Voima'
import Footer from './../components/parts/Footer'



class LandingPage extends Component {
     
    render() {
        return (
                <div>
                <Vaikuttava data = {this.props.data} />
                <Kukkavoi />
                <Kasvuvaikkuttajat />
                <Growflow />
                <Voima />
                <Footer />
                </div>
        );
    }
}

function mapStateToProps(data) {
    return {data};
  
  }
  
  
  
export default connect(mapStateToProps)(LandingPage);