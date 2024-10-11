import { model, Schema, Types } from "mongoose"

const productSchema = new Schema({
    name: { type: String, unique: true, required: true, min: 2, max: 20 },
    description: { type: String, min: 5, max: 100 },
    images: [{
        id: { type: String, required: true },
        url: { type: String, required: true }

    }],
    defaultImage: {
        id: { type: String, required: true },
        url: { type: String, required: true }
    },
    availableItems: { type: Number, min: 1, required: true },
    soldItems: { type: Number, default: 0 },
    price: { type: Number, min: 1, required: true },
    discount: { type: Number, min: 1, max: 100 },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    subcategory: { type: Types.ObjectId, ref: "Subcategory", required: true },
    brand: { type: Types.ObjectId, ref: "Brand", required: true },
    cloudFolder: { type: String, unique: true, required: true }

}, { timestampse: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

//virtuals
productSchema.virtual("finalPrice").get(function(){
    return Number.parseFloat(
        this.price - ( this.price * this.discount || 0 ) / 100
    ).toFixed(2)
})


export const Product = model("Product", productSchema)  

