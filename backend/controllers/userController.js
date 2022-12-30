const db = require("../db")
const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")

const register = async (req,res) => {
    try {
        let data = req.body
        let {username, email, password} = data

        if(!username){
            return res.status(400).json("Please enter a username")
        }

        if(!email){
            return res.status(400).json("Please enter email")
        }

        const Emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let Email = Emailregx.test(email);
        if (!Email) {
            return res.status(400).json("Please enter valid email.");
        }

        const check = "SELECT * FROM user WHERE email = ? OR username = ?";

        if(!password){
            return res.status(400).json("Please enter password")
        }

        const Passregx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,}$/;
        let Password = Passregx.test(password);
        if (!Password) {
            return res.status(400).json(
        "Password must have atleast 1 uppercase\n, 1 lowercase, 1 special charecter\n 1 number and must consist atleast 8 charectors."
            );
        }

        db.query(check, [email, username], (err, Data) => {
            if (err) {
              return res.status(500).json(err);
            }
            if (Data.length) {
              return res.status(400).json("User aldready exists");
            }
        
            //Hashing the password and creating new user
        
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
        
            const saveData = "INSERT INTO user(`username`,`email`,`password`) VALUES (?,?,?)";
            const values = [username, email, hash];
        
            db.query(saveData, values, (err, Data) => {
              if (err) {
                return res.json(err);
              }
              return res.status(201).json({ messsage: "User registration successful", values });
            });
          });
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const login = async (req,res) => {
    try {
        let data = req.body
        let { email, password} = data
        
        if(!email){
            return res.status(400).json("Please enter email")
        }

        if(!password){
            return res.status(400).json("Please enter password")
        }

        const check = "SELECT * FROM user WHERE email = ?";

        db.query(check, [email], (err, Data) => {
            if (err) {
              return res.status(500).json(err.message);
            }
            if (Data.length == 0) {
              return res.status(404).json("User not found");
            }
            //if user exists
            //check password
            const isPassword = bcrypt.compareSync(req.body.password, Data[0].password);
        
            if (!isPassword) {
              return res.status(401).json("Invalid user credentials");
            }
        
            const token = jwt.sign(
              {
                id: Data[0].id,
              },
              process.env.JWT_SECRET
            );
            const { password, ...other } = Data[0];
        
            res.cookie("access_token", token, {
                httpOnly: true,
              }).status(200).json(other);
            });
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const logout = async (req,res) => {
    try {
        res.clearCookie("access_token",{
            sameSite : "none",
            secure : true,
        }).status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {register, login, logout}