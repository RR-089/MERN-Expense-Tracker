import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const categories = [
    { label: "Travel", icon : "user" },
    { label: "Shopping", icon: "user" },
    { label: "Investment", icon: "user" },
    { label: "Bills", icon: "user" },
]

export const register = async (req, res) => {
    //get all data
    const { firstName, lastName, email, password } = req.body;

    //cek jika user sudah ada dengan email yang ada
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(406).json({ message: "User already exist." });
        return;
    }

    //Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const user = await User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        categories
    });
    await user.save();
    res.status(201).json({ message: "User is created" });
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(406).json({ message: "Credentials not found" });
        return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
        res.status(406).json({ message: "Credentials not found" });
        return;
    }

    // create jwt token
    const payload = {
        username: email,
        _id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    // console.log(token);
    res.json({ message: "succesfully logged in.", token, user });
}