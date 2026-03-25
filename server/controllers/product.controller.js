import Product from '../models/product.model.js';
import { generateEmbedding } from '../utils/embedding.js';

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
export const semanticSearch = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    // 1. Convert query → embedding
    const queryEmbedding = await generateEmbedding(query);

    // 2. MongoDB vector search
    const products = await Product.aggregate([
      {
        $vectorSearch: {
          index: "vector_index", // must match your Atlas index name
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 10,
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          category: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      results: products,
    });

  } catch (error) {
    next(error);
  }
};

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
        const {title,description} = req.body;
        const embedding = await generateEmbedding(`${title} ${description}`);

        const product = await Product.create({
            ...req.body,
            embedding,
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