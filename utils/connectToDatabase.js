import mongoose from 'mongoose'

async function connectToDatabase()
{
    const database = await mongoose.connect('mongodb+srv://MaggiePierce:Beyondthesea18!@restaurantapp.t6wsr.mongodb.net/<dbname>?retryWrites=true&w=majority',
        {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});
}

export default connectToDatabase;