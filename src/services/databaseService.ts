import sqlite3 from 'sqlite3';

declare module 'sqlite3' {
    interface Statement {
        lastID: number;
        changes: number;
    }
}

class DatabaseService {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database('mydatabase.db');
        this.initializeDatabase();
    }

    private initializeDatabase(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
                (err: Error | null) => {
                    if (err) {
                        reject(err); // If there's an error, reject the promise
                    } else {
                        resolve(); // Resolve the promise on success
                    }
                }
            );
        });
    }

    public createItem(name: string): Promise<{ id: number; name: string }> {
        return new Promise((resolve, reject) => {
            this.db.run(
                'INSERT INTO items (name) VALUES (?)',
                [name],
                function (this: sqlite3.Statement, err: Error | null) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ id: this.lastID, name });
                }
            );
        });
    }
    

    public getItems(): Promise<{ items: Array<{ id: number; name: string }> }> {
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT * FROM items WHERE name = ?',
                [name],
                (err: Error | null, rows: Array<{ id: number; name: string }>) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ items: rows });
                }
            );
        });
    }

    public updateItem(id: number, name: string): Promise<{ id: number; name: string }> {
        return new Promise((resolve, reject) => {
            this.db.run(
                'UPDATE items SET name = ? WHERE id = ?', // Corrected the table name from 'itams' to 'items'
                [name, id],
                function (this: sqlite3.Statement, err: Error | null) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ id: this.changes, name });
                }
            );
        });
    }

    public deleteItem(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(
                'DELETE FROM items WHERE id = ?',
                [id],
                function (this: sqlite3.Statement, err: Error | null) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(); // Resolve the promise without any value on success
                }
            );
        });
    }

}

export default new DatabaseService();