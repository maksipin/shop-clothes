const Product = require("../models/Product");
const TypeProduct = require("../models/TypeProduct");
const productMock = require("../mock/products.json");
const productTypeMock = require("../mock/productType.json");

module.exports = async () => {
  const typeProduct = await TypeProduct.find();
  if (typeProduct.length !== productTypeMock.length) {
    await createInitialEntity(TypeProduct, productTypeMock);
  }

  const product = await Product.find();
  if (product.length !== productMock.length) {
    await createInitialEntity(Product, productMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item.id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        console.log("e", e);
        return e;
      }
    })
  );
}
