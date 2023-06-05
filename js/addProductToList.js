const ul = document.querySelector(".productList");

const addProductToList = (product) => {
  const { name, price, img: imgUrl } = product;

  const li = document.createElement("li");
  const article = document.createElement("article");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const img = document.createElement("img");

  h2.textContent = name;
  p.textContent = `${price}€`;
  img.src = imgUrl;
  img.alt = name;

  article.append(img, h2, p);
  li.append(article);
  ul.append(li);
};

export default addProductToList;
