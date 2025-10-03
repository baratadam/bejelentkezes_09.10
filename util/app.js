import express from "express";
import cors from "cors";
import bycrypt from "bcrypt";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/users', (req,res)=>{
    const users = getUsers();
    res.json(users);
});
app.get('/users/:id', (req,res)=>{
    const id = req.params.id;
    const user = getUsersById(id);
    if(user){
        res.json(user);
    }
    else{
        res.status(404).json({message: "User not found!"});
    }
});

app.post('/users',  (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required!"});
    }
    const salt =  bycrypt.genSalt();
    const hashedPassword =  bycrypt.hash(password, salt);
    const saved = saveUser(email, hashedPassword);
    const user = getUsersById(saved.lastInsertRowid);
    res.status(201);
    res.json(user);
});

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Invalid credentials!"});
    }
    const user = getUserByEmail(email);
    if(!user){
        return res.status(400).json({message: "Invalid credentials!"});
    }
    if(!bycrypt.compareSync(password, user.password)){
        return res.status(400).json({message: "Invalid credentials!"});
    }
    res.json(user);
});

app.use((err, req, res, next)=>{
    if(err){
        res.status(500).json({message: err.message});
    }
});

app.listen(PORT, () =>{
    console.log(`server runs on port ${PORT}`);
});