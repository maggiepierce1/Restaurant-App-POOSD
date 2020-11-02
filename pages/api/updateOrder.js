import connectToDatabase from "../../utils/connectToDatabase"
import MenuItem from "../../schemas/MenuItem"
import Order from "../../schemas/Order";

connectToDatabase();

export default async (req, res) => 
{
    const user = req.body.username;
    const newStatus = req.body.newStatus;
    
    Order.updateOne({username : user}, { $set: { status : newStatus }},  function (error, success) 
    {
        if (error) 
        {
            console.log(error);
        } 
        else 
        {
            console.log(success);
        }
    });

    res.statusCode = 200;
    res.json({name : 'maggie'});
}