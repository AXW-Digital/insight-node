import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from '../components/cards/ProfileCard'
import SettingsCard from '../components/cards/SettingsCard'
import AvatarCard from '../components/cards/AvatarCard'
import cardvaluelist from '../assets/js/cardvalues'
import { createSmallActivityCard } from '../components/cards/CardFunctions'



class ProfilePage extends Component {
    render() {
        return (
            <div>                
                <section id='profile' className='bg-light'>
                    <div className='container-fluid'>
                        <div className='row'>
                            
                            <div className='container-fluid'>
                                <div className='row align-items-center counts counts-profile '>
                                    <div className = 'col-xl-4'>
                                <AvatarCard />
                                </div>
                                    {cardvaluelist.filter(value => value.tyyppi === 'Activity').map(createSmallActivityCard)}
                                </div>
                            </div>
                        </div>
                        <div className='row '>
                            <div className='col-lg-4 '>
                                <ProfileCard
                                    cardTitle='Profiili'
                                    birthDate='01.01.1990'
                                    forename='John'
                                    surname='Doe'
                                    emailAddress='john.doe@email.com'
                                    phoneNumber='+358 40 123 4567'
                                    memberSince='01.03.2021'
                                    lastLogin='Tänään'
                                    homeCity='Helsinki'
                                    homeAddress='Vilhonvuorenkatu 12B'
                                />
                            </div>
                            <div className='col-lg-8'>
                                <SettingsCard
                                    cardTitle='Asetukset'
                                    maxdist={50}
                                    maxprice={20}
                                    emailNews={true}
                                    emailTest={false}
                                    emailSurvey={false}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(ProfilePage);