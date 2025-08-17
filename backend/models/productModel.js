import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    priceMax: { type: Number, required: true },
    color: { type: String, required: true },
    categoery: { type: String, required: true },
})

const Product = mongoose.model("Product", productSchema);

export default Product;