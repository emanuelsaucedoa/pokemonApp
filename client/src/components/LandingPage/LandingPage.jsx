import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';
import logo from '../../imagenes/logo.png';
import pokebola from '../../imagenes/pokebola.png';

const LandingPage = () => {


    return (
        <div className={s.container}>
            <img src={logo} alt="logo" />
            <div>
                <Link className={s.link} to='/home'><img src={pokebola} alt="pokebola"/></Link>
            </div>
            
        </div>
    );

};

export default LandingPage;