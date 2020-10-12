import connectToDatabase from "../../utils/connectToDatabase"
import MenuItem from "../../schemas/MenuItem"

connectToDatabase();

export default async (req, res) => {
    var item1 = new MenuItem({name: "orange", price: 5.55, category: "appetizer"});
    item1.save();
    res.statusCode = 200
    res.json({ name: 'John Doe' })
  }