import { Product } from "../../../DB/models/product.model.js";

const filterProducts = async (req, res) => {
    try {
        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || 100000;
        const category = req.query.category;

        const filter = {
            price: {
                $gte: minPrice,
                $lte: maxPrice,
            },
        };

        if (category) {
            filter.category = category; 
        }

        const products = await Product.find(filter, { name: 1, description: 1, images: 1, price: 1 });

        if(products.length === 0) return res.status(200).json({success: true, message: "No product has been found"})

        return res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            products: products,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching products',
            error: err.message,
        });
    }
};

export default filterProducts; 
