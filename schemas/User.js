// import mongoose from 'mongoose'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const { String, Number } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    }
}, {collection: 'users'});


UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) 
        {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) 
{
    console.log("whaddup");
    return bcrypt.compareSync(candidatePassword, this.password);
};

// UserSchema.plugin(require('mongoose-bcrypt'));

export default mongoose.models.User || mongoose.model('User', UserSchema);