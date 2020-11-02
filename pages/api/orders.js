import connectToDatabase from "../../utils/connectToDatabase"
import Order from "../../schemas/Order"

connectToDatabase();

export default async (req, res) => 
{
    const orders = await Order.find();
    res.statusCode = 200;
    res.json(orders);
}