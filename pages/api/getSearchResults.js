import connectToDatabase from "../../utils/connectToDatabase"
import MenuItem from "../../schemas/MenuItem"

connectToDatabase();

export default async (req, res) => 
{
    const query = req.query.search;

    const results = await MenuItem.find({ $text: { $search: query } });

    res.statusCode = 200;
    
    res.json(results);

}