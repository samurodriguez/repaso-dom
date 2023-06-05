import addProductToList from "./addProductToList.js";

const generateProductList = (products) => {
  for (const product of products) {
    addProductToList(product);
  }
};

export default generateProductList;
