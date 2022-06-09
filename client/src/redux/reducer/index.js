import { GET_ALL_POKEMONS, GET_POKEMON, CREATE_POKEMON, GET_POKEMON_QUERY, GET_TYPES, FILTER, ORDER, SUCCESS, CLEAN } from "../actions";

const initialState = {
    pokemons: [],
    pokemon: {},
    backup: [],
    types: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                backup: action.payload
            }
        case GET_POKEMON: {
            return {
                ...state,
                pokemon: action.payload
            }
        }
        case CREATE_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        case GET_POKEMON_QUERY: {
            return {
                ...state,
                pokemon: action.payload
            }
        }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case FILTER:
            return {
                ...state,
                pokemons: action.payload
            };
        case ORDER:
            return {
                ...state,
                pokemons: action.payload
            }
        case SUCCESS:
            return{
                ...state,
                pokemon: action.payload
            }
        case CLEAN:
            return{
                ...state,
                pokemon: action.payload
            }
        
        default:
            return { ...state }
    };
};

export default rootReducer;