import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../models/user.js'

// Register User

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, picturePath, friends, location, occupation } = req.body;
        // console.log(req.body)
        const passwordHash = await bcrypt.hash(password, 11);
        const newUser = await users.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        res.status(201).json({
            success: true,
            message: "new user created"
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// login auth

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "user not registered" })
        }
        const matchpass = await bcrypt.compare(password, user.password);
        if (!matchpass) {
            return res.status(400).json({ error: "Invalid credentials" })
        }
        const token = jwt.sign({ id: user.id }, "adadadsecretket");
        // we dont want to send the password to the user
        delete user.password;
        res.json({
            success: true,
            status: 200,
            token, user
        })


    } catch (error) {
        res.status(500).json({ error: `error in login ${error}` })
    }


}