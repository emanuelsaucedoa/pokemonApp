export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_POKEMON = 'GET_POKEMON';
export const GET_POKEMON_QUERY = 'GET_POKEMON_QUERY';
export const GET_TYPES = 'GET_TYPES';
export const FILTER = 'FILTER';
export const FILTER_FOR_TYPE = 'FILTER_FOR_TYPE';
export const ORDER = 'ORDER';
export const SUCCESS = 'SUCCESS';
export const CLEAN = 'CLEAN';

export const getAllPokemons = () => {
    return (dispatch) => {
        return fetch('http://localhost:3001/pokemons')
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_ALL_POKEMONS,
                    payload: data
                })
            })
    }
}


export const getPokemon = (id) => {
    return (dispatch) => {
        return fetch(`http://localhost:3001/pokemons/${id}`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_POKEMON,
                    payload: data
                })
            })
    }
}

export const getPokemonQuery = (name) => {
    return (dispatch) => {
        return fetch(`http://localhost:3001/pokemons/?name=${name}`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_POKEMON_QUERY,
                    payload: data
                })
            })
    }
}

export const getTypes = () => {
    return (dispatch) => {
        return fetch('http://localhost:3001/types')
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_TYPES,
                    payload: data
                })
            })
    }
}

export const filter = (data) => {
    return {
        type: FILTER,
        payload: data,
    };
};

export const order = (data) => {
    return {
        type: ORDER,
        payload: data,
    };
};

export const success = (data) => {
    return {
        type: SUCCESS,
        payload: data,
    };
};

export const clean = () => {
    return {
        type: CLEAN,
        payload: {},
    };
};




