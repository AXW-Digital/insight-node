import React, { Component } from 'react'
import KyselyForm from '../components/forms/KyselyForm'
import Header from '../components/parts/HeaderHome';
import Footer from '../components/parts/Footer'
import $ from 'jquery';





export default class KyselyPage extends Component {
    
    // This jquery function enables toggle of multiple select forms
    componentDidMount() {
        $("select[multiple] option").mousedown(function(){
            var $self = $(this);         
            if ($self.prop("selected"))
                   $self.prop("selected", false);
            else
                $self.prop("selected", true);         
            return false;
         });
    }

    

    render() {
        console.log(this.props.match.params.id)
        return (
            <div>
                <Header />
                <div id='page-top'> </div>
                <section id='kysely' className='bg-light'>
                    <div className='container'>
                        <KyselyForm question = {this.props.match.params.id}/>
                    </div>
                </section>
                <Footer />
            </div>
            
        )
    }
}

