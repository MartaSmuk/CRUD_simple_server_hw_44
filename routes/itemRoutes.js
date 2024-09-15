import express from 'express';


const express = require('express');
const router = express.Router();
const mongoService = require('../services/databaseService');

// Create (POST) - Insert a new item
router.post('/items', async (req, res) => {
    const { name } = req.body;
    try {
        const newItem = await mongoService.createItem(name);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read (GET) - Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await mongoService.getItems();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read (GET) - Get an item by ID
router.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await mongoService.getItemById(id);
        if (!item) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json(item);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update (PUT) - Update an item by ID
router.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedItem = await mongoService.updateItem(id, name);
        if (updatedItem.matchedCount === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json({ message: 'Item updated successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete (DELETE) - Delete an item by ID
router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await mongoService.deleteItem(id);
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json({ message: 'Item deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
