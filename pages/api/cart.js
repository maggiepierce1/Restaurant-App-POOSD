import connectToDatabase from "../../utils/connectToDatabase"
import Cart from "../../schemas/Cart"

connectToDatabase();

export default async (req, res) => 
{
    const name = req.query.name;
    const cart = await Cart.findOne({username : name});
    const cartItems = cart.items;
    res.statusCode = 200;
    res.json(cartItems);
}