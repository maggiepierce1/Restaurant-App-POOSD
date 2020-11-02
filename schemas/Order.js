import mongoose from 'mongoose'

const { String, Number } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    items: [{
        name: String,
        price: Number
    }],
    status: {
        type: String,
        required: true
    }
}, {collection: 'orders'});


export default mongoose.models.Order || mongoose.model('Order', OrderSchema);