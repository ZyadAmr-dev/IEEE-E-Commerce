import { Product } from '../../../DB/models/product.model.js';

export const searchProducts = async (req, res) => {
    try {
        let { query } = req.body;
        query = query.trim()

        const results = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        });
        const allProducts = await Product.find({});
        console.log("All products in the collection:", allProducts);
        res.status(200).json({ success: true, results });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};
