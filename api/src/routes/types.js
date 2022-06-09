const { Router } = require('express');
const fetch = require("node-fetch");
const { Type } = require("../db.js");

const router = Router();

router.get('/', async (req, res) => {
    const api = await fetch('https://pokeapi.co/api/v2/type');
    const types = await api.json();
    for( t of types.results ) {
        const existe = await Type.findOne({where: { name: t.name }})
        if(existe) return res.json(await Type.findAll())
        await Type.create({ name: t.name})
    }
    res.json(await Type.findAll());
})

module.exports = router;