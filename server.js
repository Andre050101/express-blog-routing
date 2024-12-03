const express = require('express'); //Richiamo express
const path = require('path');//Richiamo path per versatilità percorsi su diversi sistemi operativi
const posts = require('./data/post');
const postsRouter = require('./routers/posts');//Importa router con operazioni per post

const app = express(); //Variabile che contene express
const port = 3000; //porta sulla quale si posiziona il server

//Serviamo asset statici di cartella public
app.use(express.static(path.join(__dirname, 'public')));

//Rotta principale
app.get('/', (req, res) => {
    res.send('Server del mio blog');
});

//Rotta bacheca
app.get('/bacheca', (req, res, next) => {
    let { titolo, tag } = req.query; // Estrai i parametri dalla query string

    let risultati = posts; // Usa l'array dei post esistenti

    // Filtro per titolo (se fornito)
    if (titolo) {
        risultati = risultati.filter(post =>
            post.titolo.toLowerCase().includes(titolo.toLowerCase())
        );
    }

    // Filtro per tag (se fornito)
    if (tag) {
        risultati = risultati.filter(post =>
            post.tags && post.tags.includes(tag.toLowerCase())
        );
    }

    if (risultati.length === 0) {
        return res.status(404).json({
            message: 'Nessun post trovato con i parametri specificati'
        });
    }
    res.json({
        posts: risultati,
        conteggio: risultati.length
    });
});

//Registrazione router per post
app.use('/posts', postsRouter);

//Gestione rotte inesistenti
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Risorsa non trovata'
    });
});


//Avvia server
app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});