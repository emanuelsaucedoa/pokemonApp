import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon, getPokemonQuery } from '../../redux/actions';
import Nav from '../Nav/Nav';
import s from './PokemonDetail.module.css';
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
import { clean } from '../../redux/actions';

const PokemonDetail = (props) => {


    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.pokemon)

    React.useEffect(() => {
        if (isNaN(props.match.params.pokemonId) && props.match.params.pokemonId.length < 30) {
            dispatch(getPokemonQuery(props.match.params.pokemonId))
        } else {
            dispatch(getPokemon(props.match.params.pokemonId))
        }
        return () => dispatch(clean())
    }, [])

    console.log(pokemon)

    return (
        <div className={s.fullContainer}>
             <Nav/> 
            <div className={s.container}>
                <img className={s.imageTwo} src={pokemon.imageTwo}/>
                <div className={s.containerPokemon}>
                    <div className={s.card}>
                        {pokemon.error ? <p>{pokemon.error}</p> : !pokemon.hasOwnProperty('name') ?
                            <img className={s.pikachuGif} src={pikachugif} alt='pikachugif' /> : <div className={s.info}>
                                <div>
                                    <div className={s.nameTypes}>
                                        <p>{pokemon.name}</p>
                                    {pokemon.type.map(e => {
                                        return <p className={s.icono}>{e === 'fire' ?
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
                                    </div>
                                    <img src={pokemon.image} alt="pokemon" />

                                </div>


                                <div className={s.stats}>
                                    <p className={s.green}>HP {pokemon.vida}</p>
                                    <p className={s.red}>ATK {pokemon.fuerza}</p>
                                    <p className={s.black}>DEF {pokemon.defensa}</p>
                                    <p className={s.blue}>SP {pokemon.velocidad}</p>
                                    <p className={s.pink}>HEIGHT {pokemon.altura}</p>
                                    <p className={s.violet}>WEIGHT {pokemon.peso}</p>
                                </div>

                            </div>}
                    </div>
                </div>

            </div>
        </div>


    );
};

export default PokemonDetail;