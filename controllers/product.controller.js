import Product from "../models/product.model.js";

export const AddProduct = async (req, res) => {
  try {
    const data = req.body;

    const product = await Product.create(data);

    res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};



export const findAllProduct = async (req, res) => {
  try {
    const { category } = req.query;

    console.log(category);

    let products;

    if (category) {
      products = await Product.find({ category: category });
    } else {
      products = await Product.find({});
    }

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({products : products});

  } catch (err) {
    console.log(err);
  }
};



export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const data = req.body;

    const updatepro = await Product.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({ product: updatepro });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const findid = await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product is deleted", findid });
  } catch (error) {
    console.log(error);
  }
};

export const productFilter = async (req, res) => {
  try {
    const { category } = req.params;

    // console.log(pera);

    const categoryData = await Product.find({ category });

    console.log(categoryData);

    if (categoryData.length === 0) {
      return res.status(404).json({ message: "Category do not found " });
    }

    return res.status(200).json(categoryData);
  } catch (error) {
    console.log(error);
  }
};
