import mongoose from 'mongoose'

const { String, Number } = mongoose.Schema.Types;

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {collection: 'menuitems'});


export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);