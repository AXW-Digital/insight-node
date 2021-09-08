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
import dict from '../../assets/js/dict';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import ProfileFormPopover from './ProfileFormPopover';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TermsAndConditionsPage from '../../pages/TermsAndConditionsPage';




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
            geom: {},
            terms: true
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
            dictionaries: [dict.Adjektiivit, dict.Substantiivit], // colors can be omitted here as not used
            length: 2,
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


    // Popover
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popOverId, setPopOverId] = React.useState(null);
    const [termsChecked, setTermsChecked] = React.useState(false);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event, id) => {
        setAnchorEl(event.currentTarget);
        setPopOverId(id)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopOverId(null)
    };


    // Terms & conditions dialog
    const [termsOpen, setTermsOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickTermsOpen = (scrollType) => () => {
        setTermsOpen(true);
        setScroll(scrollType);
    };

    const handleTermsClose = (accept) => {
        setTermsOpen(false);
        if (accept){
            formik.setFieldValue('terms', true)
            setTermsChecked(true)
        }
    };

    const handleTermsClick = () => {
        setTermsChecked(!termsChecked)
    }



    // const descriptionElementRef = React.useRef(null);
    // React.useEffect(() => {
    //     if (termsOpen) {
    //         const { current: descriptionElement } = descriptionElementRef;
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus();
    //         }
    //     }
    // }, [termsOpen]);





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
                                    <div className='row clearfix'>
                                        <div className='col-10'>
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
                                        </div>
                                        <div className='col-2'>
                                            <HelpOutlineOutlinedIcon
                                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                                aria-haspopup="true"
                                                onMouseEnter={(e) => handlePopoverOpen(e, 1)}
                                                onMouseLeave={handlePopoverClose}
                                            />
                                            <ProfileFormPopover
                                                anchorEl={anchorEl}
                                                open={popOverId === 1}
                                                content='Keräämme nimesi koska siksi'
                                            />
                                        </div>
                                    </div>
                                    <div className='row clearfix'>
                                        <div className='col-10'>
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
                                        </div>
                                        <div className='col-2'>
                                            <HelpOutlineOutlinedIcon
                                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                                aria-haspopup="true"
                                                onMouseEnter={(e) => handlePopoverOpen(e, 2)}
                                                onMouseLeave={handlePopoverClose}
                                            />
                                            <ProfileFormPopover
                                                anchorEl={anchorEl}
                                                open={popOverId === 2}
                                                content='Keräämme sukunimesi koska siksi'
                                            />
                                        </div>
                                    </div>
                                    <div className='row clearfix'>
                                        <div className='col-10'>
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
                                        </div>
                                        <div className='col-2'>
                                            <HelpOutlineOutlinedIcon
                                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                                aria-haspopup="true"
                                                onMouseEnter={(e) => handlePopoverOpen(e, 3)}
                                                onMouseLeave={handlePopoverClose}
                                            />
                                            <ProfileFormPopover
                                                anchorEl={anchorEl}
                                                open={popOverId === 3}
                                                content='Tarvitsemme sähöpostisi koska siksi'
                                            />
                                        </div>
                                    </div>
                                    <div className='row clearfix'>
                                        <div className='col-10'>
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
                                        </div>
                                        <div className='col-2'>
                                            <HelpOutlineOutlinedIcon
                                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                                aria-haspopup="true"
                                                onMouseEnter={(e) => handlePopoverOpen(e, 4)}
                                                onMouseLeave={handlePopoverClose}
                                            />
                                            <ProfileFormPopover
                                                anchorEl={anchorEl}
                                                open={popOverId === 4}
                                                content='Puhelinnumeron tarvitsemme koska siksi'
                                            />
                                        </div>
                                    </div>
                                    <div className='row clearfix'>
                                        <div className='col-10'>
                                            <div className="form-label-group">
                                                <input
                                                    // type="text"
                                                    ref={ref}
                                                    id="address"
                                                    name='address'
                                                    placeholder="Osoite"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.address}
                                                    className="form-control"
                                                    autocomplete="off"
                                                    required
                                                />
                                                <label htmlFor="address">Osoite</label>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <HelpOutlineOutlinedIcon
                                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                                aria-haspopup="true"
                                                onMouseEnter={(e) => handlePopoverOpen(e, 5)}
                                                onMouseLeave={handlePopoverClose}
                                            />
                                            <ProfileFormPopover
                                                anchorEl={anchorEl}
                                                open={popOverId === 5}
                                                content='Haluamme tietää missä asut...'
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-1'>
                                            <div className="form-label-group">
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    name='terms'
                                                    onChange={formik.handleChange}
                                                    onClick={handleTermsClick}
                                                    value={formik.values.terms}
                                                    required
                                                    checked={termsChecked}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-11'>
                                            Olen hyväksynyt ja lukenut
                                            <a onClick={handleClickTermsOpen('paper')} className='bold'> &nbsp; käyttöehdot</a>
                                        </div>
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

            <Dialog
                open={termsOpen}
                onClose={handleTermsClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Käyttöehdot</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        // ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <TermsAndConditionsPage/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleTermsClose(false)} color="primary">
                        Sulje
                    </Button>
                    <Button onClick={() => handleTermsClose(true)} color="primary">
                        Hyväksy
                    </Button>
                </DialogActions>
            </Dialog>

        </div>

    );
}

function mapStateToProps(data) {
    return { data };

}

export default connect(mapStateToProps)(ProfileForm);



