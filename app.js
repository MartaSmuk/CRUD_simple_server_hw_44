const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const mockDB = [];

// Create (INSERT)
app.post('/items', (req, res) => {
    const { name } = req.body;
    mockDB.push(name)
    res.json({ item: mockDB.find })
})

// Read (SELECT)
app.get('/items', (req, res) => {
    res.json({ items: mockDB})
})

// Update (UPDATE)
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const name = mockDB.findIndex(i => i.id === parseInt(id));
    res.json({ name })
})

//Delete (DELETE)
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const nameIndex = mockDB.findIndex(i => i.id === parseInt(id));
    const nameToDelete = mockDB.splice(nameIndex, 1);
    res.json({ item: nameToDelete});
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;