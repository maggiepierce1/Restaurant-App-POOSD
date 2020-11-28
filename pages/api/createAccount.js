import connectToDatabase from "../../utils/connectToDatabase"
import User from "../../schemas/User";

connectToDatabase();

export default async (req, res) => 
{
    const username = req.body.username;
    const newPassword = req.body.password;
    const newMode = req.body.mode;
    var validUser = false;

    const user = await User.findOne({email : username});

    // Email must be unique 
    if (user)
    {
        validUser = false;
    }
    else
    {
        var newUser = new User({email : username, password : newPassword, mode : newMode});
        await newUser.save();
        validUser = true;
    }

    res.statusCode = 200;
    res.send(validUser);
}