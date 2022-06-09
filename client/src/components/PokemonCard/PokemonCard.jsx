import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from './PokemonCard.module.css';
import icono from '../../imagenes/fire.png';

const PokemonCard = (props) =>  {

        return (
            <div className={s.containerCard}>
                <div className={s.card}>
                <div className={s.fondoImg}>
                  <img className={s.pokemon} src={props.image}/>   
                </div>
                <h2>{props.name}</h2>
                <div className={s.types}>
                    {/* <img src={icono} alt="icono" /> */}
                    {props.types}
                </div>
                <Link className={s.link} to={`/home/pokemon/${props.id}`}>Details</Link>
            </div>
            </div>
            
        );
};

export default PokemonCard;