import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes, success } from '../../redux/actions';
import { useHistory } from "react-router-dom";
import Nav from '../Nav/Nav';
import s from './FormCreate.module.css';

const FormCreate = () => {

    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const backup = useSelector((state) => state.backup)
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [state, setState] = useState({
        name: "",
        vida: NaN,
        fuerza: NaN,
        defensa: NaN,
        velocidad: NaN,
        altura: NaN,
        peso: NaN,
        types: [],
    });

    React.useEffect(() => {
        dispatch(getTypes())
        dispatch(getAllPokemons())
    }, [])

    const validate = (input) => {
        let errors = {};
        let expresion = /^[a-zA-Z]+$/gm;
        let existe = backup.filter(e => input.name.toLowerCase() === e.name.toLowerCase())
        console.log(input)
        console.log(existe)
        if (!input.name) {
            errors.name = "Required";
        } else if (!expresion.test(input.name) || existe.length) {
            errors.name = "Invalid name"
        } else if (!input.vida || typeof input.vida === NaN || input.vida < 1) {
            errors.vida = "It must be a number and it must be positive"
        } else if (!input.fuerza || typeof input.fuerza === NaN || input.fuerza < 1) {
            errors.fuerza = "It must be a number and it must be positive"
        } else if (!input.defensa || typeof input.defensa === NaN || input.defensa < 1) {
            errors.defensa = "It must be a number and it must be positive"
        } else if (!input.velocidad || typeof input.velocidad === NaN || input.velocidad < 1) {
            errors.velocidad = "It must be a number and it must be positive"
        } else if (!input.altura || typeof input.altura === NaN || input.altura < 1) {
            errors.altura = "It must be a number and it must be positive"
        } else if (!input.peso || typeof input.peso === NaN || input.peso < 1) {
            errors.peso = "It must be a number and it must be positive"
        }
        return errors;
    };

    const handleInputChange = (e) => {
        if (e.target.name !== "name") {
            setErrors(
                validate({
                    ...state,
                    [e.target.name]: parseInt(e.target.value) //accedo a lo que vale e.target.name, por eso las bracket notation
                })

            )
            setState({
                ...state,
                [e.target.name]: parseInt(e.target.value)
            });
        } else {
            setErrors(
                validate({
                    ...state,
                    [e.target.name]: e.target.value,
                })
            );
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }

    }

    const checkbox = (e) => {
        if (e.target.checked === false) {
            let array;
            array = state.types.filter((id) => id !== parseInt(e.target.value));
            setState({
                ...state,
                types: array,
            });
        } else if (e.target.checked === true) {
                setState({
                    ...state,
                    types: [...state.types, parseInt(e.target.value)],
                });  
        }
    };

    const submit = async (e) => {

        e.preventDefault();
        const crear = await fetch("http://localhost:3001/pokemons", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        });
        dispatch(success(state));
        dispatch(getAllPokemons());
        const respuesta = await crear.json();
        console.log(respuesta);
        setState({
            name: "",
            vida: NaN,
            fuerza: NaN,
            defensa: NaN,
            velocidad: NaN,
            altura: NaN,
            peso: NaN,
            types: [],
        });
        history.push("/home/successCreate")
    };

    return (
        <div>
            <Nav />
            <div className={s.container}>
                <form className={s.form} action="POST" onSubmit={submit}>
                    <h2>Create your Pokemon</h2>
                    <div>
                        <div className={s.containerStats}>
                            <div className={s.errorCase}>
                                <input className={errors.name ? s.danger : s.question} placeholder='Name' required type="text" name="name" onChange={handleInputChange} />
                                {errors.name ? <p className={s.danger}>{errors.name}</p> : null}
                            </div>
                            <div className={s.errorCase}>
                                <input className={errors.vida ? s.danger : s.question} placeholder='Life' required type="text" name="vida" onChange={handleInputChange} />
                                {errors.vida ? <p className={s.danger}>{errors.vida}</p> : null}
                            </div>
                            <div className={s.errorCase}>
                                <input className={errors.fuerza ? s.danger : s.question} placeholder='Strength' required type="text" name="fuerza" onChange={handleInputChange} />
                                {errors.fuerza ? <p className={s.danger}>{errors.fuerza}</p> : null}
                            </div>
                            <div className={s.errorCase}>
                                <input className={errors.defensa ? s.danger : s.question} placeholder='Defense' required type="text" name="defensa" onChange={handleInputChange} />
                                {errors.defensa ? <p className={s.danger}>{errors.defensa}</p> : null}
                            </div>
                            <div className={s.errorCase}>
                                <input className={errors.velocidad ? s.danger : s.question} placeholder='Speed' required type="text" name="velocidad" onChange={handleInputChange} />
                                {errors.velocidad ? <p className={s.danger}>{errors.velocidad}</p> : null}
                            </div>
                            <div className={s.errorCase}>
                                <input className={errors.altura ? s.danger : s.question} placeholder='Height' required type="text" name="altura" onChange={handleInputChange} />
                                {errors.altura ? <p className={s.danger}>{errors.altura}</p> : null}
                            </div>
                            <div className={s.errorCase}>
                                <input className={errors.peso ? s.danger : s.question} placeholder='Weight' required type="text" name="peso" onChange={handleInputChange} />
                                {errors.peso ? <p className={s.danger}>{errors.peso}</p> : null}
                            </div>
                        </div>
                        <div className={s.containerTypes}>
                            <div className={s.types}>
                                {types?.map((t) => {
                                    return <div className={s.checkbox} key={t.id}>
                                        <div>
                                            <label>
                                                <input type="checkbox" className={`s.${t.name}`} name={t.name} value={t.id} id={t.id} onClick={checkbox} />
                                                <span className={s.list}>{t.name}</span>
                                            </label>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className={s.containerBtn}>
                            <input className={s.containerBtnInput} type="submit" disabled={errors.name || errors.vida || errors.fuerza || errors.velocidad || errors.defensa || errors.altura || errors.peso || !state.types.length ? true : false} value="Create Pokemon" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormCreate;
