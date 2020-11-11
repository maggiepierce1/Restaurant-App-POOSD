import connectToDatabase from "../../utils/connectToDatabase"
import Order from "../../schemas/Order";
import Cart from "../../schemas/Cart";

connectToDatabase();

export default async (req, res) => 
{
    const name = req.body.username;
    const cartItems = req.body.items;
    const total = req.body.total;
    const totalWithTax = req.body.totalWithTax;
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var AMorPM = "AM";

    if (hour > 12)
    {
        hour = hour - 12;
        AMorPM = "PM";
    }
    
    if (minute < 10)
        minute = "0" + minute;

    const todaysDate = day + "-" + month + "-" + year;
    const currentTime = hour + ":" + minute + " " + AMorPM;


    var newOrder = new Order({username : name, status : "received", items : cartItems, date : todaysDate, time: currentTime});
    newOrder.save();

    // Let's wipe the cart clean
    const newItems = [];
    Cart.updateOne({username : name}, { $set: { items : newItems }},  function (error, success) 
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