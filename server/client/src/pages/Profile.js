import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCard from '../components/cards/ProfileCard'
import AvatarCard from '../components/cards/AvatarCard'
import cardvaluelist from '../assets/js/cardvalues'
import { createSmallActivityCard } from '../components/cards/CardFunctions'
import Loader from '../components/parts/Loader'
import axios from 'axios'

// add a switch to wait for data until render

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          aggregates:[]
        };    
      }

    componentDidMount(){
        
        
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

        if (profile === null || profile === undefined) {
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
                                            {aggregates.length < 1 ? <Loader/> : 
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
                                        />
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