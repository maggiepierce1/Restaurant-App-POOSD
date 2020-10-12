import mongoose from 'mongoose'

const { String, Number } = mongoose.Schema.Types;

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: false
    }
}, {collection: 'menuitems'});


export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);