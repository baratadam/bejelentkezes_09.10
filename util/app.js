import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import {
  getUsers,
  getUsersById,
  saveUser,
  getUserByEmail,
} from "./db.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = getUsersById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required!" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const saved = saveUser(email, hashedPassword);
    const user = getUsersById(saved.lastInsertRowid);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Email already exists!" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }
  const user = getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }
  res.json(user);
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});