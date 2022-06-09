import React from "react";
import s from './Paginacion.module.css';
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Paginacion = ({ pagina, setPagina, maximo }) => {

  const pokemons = useSelector(state => state.pokemons);

  useEffect(() => {
      setPagina(1)
  }, [pokemons])

  const nextPage = () => {

    setPagina(parseInt(pagina) + 1);
  };

  const previousPage = () => {

    setPagina(parseInt(pagina) - 1);
  };

  const btnIndex = (i) => {
    setPagina(i)
  }

  const array = new Array(Math.ceil(maximo)).fill(true)

  return (
    <div className={s.container}>
      <button className={s.buttonPrevius} disabled={pagina === 1 || pagina < 1} onClick={previousPage}>❮</button>
      {array && array.map((e, i) => {
        return <button className={pagina === i + 1 ? s.active : s.btnIndex} key={i} onClick={() => btnIndex(i + 1)}>{i + 1}</button>
      })}
      <button className={s.buttonNext} disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage}>❯</button>
    </div>
  )
}

export default Paginacion;
