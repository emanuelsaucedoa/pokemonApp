import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import s from './PokemonCreado.module.css';
import pikachu from '../../imagenes/pikachu.png';
import { useDispatch, useSelector } from 'react-redux';
import { success } from '../../redux/actions';

const PokemonCreado = () => {

    const pokemon = useSelector(state => state.pokemon)

    if(Object.keys(pokemon).length > 0){
        
        return (
        <div className={s.container}>
            <h1>Pokemon Created!</h1>
            <p>
                <Link className={s.link} to='/home'>
                    <img src={pikachu} alt="pikachu" />
                    <p>Volver a home</p></Link>
            </p>
        </div>
    )
    }else{
        return <Redirect to='/home' />
    }

    

}

export default PokemonCreado;