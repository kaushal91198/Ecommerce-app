const productModel = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");// it used as alternate functionality of try catch block


const productController =()=>{
    return{
        allProducts:asyncHandler(async (req, res) => {
            const products = await productModel.find({});
            res.json(products);
          }),
        singleProduct:asyncHandler(async (req, res) => {
            const singleProduct = await productModel.findById(req.params.id);
            
            if(singleProduct){
                res.json(singleProduct);
            }
            else{
                res.status(404).json({message:"Product not found"})
            }
          }) 
    }
}


module.exports= productController