import mongoose from 'mongoose'

const { String } = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    items: [{
        name: String,
        price: String
    }],
    numItems: {
        type: Number,
        required: true
    }
}, {collection: 'carts'});


export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);