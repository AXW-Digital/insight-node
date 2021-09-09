import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from '../components/cards/ProfileCard'
import SettingsCard from '../components/cards/SettingsCard'
import AvatarCard from '../components/cards/AvatarCard'
import cardvaluelist from '../assets/js/cardvalues'
import { createSmallActivityCard } from '../components/cards/CardFunctions'
import Loader from '../components/parts/Loader'
import axios from 'axios';
import HomeStepper from '../components/parts/HomeStepper';

// add a switch to wait for data until render

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregates: []
        };
    }

    componentDidMount() {


        const getAggregates = async () => {
            await axios.get('/api/aggregates').then(
                res => {
                    this.setState({
                        aggregates: res.data
                    })
                }
            )
        }

        getAggregates();


    }



    render() {

        const profile = this.props.data.profile
        const settings = this.props.data.settings

        if (settings === null || profile === null || settings === undefined || profile === undefined) {
            <Loader />
        }

        const aggregates = this.state.aggregates

        const activity = [{
            id: 'a1',
            boxIcon: 'bx bx-message-detail',
            count: aggregates.totalSurveys,
            cardText: 'Vastatut kyselyt',
            tyyppi: 'Activity',
            suffix: '',
            color: 'blue'
        },
        {
            id: 'a2',
            boxIcon: 'bx bx-coin-stack',
            count: aggregates.totalBenefits,
            cardText: 'Kerrytetty bonus',
            tyyppi: 'Activity',
            suffix: '€',
            color: 'green'
        },

        {
            id: 'a3',
            boxIcon: 'bx bx-calendar-heart',
            count: aggregates.profileAge,
            cardText: 'Profiilin ikä',
            tyyppi: 'Activity',
            suffix: ' päivää',
            color: 'orange'
        },

        {
            id: 'a4',
            boxIcon: 'bx bx-bolt-circle',
            count: aggregates.totalPoints,
            cardText: 'Pisteet yhteensä',
            tyyppi: 'Activity',
            suffix: '',
            color: 'indigo'
        }]

        switch (profile) {
            case null:
                return <Loader />

            case false:
                return (
                    <section id="hero" className="d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-2">
                                    <div className="img-fluid animated mb-5">
                                        <h1>Hei vaikuttaja, muistathan päivittää profiilisi!</h1>
                                    </div>
                                </div>
                                <div className="col-lg-6 order-2 order-lg-1 hero-img align-items-center">

                                    <HomeStepper startStep={1} />

                                </div>
                            </div>
                        </div>
                    </section>
                )


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
                                                    id={profile._user}
                                                />
                                            </div>
                                            {aggregates.length < 1 ? <Loader /> :
                                                activity.map(createSmallActivityCard)}
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
                                            phoneNumber={profile.phone}
                                            memberSince={profile.profileCreated}
                                            lastLogin={profile.lastLogin}
                                            homeCity={profile.city}
                                            homeAddress={profile.address + ' ' + profile.addrNum}
                                            uName={profile.uName}
                                        />
                                    </div>
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
                                            <Loader />}
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