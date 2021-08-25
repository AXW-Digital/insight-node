import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from '../components/cards/ProfileCard'
import SettingsCard from '../components/cards/SettingsCard'
import AvatarCard from '../components/cards/AvatarCard'
import cardvaluelist from '../assets/js/cardvalues'
import { createSmallActivityCard } from '../components/cards/CardFunctions'
import Loader from '../components/parts/Loader'

// add a switch to wait for data until render

class ProfilePage extends Component {
    


    render() {

        const profile = this.props.data.profile
        const settings = this.props.data.settings

        if (settings === null || profile === null || settings === undefined || profile === undefined) {
            <Loader /> 
        }

        switch (profile) {
            case null:
                return <Loader /> 
            default:
                console.log(profile)

                return (
                    <div>
                        <section id='profile' className='bg-light'>
                            <div className='container-fluid'>
                                <div className='row'>

                                    <div className='container-fluid'>
                                        <div className='row align-items-center counts counts-profile '>
                                            <div className='col-xl-4'>
                                                <AvatarCard
                                                    fName={profile.fName}
                                                    sName={profile.sName}
                                                    city={profile.city}
                                                    rank={profile.rank}
                                                    id = {profile._user}
                                                />
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
                                            forename={profile.fName}
                                            surname={profile.sName}
                                            emailAddress={profile.email}
                                            phoneNumber={`+358` + profile.phone}
                                            memberSince={profile.profileCreated}
                                            lastLogin={profile.lastLogin}
                                            homeCity={profile.city}
                                            homeAddress={profile.address + ' ' + profile.addrNum}
                                        />
                                    </div>
                                    <div className='col-lg-8'>
                                        {settings?
                                        <SettingsCard
                                            cardTitle='Asetukset'
                                            maxdist={settings.maxdist}
                                            maxprice={settings.maxprice}
                                            emailNews={settings.emailNews}
                                            emailTest={settings.emailTest}
                                            emailSurvey={settings.emailSurvey}
                                        />
                                        :
                                        <Loader /> }
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

export default connect(mapStateToProps)(ProfilePage);