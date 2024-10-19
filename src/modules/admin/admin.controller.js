import { Product } from "../../../DB/models/product.model.js";

export const createProduct = async (req, res, next) => {
    const createdBy = req.user._id;
    const { name, description, images, defaultImage, availableItems, price, category, discount, cloudFolder} = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            images,
            defaultImage,
            availableItems,
            price,
            category,
            discount,
            cloudFolder,
            createdBy: createdBy
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message
        });
    }
};


export const updateProduct = async (req, res, next) => {
    const prodId = req.params.prodId;

    const { name, description, images, availableItems, price, category, discount } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            prodId,
            {
                name,
                description,
                images,
                availableItems,
                price,
                category,
                discount
            },
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            product: updatedProduct,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the product.',
            error: err.message,
        });
    }
};


export const getAllProducts = async (req, res, next) => {
    const adminId = req.user._id;

    try {
        const products = await Product.find({ createdBy: adminId });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this admin.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Products retrieved successfully.',
            products: products,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving products.',
            error: err.message,
        });
    }
};


export const deleteProduct = async (req, res, next) => {
    const adminId = req.user._id; 
    const prodId = req.params.prodId;

    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: prodId, createdBy: adminId });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found or you do not have permission to delete it.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully.',
            product: deletedProduct,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the product.',
            error: err.message,
        });
    }
};
