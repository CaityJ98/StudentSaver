const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const listingSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: ['Title is required'],
        trim: true,
        minlength: [3, 'Title should be at least 3 characters long'],
        maxLenght: [50, "Title can't be more than 50 cahracters long"]
    },
    category: {
        type: String,
        required: ['Category is required'],
        validate: {
            validator: function (v) {
                return (v != 'Choose...');
            },
            message: 'Please choose a category'
        }
    },
    condition: {
        type: String,
        required: ['Condition is required'],
        validate: {
            validator: function (v) {
                return (v != 'Choose...');
            },
            message: 'Please choose a condition'
        }
    },
    description: {
        type: String,
        trim: true,
        required: ['Description is required'],
        minlength: [10, 'Description should be at least 10 characters long'],
        maxlength: [1000, 'Description should be max 500 characters long']
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
   
    image: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        required: true,
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    active: {
        type: Boolean,
        default: true
    }
});

listingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Listing', listingSchema);