import connectToDatabase from "../../utils/connectToDatabase"
import Cart from "../../schemas/Cart";
import MenuItem from "../../schemas/MenuItem"

connectToDatabase();

export default async (req, res) => 
{
    const itemName = req.body.itemName;
    const userName = req.body.userName;

    const item = await MenuItem.findOne({name : itemName});
    const actualPrice = item.price;
    
    var userCart = await Cart.find({username : userName}, function(err, docs)
    {
        if (!docs.length)
        {
            var newCart = new Cart({username : userName, items: [{name : itemName, price : actualPrice}], numItems : 1});
            newCart.save();
        }
        else
        {
            var newItem = {name : itemName, price : actualPrice};
            Cart.updateOne({username : userName}, { $push: { items : newItem }},  function (error, success) 
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
        }
    });
    res.statusCode = 200;
    res.json({name : 'maggie'});
}

// how to add this item to a cart?