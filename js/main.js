"use strict";

import addProductToList from "./addProductToList.js";
import fetchProducts from "./fetchProducts.js";
import generateProductList from "./generateProductList.js";

const form = document.querySelector("form");
const errorMessage = document.querySelector(".errorMessage");
const successMessage = document.querySelector(".successMessage");
const loadingIcon = document.querySelector(".loadingIcon");

form.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();

    const newProduct = Object.fromEntries(new FormData(form));

    if (!newProduct.name || newProduct.name.length < 4) {
      throw new Error(
        "El nombre de producto es obligatorio y debe tener al menos 4 caracteres"
      );
    }

    if (!newProduct.price || isNaN(newProduct.price)) {
      throw new Error("El precio es obligatorio y debe ser un número");
    }

    const urlPattern =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    if (!urlPattern.test(newProduct.img)) {
      throw new Error("La imagen es obligatoria y debe ser una url");
    }

    errorMessage.textContent = "";

    const products = await fetchProducts();

    loadingIcon.style.display = "block";

    const res = await fetch(
      "https://api.jsonbin.io/v3/b/647d9573b89b1e2299aa1e62",
      {
        method: "PUT",
        headers: {
          "X-Master-KEY":
            "$2b$10$a4ulhwWhTTVRAoGmNFScx.CoJrXzKlxLnp7ehdDSys.S8UeWSw1.a",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...products, newProduct]),
      }
    );

    if (!res.ok) {
      const body = await res.json();

      throw new Error(body.message);
    }

    form.reset();
    successMessage.textContent = "Producto creado correctamente";

    setTimeout(() => {
      successMessage.textContent = "";
    }, 2000);

    addProductToList(newProduct);
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    loadingIcon.style.display = "none";
  }
});

fetchProducts()
  .then((products) => {
    generateProductList(products);
  })
  .catch((error) => {
    console.error(error);
    errorMessage.textContent =
      "Hubo un error al cargar los productos. Por favor, vuelve a intentarlo más tarde o contacta con soporte";
  });
