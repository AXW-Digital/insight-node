import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { SliderDist, SliderPrice } from '../parts/RangeSlider';
import { useFormik } from 'formik';
import axios from 'axios';
import { Subject } from 'rxjs';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';


const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#FFCF00',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        }
    }
});
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const subject = new Subject();

const dataService = {
    setData: d => subject.next({ value: d }),
    clearData: () => subject.next(),
    getData: () => subject.asObservable()
};

export { dataService }

var settingsData = {
    'maxprice': null,
    'maxdist': null,
    'emailTest': null,
    'emailSurvey': null,
    'emailNews': null
}


dataService.getData().subscribe(message => {
    var key = Object.keys(message.value)
    settingsData[key] = message.value[key]
    console.log(settingsData);
});



const SettingsCard = (props) => {

    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            uName: '',
            fName: '',
            sName: '',
            email: '',
            phone: '',
            address: '',
            geom: {},
            city: ''
        },

        onSubmit: async values => {
            try {
                const res = await axios.post('../api/profile/update', values);
                if (res.status === 200) {
                    alert(res.data)
                }
            } catch (err) {
                alert(err);
            }

        }
    });

    const updateSettings = async values => {
        const res = await axios.post('../api/settings/update', values)
        alert(res.data)
    }

    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyAu_der8LRPRQVkD7yY-0t2bw9geF_qGtw',
        onPlaceSelected: (place) => {
            var geom = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
            formik.setFieldValue("address", place.formatted_address);
            formik.setFieldValue("city", place.address_components[2].long_name);
            formik.setFieldValue('geom', geom)



        },
        options: {
            componentRestrictions: { country: "fi" },
            types: ["address"]
        },

    });


    function generateUser() {
        const shortName = uniqueNamesGenerator({
            dictionaries: [colors, adjectives, animals], // colors can be omitted here as not used
            length: 3,
            separator: '-'
        });
        formik.setFieldValue('uName', shortName)
    }


    return (
        <div>
            <div className="card profile-card my-5">
                <div className="card-body">
                    <h5 className="card-title text-center">{props.cardTitle}</h5>

                    <Tabs defaultActiveKey="home" id="settings-tabs" variant='pills' className='blue'>
                        <Tab eventKey="home" title="Profiili">
                            <div className="tab-pane body active" id="profile-tab">
                                <div className='row clearfix'>
                                    <div className='col-12 setting-col'>
                                        <small className="text-muted"> Menutestit </small>
                                        <hr />
                                    </div>
                                    <div className='col-12 '>
                                        <SliderDist
                                            maxdist={props.maxdist}
                                        />
                                    </div>
                                    <div className='col-12 '>
                                        <SliderPrice
                                            maxprice={props.maxprice}
                                        />
                                    </div>
                                    <div className='col-12 setting-col'>
                                        <small className="text-muted"> Sähköposti-ilmoitukset </small>
                                        <hr />
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="checkMail"
                                                defaultChecked={props.emailTest}
                                                onChange={e => dataService.setData({ 'emailTest': e.target.checked })}
                                            />
                                            <label className="custom-control-label" htmlFor="checkMail">Menutestit</label>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="checkMailKysely"
                                                defaultChecked={props.emailSurvey}
                                                onChange={e => dataService.setData({ 'emailSurvey': e.target.checked })}
                                            />
                                            <label className="custom-control-label" htmlFor="checkMailKysely">Kyselyt</label>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="checkMailNews"
                                                defaultChecked={props.emailNews}
                                                onChange={e => dataService.setData({ 'emailNews': e.target.checked })}
                                            />
                                            <label className="custom-control-label" htmlFor="checkMailNews">Newsletter</label>
                                        </div>
                                    </div>
                                    <div className='col-12 setting-col-n'>
                                        <hr />
                                    </div>
                                    <div className='col-md-3 ml-auto'>
                                        <button
                                            className="btn btn-lg btn-block text-uppercase btn-update-settings"
                                            onClick={() => updateSettings(settingsData)}
                                        >
                                            Päivitä
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="info" title="Tiedot">
                            <form className="form-signin" onSubmit={formik.handleSubmit}>
                                <div className="tab-pane body active" id="info-tab">
                                    <div className='row clearfix'>
                                        <div className='col-12 setting-col'>
                                            <small className="text-muted ">Perustiedot: </small>
                                            <hr />
                                        </div>
                                        <div className='col-9'>
                                            <div className="form-label-group">
                                                <input
                                                    type="text"
                                                    id="uName"
                                                    className="form-control"
                                                    name='uName'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.uName}
                                                    placeholder='Käyttäjänimi'
                                                    required
                                                    autofocus />
                                                <label htmlFor="uName">Käyttäjänimi</label>
                                            </div>
                                        </div>
                                        <div className='col-3 btn-generate-col'>
                                            <ThemeProvider theme={theme}>
                                                <div className='btn btn-block text-uppercase btn-generate' onClick={() => generateUser()}>
                                                    Generoi
                                                </div>
                                            </ThemeProvider>
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input
                                                    type="text"
                                                    id="fName"
                                                    className="form-control"
                                                    name='fName'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.fName}
                                                    placeholder="Etunimi"
                                                    autoFocus />
                                                <label htmlFor="fName">Etunimi</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input
                                                    type="text"
                                                    id="sName"
                                                    name='sName'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.sName}
                                                    className="form-control"
                                                    placeholder="Sukunimi"
                                                    autoFocus />
                                                <label htmlFor="sName">Sukunimi</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name='email'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.email}
                                                    className="form-control"
                                                    placeholder="Email address"
                                                    autoFocus />
                                                <label htmlFor="email">Sähköposti</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name='phone'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.phone}
                                                    className="form-control"
                                                    placeholder="Password"
                                                    pattern="[0-9]{9}"
                                                />
                                                <label htmlFor="phone">Puhelinnumero (ilman +358)</label>
                                            </div>
                                        </div>
                                        <div className='col-12 setting-col-n'>
                                            <small className="text-muted setting-col-n">Paikkatiedot: </small>
                                            <hr />
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className="form-label-group">
                                                <input
                                                    type="text"
                                                    ref={ref}
                                                    id="address"
                                                    name='address'
                                                    placeholder="Osoite"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.address}
                                                    className="form-control"
                                                    required
                                                />
                                                <label htmlFor="address">Osoite</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-4 col-md-12'>
                                            <div className="form-label-group">
                                                <input
                                                    type="text"
                                                    id="city"
                                                    name='city'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.city}
                                                    className="form-control"
                                                    placeholder="." />
                                                <label htmlFor="city">Paikkakunta</label>
                                            </div>
                                        </div>

                                        <div className='col-md-3 ml-auto mt-3'>
                                            <button
                                                className="btn btn-lg btn-block text-uppercase btn-update-settings"
                                                type='submit'
                                            >
                                                Päivitä
                                        </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </Tab>
                        <Tab eventKey="security" title="Turvallisuus">
                            <div className="tab-pane body active" id="security-tab">
                                <div className='row clearfix'>
                                    <div className='col-12 setting-col'>
                                        <small className="text-muted ">Salasanhallinta: </small>
                                        <hr />
                                    </div>
                                    <div className='col-12'>
                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                            <label htmlFor="inputPassword">Nykyinen salasana</label>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className="form-label-group">
                                            <input type="password" id="inputPasswordNew" className="form-control" placeholder="Password" required />
                                            <label htmlFor="inputPasswordNew">Uusi salasana</label>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className="form-label-group">
                                            <input type="password" id="inputPasswordNewAgain" className="form-control" placeholder="Password" required />
                                            <label htmlFor="inputPasswordNewAgain">Salasana uudelleen</label>
                                        </div>
                                    </div>
                                    <div className='col-md-3 mb-3 ml-auto mt-3'>
                                        <a href="/api/settings/update" className="btn btn-lg btn-block text-uppercase btn-update-settings">Päivitä</a>
                                    </div>
                                    <div className='col-12 setting-col'>
                                        <small className="text-muted ">Käyttäjähallinta: </small>
                                        <hr />
                                    </div>
                                    <div className='col-md-9'>
                                        <div className="form-label-group">
                                            <div className='font-weight-bold'>
                                                Poista käyttäjä
                                                </div>
                                                Jos poistat käyttäjän, et voi enää palata ja menetät kaikki kertyneet kupongit ja bonukset
                                            </div>
                                    </div>
                                    <div className='col-md-3 ml-auto'>
                                        <a href="/api/settings/update" className="btn btn-lg btn-block text-uppercase btn-danger">Poista</a>
                                    </div>


                                </div>
                            </div>
                        </Tab>
                    </Tabs>


                </div>
            </div>

        </div>
    );
}


export default SettingsCard;