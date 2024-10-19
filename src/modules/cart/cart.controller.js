import { Cart } from "../../../DB/models/cart.model.js";

export const getAllItems = async(req, res, next) => {
    const userId = req.user._id

    try {
        const products = await Cart.find({ user: userId })

        if(products.length > 0) 
            return res.status(200).json({ success: true, products: products })

        return res.status(200).json({ success: true, message: 'No products has been found' })
    } catch(err) {
        return res.status(500).json({ success: false, message: 'Interal error' })
    }
}

export const addItem = async (req, res, next) => {
    const userId = req.user._id;
    const prodId = req.params.prodId;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                products: [{ productId: prodId, quantity: 1 }],
            });
            await cart.save();
            return res.status(201).json({ success: true, message: 'Item added to cart.', cart });
        }

        const existingProduct = cart.products.find(item => item.productId.toString() === prodId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ productId: prodId, quantity: 1 });
        }

        await cart.save();

        return res.status(200).json({ success: true, message: 'Item added to cart.', cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error adding item to cart.', error: error.message });
    }
};