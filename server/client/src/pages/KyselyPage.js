import React, { Component } from 'react';
import { connect } from 'react-redux';
import KyselyForm from '../components/forms/KyselyForm'

import Footer from '../components/parts/Footer'
// import $ from 'jquery';





class KyselyPage extends Component {

    // // This jquery function enables toggle of multiple select forms
    // componentDidMount() {
    //     $("select[multiple] option").mousedown(function(){
    //         var $self = $(this);         
    //         if ($self.prop("selected"))
    //                $self.prop("selected", false);
    //         else
    //             $self.prop("selected", true);         
    //         return false;
    //      });
    // }

    // const profile = props.data.
    // switch

    componentDidMount(){
        const profile = this.props.data.profile
        console.log(profile)
    }
    
    render() {
        
        const profile = this.props.data.profile

        switch(profile){
            case null:
                return ( 
                    <div>Loading...</div>
                )
            default:
                return (
                    <div>
        
                        <div id='page-top'> </div>
                        <section id='kysely' className='bg-light'>
                            <div className='container'>
                                <KyselyForm
                                    question={this.props.match.params.id}
                                    currentPoints={profile.points}
                                />
                            </div>
                        </section>
                        <Footer />
                    </div>
        
                )

        }


        

    }
}


function mapStateToProps(data) {
    return { data };
}



export default connect(mapStateToProps)(KyselyPage);