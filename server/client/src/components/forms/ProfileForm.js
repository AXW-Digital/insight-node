import React, { Component } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const ProfileForm = () => {
    
        const formik = useFormik({
            initialValues: {
                fName: '',
                sName: '',
                email: '',
                phone: '',
                address: '',
                addrNum: '',
                city: '',
                profileCreated: Date.now(),
                lastLogin: Date.now(),
                rank: 'Vaikuttaja'

            },
            onSubmit: async values =>  {
                const res = await axios.post('../api/profile/create', values)
                alert(res.data)
            }
        }); 



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
                                        <div className="form-label-group">
                                            <input 
                                            type="text" 
                                            id="fName" 
                                            className="form-control"
                                            name = 'fName'
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
                                            name = 'sName'
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
                                            name = 'email'
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
                                            name = 'phone'
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}  
                                            className="form-control" 
                                            placeholder="Password"
                                            pattern="[0-9]{9}" 
                                            required />
                                            <label htmlFor="phone">Puhelinnumero (ilman +358)</label>
                                        </div>


                                        <div className="form-label-group">
                                            <input 
                                            type="text" 
                                            id="address"
                                            name = 'address'
                                            onChange={formik.handleChange}
                                            value={formik.values.address}  
                                            className="form-control" 
                                            placeholder="." 
                                            required />
                                            <label htmlFor="address">Osoite</label>
                                        </div>
                                        <div className='row clearfix'>
                                            <div className='col-lg-5 col-md-12'>
                                                <div className="form-label-group">
                                                    <input 
                                                    type="number" 
                                                    id="addrNum"
                                                    name = 'addrNum'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.addrNum}  
                                                    className="form-control" 
                                                    placeholder="." 
                                                    required />
                                                    <label htmlFor="addrNum">Numero</label>
                                                </div>
                                            </div>
                                            <div className='col-lg-7 col-md-12'>
                                                <div className="form-label-group">
                                                    <input 
                                                    type="text" 
                                                    id="city"
                                                    name = 'city'
                                                    onChange={formik.handleChange}
                                                    value={formik.values.city}  
                                                    className="form-control" 
                                                    placeholder="." 
                                                    required />
                                                    <label htmlFor="city">Paikkakunta</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-lg btn-block text-uppercase btn-login mt-2" type="submit">Päivitä tiedot</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }

export default ProfileForm

