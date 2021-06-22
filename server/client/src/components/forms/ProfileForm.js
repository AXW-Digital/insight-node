import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { SignupModal } from '../parts/SurveyModal';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import yellow from '@material-ui/core/colors/yellow';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";



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


const ProfileForm = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            uName: '',
            fName: '',
            sName: '',
            email: '',
            phone: '',
            address: '',
            addrNum: '',
            city: '',
            profileCreated: Date.now(),
            lastLogin: Date.now(),
            rank: 'Vaikuttaja',
            level: 0,
            coupons: 0,
            points: 0,
            geom: {}
        },
        onSubmit: values => {
            const geom = values.geom
            if (invalidAddress(geom) === true) {
                alert('Tarkista vielä osoite uudelleen!')
            } else {
                axios.post('../api/profile/create', values)
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res)
                            setModalShow(true)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    });

    function generateUser() {
        const shortName = uniqueNamesGenerator({
            dictionaries: [colors, adjectives, animals], // colors can be omitted here as not used
            length: 3,
            separator: '-'
        });
        formik.setFieldValue('uName', shortName)
    }

    function invalidAddress() {
        let error = false;
        const geom = formik.values.geom
        if (Object.keys(geom).length === 0) {
            error = true
        }
        return error;
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


    const sendFirstPoints = (points) => {
        axios.post('/api/profile/points', { points })
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }





    return (
        <div className='container-fluid d-flex vh-100 vw-100 sign-bg m-0 px-0 pb-5'>
            <div className="container signin">
                <div className="row sign-bg">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <div className="d-flex flex-row-reverse">
                                    <a
                                        href="/">
                                        <i className="bx bx-exit bx-sm bx-sign"></i>
                                    </a>
                                </div>
                                <h5 className="card-title text-center">Päivitä profiili</h5>
                                <form className="form-signin" onSubmit={formik.handleSubmit}>
                                    <div className='row clearfix'>
                                        <div className='col-8'>
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
                                        <div className='col-4'>
                                            <ThemeProvider theme={theme}>
                                                <Button variant="contained" color="primary" className={classes.margin} onClick={() => generateUser()}>
                                                    Generoi
                                                </Button>
                                            </ThemeProvider>
                                        </div>
                                    </div>
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="fName"
                                            className="form-control"
                                            name='fName'
                                            onChange={formik.handleChange}
                                            value={formik.values.fName}
                                            placeholder="Etunimi"
                                            required
                                            autofocus />
                                        <label htmlFor="fName">Etunimi</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input
                                            type="text"
                                            id="sName"
                                            name='sName'
                                            onChange={formik.handleChange}
                                            value={formik.values.sName}
                                            className="form-control"
                                            placeholder="Sukunimi"
                                            required
                                            autofocus />
                                        <label htmlFor="sName">Sukunimi</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input
                                            type="email"
                                            id="email"
                                            name='email'
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            className="form-control"
                                            placeholder="Email address"
                                            required
                                            autofocus />
                                        <label htmlFor="email">Sähköposti</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name='phone'
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}
                                            className="form-control"
                                            placeholder="Password"
                                            pattern="^(\+358)[0-9]{9}"
                                            required
                                            style={{ textOverflow: 'clip' }} />
                                        <label htmlFor="phone">Puhelinnumero (+358)</label>
                                    </div>
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
                                    <button className="btn btn-lg btn-block text-uppercase btn-login mt-2" type="submit">Päivitä tiedot</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <SignupModal
                show={modalShow}
                onHide={() => { setModalShow(false); sendFirstPoints(300); window.location = "/home" }}
                pointCount={300}
            />
        </div>

    );
}

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(ProfileForm);



