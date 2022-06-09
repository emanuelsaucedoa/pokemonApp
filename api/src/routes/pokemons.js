const { Router } = require('express');
const { Pokemon, Type } = require("../db.js");
const fetch = require("node-fetch");

const router = Router();

router.post('/', async (req, res) => {

    let { name, vida, fuerza, defensa, velocidad, altura, peso, types } = req.body;

    if (isNaN(vida) || isNaN(fuerza) || isNaN(defensa) || isNaN(velocidad) || isNaN(altura) || isNaN(peso) || !types || !types.length) {
        return res.json({ error: "Alguno de los argumentos no es un numero o no contiene un tipo" });
    } else if (!name) {
        return res.json({ error: "El nombre es obligatorio" });
    }

    const existe = await Pokemon.findOne({ where: { name: name } });
    if (existe) return res.json({ error: "El pokemon ya existe" });

    const pokemon = await Pokemon.create({
        name: name.toLowerCase(),
        vida: parseFloat(vida),
        fuerza: parseFloat(fuerza),
        defensa: parseFloat(defensa),
        velocidad: parseFloat(velocidad),
        altura: parseFloat(altura),
        peso: parseFloat(peso),
    });

    await pokemon.addTypes(types)

    res.status(201).json({ confirmacion: "Pokemon creado" });

})

router.get('/', async (req, res) => {
    let { name } = req.query;

    if (name) {
        name.toLowerCase();
        let bdQuery = await Pokemon.findOne({
            where: {
                name: name,
            },
            include: Type,
        });

        if (bdQuery) {
            let pokemonDb = 
                {
                    id: bdQuery.id,
                    name: bdQuery.name,
                    type: bdQuery.types.map((t) => t.type),
                    image: bdQuery.image,
                    vida: bdQuery.vida,
                    fuerza: bdQuery.fuerza,
                    defensa: bdQuery.defensa,
                    velocidad: bdQuery.velocidad,
                    altura: bdQuery.altura,
                    peso: bdQuery.peso
                }
            return res.json(pokemonDb);
        } else if (!bdQuery) {
            try {
                let api = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                let data = await api.json();
                let apiQuery =
                    {
                        id: data.id,
                        name: data.name,
                        type: data.types.map((t) => t.type.name),
                        image: data.sprites.other['official-artwork'].front_default,
                        imageTwo: data.sprites.versions['generation-iii']['ruby-sapphire'].front_default,
                        vida: data.stats[0].base_stat,
                        fuerza: data.stats[1].base_stat,
                        defensa: data.stats[2].base_stat,
                        velocidad: data.stats[5].base_stat,
                        altura: data.height,
                        peso: data.weight
                    }
                
                return res.json(apiQuery);
            } catch (error) {
                return res.json({ error: 'Error 404 Pokemon Not Found' })
            }

        }

    } else {

        let pokePromises = []

        for (let i = 1; i <= 40; i++) {
            pokePromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }

        let bd = await Pokemon.findAll({
            include: [{
                model: Type,
                through: { attributes: [] }, //no me trae informacion de Type_Pokemon
                attributes: ["name"]
            }],
            attributes: ["name", "image", "id", "fuerza"]
        })

        Promise.all(pokePromises)
            .then(response => Promise.all(response.map(pokemon => pokemon.json())))
            .then((data) => {
                let pokemons = data.map(pokemon => {
                    return {
                        id: pokemon.id,
                        name: pokemon.name,
                        fuerza: pokemon.stats[1].base_stat,
                        image: pokemon.sprites.other['official-artwork'].front_default,
                        types: pokemon.types.map(t => {
                            return t.type.name
                        })
                    }
                })

                bd = bd.map(e => e.toJSON()) //Paso los valores a formato json
                bd = bd.map(e => {
                    return { ...e, types: e.types.map(e => e.name) }
                })


                let result = [...bd, ...pokemons]

                res.json(result);
            });
    }
})

router.get('/:id', async (req, res) => {

    let { id } = req.params;

    if (id.length > 3) {

        let bdId = await Pokemon.findOne({
            where: {
                id: id,
            },
            include: Type,
        });

        try {
            let pokemonDbId =
                {
                    id: bdId.id,
                    name: bdId.name,
                    type: bdId.types.map((t) => t.name),
                    image: bdId.image,
                    vida: bdId.vida,
                    fuerza: bdId.fuerza,
                    defensa: bdId.defensa,
                    velocidad: bdId.velocidad,
                    altura: bdId.altura,
                    peso: bdId.peso,
                }
            return res.json(pokemonDbId)
        } catch (error) {
            return res.json(error.message)
        }
    }
    if (id.length < 3) {
        try {
            let api = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            let data = await api.json();

            let pokemonApiId =
                {
                    id: data.id,
                    name: data.name,
                    type: data.types.map((t) => t.type.name),
                    image: data.sprites.other['official-artwork'].front_default,
                    imageTwo: data.sprites.versions['generation-iii']['ruby-sapphire'].front_default,
                    vida: data.stats[0].base_stat,
                    fuerza: data.stats[1].base_stat,
                    defensa: data.stats[2].base_stat,
                    velocidad: data.stats[5].base_stat,
                    altura: data.height,
                    peso: data.weight,
                }
            return res.json(pokemonApiId)
        } catch (error) {
            return res.json(error.message)
        }
    }

})


module.exports = router;