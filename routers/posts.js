const express = require('express');
const router = express.Router(); //Creazione router
const posts = require('../data/post'); //Importo array di post da path specificato

//Crud:
//Index (Tutti i post)
router.get('/', (req, res) => {
    res.json(posts);
});

//Show (Mostra solo un post)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < posts.length) {
        res.json(posts[id]);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
});

//Create (Creazione nuovo post)
router.post('/', (req, res) => {
    res.send("Creazione di un nuovo post");
});

//Update (Aggiornamento intero post)
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < posts.length) {
        res.send(`Modifica totale del post con ID:${id}`);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
});

//Modify (Aggiornamento parziale del post)
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < posts.length) {
        res.send(`Modifica parziale del post con ID:${id}`);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
});

//Destroy (Eliminazione post)
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < posts.length) {
        res.send(`Cancellazione del post con ID:${id}`);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
});

module.exports = router;