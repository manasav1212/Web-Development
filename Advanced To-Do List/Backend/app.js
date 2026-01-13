const express = require("express");
const cors = require("cors");
const {db} = require("pg");

const app = express();

app.use(cors);
app.use(express.json);

const port = 8080;

const db = new db({
    user: "postgres",
    host: "localhost",
    database: "To-Do_List",
    password: "Password",
    port: 5432
});

app.get("/todo", async (req, res) =>{
    try
    {
        const result = await db.query("SELECT * FROM 'Task_List' ORDER BY id ASC");
        res.json(result.rows);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

app.post("/todo/id", async (req, res) =>{
    try
    {
        const {entry} = req.body;
        const result = await db.query("INSERT INTO 'Task_List' () VALUES ");
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }

});

app.put("/todo/id", async (req, res) =>{
    try
    {
        const result = await db.query("UPDATE 'Task_List' SET ");
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

app.delete("/todo/id", async (req, res) =>{
    try
    {
        const result = await db.query("DELETE FROM 'Task_List' WHERE");
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
});

app.listen(port, ()=>{
    console.log(`Backend running on port ${port}`);
})