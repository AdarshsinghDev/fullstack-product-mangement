import Product from "../models/productModel.js";

export const uploadController = async (req, res) => {
    const { id, name, priceMax, color, categoery } = req.body;

    try {
        //check existing product
        const isExisting = await Product.findOne({ id });

        if (isExisting) {
            return res.status(400).json({ message: "Product ID is alread existed", success: false });
        }

        const newProduct = await Product.create({ id, name, priceMax, color, categoery });

        return res.status(201).json({ message: "Product Added", success: true, newProduct });
    } catch (error) {
        console.log("Controller Error", error);
    }
}


//fetch all data from db

export const getController = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products || products.length == 0) {
            return res.status(400).json({ message: "No product found, Please add product", success: false });
        }
        return res.status(200).json({ products, success: true });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


//Update all documents

export const updateController = async (req, res) => {
    const { id } = req.params
    const { name, priceMax, color } = req.body;
    try {
        if (!name || !priceMax || !color) {
            return res.status(400).json({ message: "Please Enter the new Value.", success: false });
        }
        const updatedValue = await Product.findOneAndUpdate({ id: parseInt(id) }, { $set: { name, priceMax, color } }, { new: true })

        if (!updatedValue) {
            return res.status(404).json({ message: "Product not found!", success: false });
        }

        return res.status(201).json({ message: "Update successfully!", success: true });

    } catch (error) {
        console.log(error)
    }
}

//Delete product from db

export const deleteController = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteValue = await Product.findOneAndDelete({ id: Number(id) });
        if (!deleteValue) {
            return res.status(400).json({ message: "Product not Found!", success: false });
        }

        return res.status(200).json({ message: "Produce deleted Successfully!", success: true });

    } catch (error) {
        console.log(error);
    }
}