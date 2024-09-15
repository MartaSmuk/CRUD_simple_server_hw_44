const express = require('express');
const bodyParser = require('body-parser');
const mongoService = require('./services/databaseService');
const itemRoutes = require('./routes/itemRoutes'); // Import item routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB when the server starts
mongoService.connectToMongoDB().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
});

// Use the item routes for `/items` endpoint
app.use('/items', itemRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
