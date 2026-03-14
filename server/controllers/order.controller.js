import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

export const createOrder = async (req, res, next) => {
  try {
    const cart = await Cart
      .findOne({ userId: req.user._id })
      .populate('items.productId');

    if (!cart || cart.items.length === 0) {
      const error = new Error('Cart is empty');
      error.statusCode = 400;
      throw error;
    }

    const items = cart.items.map(item => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId: req.user._id,
      items,
      totalAmount,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });

  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async ( req,res,next)=>{
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId}); 
        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            data: orders,
        });
    }catch (error) {
        next(error);
    }
}

export const getAllOrders = async(req,res,next)=>{
    try{
        const orders = await Order.find().populate('items.productId').populate('userId','name email');
        res.status(200).json({
            success: true,
            message: 'All Orders retrieved successfully',
            data: orders,
        });
    }catch(error){
        next(error);
    }
}

export const getOrderById = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const order = await Order.findById(id).populate('items.productId').populate('userId','name email');
        if(!order){
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'Order retrieved successfully',
            data: order,
        });
    }catch(error){
        next(error);
    }
};
export const updateOrderStatus = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const order = await Order.findById(id);
        if(!order){
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
        order.status = status;
        await order.save();
        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: order,
        });
    }catch(error){
        next(error);
    }
}