import connectToDatabase from "../../utils/connectToDatabase"
import User from "../../schemas/User";

connectToDatabase();

export default async (req, res) => 
{
    const username = req.body.username;
    const newPassword = req.body.password;
    const newMode = req.body.mode;


    var newUser = new User({email : username, password : newPassword, mode : newMode});
    newUser.save();

    res.statusCode = 200;
    res.json({name : 'maggie'});
}