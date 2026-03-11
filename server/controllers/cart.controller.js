import Cart from "../models/cart.model.js";

export const getCart = async (req, res, next) => {
    try{
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.status(200).json({
            success: true,
            data: cart,
        });
    }catch (error) {    
            next(error);
    }
}

export const addItem = async (req, res, next) => {
    try{
        const {productId, quantity} = req.body;
        let cart = await Cart.findOne({ user: req.user._id });
        if(!cart){
            cart = await Cart.create({
                userId: req.user._id,
                items: [{ productId, quantity }],
            });
        }else{
     const exisitingItem = cart.items.find(item => item.productId.toString() === productId);
        }
        if(exisitingItem){
            exisitingItem.quantity += quantity;
        }else{
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        res.status(200).json({
            success: true,
            message: 'Item added to cart successfully',
            data: cart,
        });
            }catch (error) {
        next(error);
    }
}
    
export const updateItem = async(req,res,next)=>{
    try{
        const {productId} = req.params;
        const {quantity} = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        if(!cart){
            const error = new Error('Cart not found');
            error.statusCode = 404;
            return next(error); 
        }
        const item = cart.items.find(item => item.productId.toString() === productId);
        if(!item){
            const error = new Error('Item not found in cart');
            error.statusCode = 404;
            return next(error);
        }
        item.quantity = quantity;
        await cart.save();
        res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            data: cart,
        });
    }catch (error) {
        next(error);
    }
}
export const removeItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });

  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });

  } catch (error) {
    next(error);
  }
};