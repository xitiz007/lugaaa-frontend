import User from '../models/user';
import jwt from 'jsonwebtoken';

const auth = async (req, res) => {
    const token = req.headers.authorization;
    if(!token) res.status(401).json({ message: "Unauthorized" });
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) res.status(401).json({ message: "Unauthorized" });
    const user = await User.findOne({ _id: decodedToken.id });
    if(!user) res.status(401).json({ message: "Unauthorized" });
    return user;
}

export default auth;