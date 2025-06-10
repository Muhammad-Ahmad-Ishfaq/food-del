import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Food name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    picture: {
        secure_url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        }
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    }
}, {
    timestamps: true
});

const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);

export default Food;
