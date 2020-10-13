import connectToDatabase from "../../utils/connectToDatabase"
import MenuItem from "../../schemas/MenuItem"

connectToDatabase();

export default async (req, res) => 
{
    var item1 = new MenuItem({name: "orange", price: 5.55, category: "appetizer"});
    const menuItems = await MenuItem.find();
    //item1.save();
    res.statusCode = 200;
    res.json(menuItems);
  }