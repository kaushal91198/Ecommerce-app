
const users = require("./data/sampleUserData");
const products = require("./data/sampleProductData");
const userModel = require("./models/User");
const productModel = require("./models/ProductModel");
const orderModel = require("./models/OrderModel");
const colors = require("colors");

const importData = async () => {
  try {
    const createUser = await userModel.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser }; //Copying the product object
    });
    const product = await productModel.insertMany(sampleData);
    console.log(colors.blue("Data inserted in database."));
  } catch (error) {
    console.log(colors.red(error));
  }
};

const destroyData = async () => {
  try {
    await userModel.deleteMany();
    await productModel.deleteMany();
    await orderModel.deleteMany();
    console.log(colors.blue('Data deleted successfully in database.'))
  } catch (error) {
    console.log(colors.red(error));
  }
};

module.exports = {importData,destroyData};
