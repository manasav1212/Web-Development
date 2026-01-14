const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const port = 8080;

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "To-Do_List",
    password: "",
    port: 5432
});

app.get("/todo", async (req, res) =>{
    try
    {
        const result = await db.query('SELECT * FROM "Task_List" ORDER BY id ASC');
        res.json(result.rows);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

app.post("/todo/add", async (req, res) =>{
    try
    {
        const {name} = req.body;
        const query = 'INSERT INTO "Task_List" (name) VALUES ($1) RETURNING *';
        const result = await db.query(query, [name]);
        res.json(result.rows[0]);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }

});

app.put("/todo/edit/:id", async (req, res) =>{
    try
    {
        const {name} = req.body;
        const {id} = req.params; 
        const result = await db.query('UPDATE "Task_List" SET name = $1 WHERE id= $2', [name, id]);
        res.json({message: "Edit successful"});
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

app.put("/todo/done/:id", async (req, res) =>{
    try
    {
        const {id} = req.params; 
        const {status} = req.body;
        const result = await db.query('UPDATE "Task_List" SET status = $1 WHERE id= $2', [status, id]);
        res.json({message: "Marked as Done"});
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

app.delete("/todo/:id", async (req, res) =>{
    try
    {
        const {id} = req.params;
        const result = await db.query('DELETE FROM "Task_List" WHERE id = $1', [id]);
        res.json({message: "Deleted Successfully"});
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

app.listen(port, ()=>{
    console.log(`Backend running on port ${port}`);
})