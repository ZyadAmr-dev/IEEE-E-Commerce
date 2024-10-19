import { Review } from "../../../DB/models/review.model.js"; 

export const getReview = async (req, res, next) => {
    const userId = req.user._id; 
    const prodId = req.params.prodId;

    try {
        const review = await Review.findOne({ product: prodId, user: userId });
        
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        return res.status(200).json({ success: true, review });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching review", error: error.message });
    }
};

export const getReviews = async (req, res, next) => {
    const prodId = req.params.prodId;

    try {
        const reviews = await Review.find({ product: prodId }).populate('user', 'name email');

        if (reviews.length === 0) {
            return res.status(404).json({ success: true, message: "No reviews found for this product" });
        }

        return res.status(200).json({ success: true, reviews });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching reviews", error: error.message });
    }
};
