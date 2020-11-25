import connectToDatabase from "../../utils/connectToDatabase"
import Order from "../../schemas/Order";

connectToDatabase();

export default async (req, res) => 
{
    const id = req.body.id;
    const newStatus = req.body.newStatus;
    Order.updateOne({_id : id}, { $set: { status : newStatus }},  function (error, success) 
    {
        if (error) 
        {
            // console.log(error);
        } 
        else 
        {
            // console.log(success);
        }
    });

    res.statusCode = 200;
    res.json({name : 'maggie'});
}