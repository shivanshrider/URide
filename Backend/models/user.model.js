const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First Name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last Name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from query results by default
    },
    socketId: {
        type: String,
        default: null,
    },
});

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip if the password is not modified
    }

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10); // Hash the password
        this.password = hashedPassword; // Replace plain password with hashed password
        next(); // Proceed to save the document
    } catch (err) {
        next(err); // Pass the error to the next middleware
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;