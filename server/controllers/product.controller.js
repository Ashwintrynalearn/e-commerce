import Product from '../models/product.model.js';

export const getProducts = async(req,res,next)=>{
    try{
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        })
    } catch (error) {
        next(error);
    }
}

export const getProductById = async(req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: product,
        });
    }catch(error){
        next(error);
    }
}

export const createProduct = async(req,res,next)=>{
    try{
        const product = await Product.create({
            ...req.body,
            createdBy:req.user._id,
        });
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product,
        });
    }catch(error){
        next(error);
    }
}
export const updateProduct = async(req,res,next)=>{
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
             req.body,
             { new: true, runValidators: true }
        );
        if(!product){
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product,
        });
    }catch(error){
        next(error);
    }
}

export const deleteProduct = async(req,res,next)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: product,
        });
    }catch(error){
        next(error);
    }
}