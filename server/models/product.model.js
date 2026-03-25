import mongoose from "mongoose";
 
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    embedding:{
        type: [Number],
    },
}, 
{  timestamps: true, }
);

const Product = mongoose.model('Product', productSchema);

export default Product;