import connectToDatabase from "../../utils/connectToDatabase"
import Order from "../../schemas/Order";

connectToDatabase();

export default async (req, res) => 
{
    const name = req.body.username;
    const cartItems = req.body.items;
    const total = req.body.total;
    const totalWithTax = req.body.totalWithTax;

    var newOrder = new Order({username : name, status : "received", items : cartItems});
    newOrder.save();

    res.statusCode = 200;
    res.json({name : 'maggie'});
}