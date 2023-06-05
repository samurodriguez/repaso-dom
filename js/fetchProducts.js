const loadingIcon = document.querySelector(".loadingIcon");

const fetchProducts = async () => {
  try {
    loadingIcon.style.display = "block";

    const res = await fetch(
      "https://api.jsonbin.io/v3/b/647d9573b89b1e2299aa1e62",
      {
        headers: {
          "X-Master-KEY":
            "$2b$10$a4ulhwWhTTVRAoGmNFScx.CoJrXzKlxLnp7ehdDSys.S8UeWSw1.a",
        },
      }
    );

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.message);
    }

    return body.record;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    loadingIcon.style.display = "none";
  }
};

export default fetchProducts;
