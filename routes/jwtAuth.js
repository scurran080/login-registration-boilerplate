const express = require("express");
const router = express.Router();
const pool = require('../db');
const bcrypt =require("bcrypt");

const validator = require('../middleware/validator');
const jwtGenerator = require('../utils/jwtGenerator');

router.post("/register", validator, async(req, res) => {
    try{
        const {first_name, last_name, email, password} = req.body;
        const user = await pool.query("SELECT * FROM users where email = $1",[email]);
        if(user.rows.length !== 0){
            return res.status(401).send("User already exists");
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (first_name, last_name, email, password) VALUES($1,$2,$3,$4) RETURNING *",[first_name,last_name,email,bcryptPassword]);
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token});
        
        //res.json(newUser);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/login",validator, async(req,res) => {
    try{
        const { email, password } = req.body;
        const requestedUser = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        if(requestedUser.rows.length === 0){
            res.status(401).json("Email or Password is Incorrect");
        }
        const validPassword = await bcrypt.compare(password,requestedUser.rows[0].password);
        if(!validPassword){
            return res.status(401).json("Email or Password is Incorrect")
        }
        const token = jwtGenerator(requestedUser.rows[0].user_id);
        res.json({ token });
    }catch(err){
        console.error(err.message);
    }
});

module.exports = router;