import React, { Component } from 'react'
import KyselyForm from '../components/forms/KyselyForm'

import Footer from '../components/parts/Footer'
// import $ from 'jquery';





export default function KyselyPage (props) {
    
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

    


        return (
            <div>
                
                <div id='page-top'> </div>
                <section id='kysely' className='bg-light'>
                    <div className='container'>
                        <KyselyForm question = {props.match.params.id}/>
                    </div>
                </section>
                <Footer />
            </div>
            
        )
    
}

