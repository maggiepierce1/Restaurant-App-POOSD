import connectToDatabase from "../../utils/connectToDatabase"
import Order from "../../schemas/Order"

connectToDatabase();

export default async (req, res) => 
{
    const name = req.query.name;
    var orders = await Order.find({username : name});
    orders = (!orders) ? "" : orders;
    res.statusCode = 200;
    res.json(orders);
}