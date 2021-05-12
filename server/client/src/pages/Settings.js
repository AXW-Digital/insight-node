import React, { Component } from 'react';
import { connect } from 'react-redux';
import SettingsCard from '../components/cards/SettingsCard'
import Loader from '../components/parts/Loader'

// add a switch to wait for data until render

class Settings extends Component {



    render() {

        const settings = this.props.data.settings

        if (settings === null || settings === undefined) {
            <div>
                <Loader />
            </div>
        }

        switch (settings) {
            case null:
                return <Loader />
            default:
                return (
                    <div>
                        <section id='profile' className='bg-light'>
                            <div className='container-fluid'>
                                <div className='row '>
                                    <div className='col-lg-8'>
                                        {settings ?
                                            <SettingsCard
                                                cardTitle='Asetukset'
                                                maxdist={settings.maxdist}
                                                maxprice={settings.maxprice}
                                                emailNews={settings.emailNews}
                                                emailTest={settings.emailTest}
                                                emailSurvey={settings.emailSurvey}
                                            />
                                            :
                                                <Loader />
                                            }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                );
        }
    }
}

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(Settings);