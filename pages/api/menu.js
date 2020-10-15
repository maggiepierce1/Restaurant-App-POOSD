import connectToDatabase from "../../utils/connectToDatabase"
import MenuItem from "../../schemas/MenuItem"

connectToDatabase();

export default async (req, res) => 
{
    const menuItems = await MenuItem.find();
    res.statusCode = 200;
    res.json(menuItems);
  }

