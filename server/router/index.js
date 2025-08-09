const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


// Get all -> vacio
app.get('/', (req, res) => {
    res.status(200).json({"message": 'Hello all!'})
})


// Get only -> requiere un solo id
app.get('/:id', (req, res) => {
    const id = req.params.id
    res.status(200).json({"message": `only id: ${id}`})
})


// Post -> data
app.post('/', (req, res) => {
    const {nombre} = req.body;
    res.status(200).json({"message": 'Hello Create!', "nombre": nombre})
})


// Put -> requiere id y data
app.put('/:id', (req, res) => {
    const id = req.params.id
    const {nombre} = req.body;
    res.status(200).json({"message": 'Hello actualizar todo!', "nombre": nombre})
})


// Patch -> requiere id y data
app.patch('/:id', (req, res) => {
    const id = req.params.id
    const {nombre} = req.body;
    res.status(200).json({"message": 'Hello actualizar alguito en especifico!', "nombre": nombre})
})


// Delete -> requiere un id
app.delete('/:id', (req, res) => {
    const id = req.params.id
    res.status(200).json({"message": 'Hello borrar!'})
})


app.listen(port, () => {
    console.log(`Example app listen on port $(port)`)
})
