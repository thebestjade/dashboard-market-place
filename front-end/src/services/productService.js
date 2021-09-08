const listProducts = (token, setProducts, setReqError) => {
  setReqError("");
  const data = fetch("http://localhost:3003/produtos", {
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (typeof data === "string") {
        setProducts([]);
        return setReqError(data);
      }
      setProducts(data);
    })
    .catch((e) => {
      setReqError(e);
    });

  return data;
};
export default listProducts;
