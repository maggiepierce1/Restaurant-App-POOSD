import connectToDatabase from "../../utils/connectToDatabase"
import User from "../../schemas/User";

connectToDatabase();

export default async (req, res) => 
{
    const name = req.body.username;
    const newPassword = req.body.password;
    var validUser = true;

    var user = await User.find({username : name}, function(error, docs)
    {
        if (error) console.log(error);
        if (!docs.length)
        {
            // Oh no! there's not an account associated with this user. 
            validUser = false;
        }
        else
        {
            // We need to verify the password
            user.comparePassword(newPassword, function(err, isMatch) 
            {
                if (err) throw err;
                if (!isMatch) validUser = false;
            });
        }
    });
    if (validUser)
        res.statusCode = 200;
    else 
        res.statusCode = 201;
    res.send(validUser);
}
