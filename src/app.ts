import express, { Request, Response } from 'express'; 
import databaseService from "./services/databaseService";  

const app = express();  
const PORT = process.env.PORT || 30000; 

app.use(express.json());    


// Create (INSERT)  return only one request which was added 
app.post('/items', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const result = await databaseService.createItem(name);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


// Read (SELECT)    return all requests
app.get('/items', async (req: Request, res: Response) => {
    try {
        const items = await databaseService.getItems();
        res.status(200).json(items);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


// Update (UPDATE)      return only one request which was added 
app.put('/items/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await databaseService.updateItem(Number(id), name);
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


//Delete (DELETE)   return only id (or all)
app.delete('/items/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await databaseService.deleteItem(Number(id));
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message })
    }
});


app.listen(PORT, () => {    //listen - start port
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;