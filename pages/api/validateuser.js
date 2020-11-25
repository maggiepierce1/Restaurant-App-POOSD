import connectToDatabase from "../../utils/connectToDatabase"
import User from "../../schemas/User";

connectToDatabase();

export default async (req, res) => 
{
    const name = req.body.username;
    const newPassword = req.body.password;
    var validUser = false;

    const newUser = await User.findOne({email : name});

    if (newUser)
    {
        validUser = newUser.comparePassword(newPassword);
    }
    res.statusCode = 200;
    res.send(validUser);

}
