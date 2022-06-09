import React, { Component } from 'react'
import PokemonCard from '../PokemonCard/PokemonCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import { useState } from 'react';
import Nav from '../Nav/Nav';
import Paginacion from '../Paginacion/Paginacion';
import SearchBar from '../SearchBar/SearchBar';
import { connect } from 'react-redux';
import s from './Home.module.css';
import fire from '../../imagenes/fire.png';
import bug from '../../imagenes/bug.png';
import dark from '../../imagenes/dark.png';
import dragon from '../../imagenes/dragon.png';
import electric from '../../imagenes/electric.png';
import fairy from '../../imagenes/fairy.png';
import fighting from '../../imagenes/fighting.png';
import flying from '../../imagenes/flying.png';
import ghost from '../../imagenes/ghost.png';
import grass from '../../imagenes/grass.png';
import ground from '../../imagenes/ground.png';
import ice from '../../imagenes/ice.png';
import normal from '../../imagenes/normal.png';
import poison from '../../imagenes/poison.png';
import psychic from '../../imagenes/psychic.png';
import rock from '../../imagenes/rock.png';
import steel from '../../imagenes/steel.png';
import water from '../../imagenes/water.png';
import pikachugif from '../../imagenes/pikachugif.gif';


const Home = (props) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllPokemons())
    }, [])

    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(12);
    const maximo = props.pokemons.length / porPagina;
    

    if (props.pokemons.error) {

        return (
            <div className={s.containerError}>
                <Nav />
                <SearchBar />
                <div className={s.error}>
                    <p>{props.pokemons.error}</p>
                    <img src={pikachugif} alt="pikachu-error"/>
                </div>
                
            </div>
        )
    }
    return (
        <div>
            <Nav />
            <SearchBar />
            <div className={s.containerComponents}>
                <div>
                    <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
                </div>
                <div className={s.container}>
                    {props.pokemons.length === 0 ? <img className={s.pikachuGif} src={pikachugif} alt="pikachu gif" /> :
                        props.pokemons && props.pokemons.slice(
                            (pagina - 1) * porPagina,
                            (pagina - 1) * porPagina + porPagina
                        ).map(pokemon => {
                            return (
                                <PokemonCard
                                    key={pokemon.id}
                                    id={pokemon.id}
                                    name={pokemon.name}
                                    image={pokemon.image}
                                    fuerza={pokemon.fuerza}
                                    types={pokemon.types.map(e => {
                                        return <p>{e === 'fire' ?
                                            <img src={fire} alt='fire' /> : e === 'normal' ?
                                                <img src={normal} alt='normal' /> : e === 'flying' ?
                                                    <img src={flying} alt='flying' /> : e === 'bug' ?
                                                        <img src={bug} alt='bug' /> : e === 'dark' ?
                                                            <img src={dark} alt='dark' /> : e === 'dragon' ?
                                                                <img src={dragon} alt='dragon' /> : e === 'electric' ?
                                                                    <img src={electric} alt='electric' /> : e === 'fairy' ?
                                                                        <img src={fairy} alt='fairy' /> : e === 'fighting' ?
                                                                            <img src={fighting} alt='fighting' /> : e === 'ghost' ?
                                                                                <img src={ghost} alt='ghost' /> : e === 'grass' ?
                                                                                    <img src={grass} alt='grass' /> : e === 'ground' ?
                                                                                        <img src={ground} alt='ground' /> : e === 'ice' ?
                                                                                            <img src={ice} alt='ice' /> : e === 'poison' ?
                                                                                                <img src={poison} alt='poison' /> : e === 'psychic' ?
                                                                                                    <img src={psychic} alt='psychic' /> : e === 'rock' ?
                                                                                                        <img src={rock} alt='rock' /> : e === 'steel' ?
                                                                                                            <img src={steel} alt='steel' /> : e === 'water' ?
                                                                                                                <img src={water} alt='water' /> : null}</p>
                                    })}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );

};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
    }
};

export default connect(mapStateToProps)(Home)