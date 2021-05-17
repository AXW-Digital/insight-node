import React, { Component } from 'react';
import { connect } from 'react-redux';
//components

import LandingSection1 from '../components/sections/LandingSection1';
import LandingSection2 from '../components/sections/LandingSection2';
import LandingSection3 from '../components/sections/LandingSection3';
import LandingSection4 from '../components/sections/LandingSection4';
import LandingSection5 from '../components/sections/LandingSection5';
import LandingSection6 from '../components/sections/LandingSection6';
import Footer from './../components/parts/Footer';



class LandingPage extends Component {
     
    render() {
        return (
                <div>
                <LandingSection1 data = {this.props.data} />
                <LandingSection2 />
                <LandingSection3 />
                <LandingSection4 />
                <LandingSection5 />
                <LandingSection6 />
                <Footer />
                </div>
        );
    }
}

function mapStateToProps(data) {
    return {data};
  
  }
  
  
  
export default connect(mapStateToProps)(LandingPage);