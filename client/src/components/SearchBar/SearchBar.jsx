import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getTypes, filter, order, getAllPokemons } from '../../redux/actions';
import s from './SearchBar.module.css'
import pikachu from '../../imagenes/pikachu.png';
import {BsSearch} from 'react-icons/bs'
import {BsFilterLeft} from 'react-icons/bs'

const SearchBar = () => {

  const dispatch = useDispatch()
  const [state, setState] = useState("");
  const [state2, setState2] = useState("");
  const [restart, setRestart] = useState(false);
  const [restart2, setRestart2] = useState(false);
  const history = useHistory()
  const types = useSelector(store => store.types)
  let pokemons = useSelector(store => store.pokemons)
  let backup = useSelector(store => store.backup)

  React.useEffect(() => {
    dispatch(getTypes())
    // dispatch(getAllPokemons())
    // dispatch(type(pokemons))
  }, [])


  const handleInputChange = (e) => {
    setState(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    if(state){
      history.push(`/home/pokemon/${state.toLocaleLowerCase()}`)
    setState("");
    }
    
  };

  const byType = (e) => {

    if(e.target.disabled === false){
      setRestart2(true)
    }

    let array = []

    backup.map(p => {
      if (p.types.includes(e.target.value)) {
        return array.push(p)
      }
    })

    dispatch(filter(array))


    console.log(array)
  }

  const byApiOrBd = (e) => {

    if(e.target.disabled === false){
      setRestart2(true)
    }


    let array = []

    if (e.target.value === 'API') {
      backup.map(p => {
        if (!isNaN(p.id)) {
          array.push(p)
        }
      })
      console.log('estas filtrando por api')

    } else if (e.target.value === 'BD') {
      backup.map(p => {
        if (isNaN(p.id)) {
          array.push(p)
        }
      })
      console.log('estas filtrando por bd')

    }

    dispatch(filter(array))

  }

  const orderPokemons = (e) => {

    if(e.target.disabled === false){
      setRestart2(true)
    }

    let array = []


    if (e.target.value === 'a-z') {

      let array2 = pokemons.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
      })

      array = [...array2]
      console.log('ordenar de a-z')

    } else if (e.target.value === 'z-a') {

      let array2 = pokemons.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
      })

      array = [...array2]
      console.log('ordenar de z-a')

    }
    else if (e.target.value === 'fuerza+') {

      let array2 = pokemons.sort(function (a, b) {
        if (a.fuerza > b.fuerza) {
          return 1;
        }
        if (a.fuerza < b.fuerza) {
          return -1;
        }
      })

      array = [...array2]


      console.log('ordenar de menos fuerza a mas fuerza')
    }
    else if (e.target.value === 'fuerza-') {

      let array2 = pokemons.sort(function (a, b) {
        if (a.fuerza < b.fuerza) {
          return 1;
        }
        if (a.fuerza > b.fuerza) {
          return -1;
        }
      })

      array = [...array2]

      console.log('ordenar de mayor fuerza a menor fuerza')
    }

    dispatch(order(array))
    console.log(array)
  }

  const clean = (e) => {
    e.preventDefault()
    dispatch(getAllPokemons())
    setRestart(true)
  }

  const handleInputChange2 = (e) => {
    setState2(e.target.value);
  };

  const filtrarBusqueda = (e) => {
    e.preventDefault()

    let array = []

    backup.map(p => {
      if (p.name.includes(state2.toLocaleLowerCase())) {
        return array.push(p)
      }
    })
    if(array.length === 0){
      dispatch(filter({error: "Error 404 Pokemon Not Found"}))
    }else{
      dispatch(filter(array))
    }

    setState2("");
    console.log(array)
  }

  return (
    <div className={s.container}>
      <div className={s.filtros} >
        <div>
          <form onSubmit={filtrarBusqueda}>
          <div className={s.formFilter} >
            <div className={s.inputFilter}>
              <input
              className={s.filt}
              type="text"
              placeholder="Filter pokemon"
              value={state2}
              onChange={handleInputChange2}
            />
            </div>
            <div className={s.submitFilter}>
              <BsFilterLeft fontSize='1.25rem' color='rgb(250, 204, 119, 0.90)'/>
            </div>
              
          </div>
        </form>
        </div>
        <div className={s.type}>
          <select onChange={byType}>
            <option selected={restart} disabled={restart2}>By type</option>
            {types?.map((t) => (
              <option value={t.name} key={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className={s.byApiOrBd}>
          <select onChange={byApiOrBd}>
            <option selected={restart} disabled={restart2}>By API or BD</option>
            <option value="API">API</option>
            <option value="BD">BD</option>
          </select>
        </div>
        <div className={s.order}>
          <select onChange={orderPokemons}>
            <option selected={restart} disabled={restart2}>Order</option>
            <option name="a-z" value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="fuerza+">Strength-+</option>
            <option value="fuerza-">Strength+-</option>
          </select>
        </div>
        <div className={s.clean}>
          <input  className={s.input} type="button" value="Clean filters" onClick={clean} />
        </div>
        <form className={s.find} onSubmit={submit}>
        <div>
          <input
            type="text"
            value={state}
            onChange={handleInputChange}
            placeholder="Find your pokemon"
          />
          <BsSearch fontSize='1.25rem' color='rgb(250, 204, 119, 0.90)'/>
        </div>
      </form>
      </div>
      
    </div>
  );
};

export default SearchBar;