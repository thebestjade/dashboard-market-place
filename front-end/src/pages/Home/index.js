import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import listProducts from '../../services/productService';
import { Button } from "@material-ui/core";
import ProductsContext from "../../contexts/products/ProductsContext";
import TokenContext from "../../contexts/token/TokenContext";
import ProductCard from "../../components/ProductCard";
import SideBar from "../../components/SideBar";
import { Alert } from "@material-ui/lab";
import useStyles from "./useStyles";
import UserContext from "../../contexts/user/UserContext";

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const { products, setProducts } = useContext(ProductsContext);
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [reqError, setReqError] = useState("");

  useEffect(() => {
    listProducts(token, setProducts, setReqError)
  }, [token, setProducts]);

  useEffect(() => {
    async function GetUser() {

      setReqError('')

      const response = await fetch("http://localhost:3003/perfil", {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();

      if (response.ok) {
        return setUser(data);
      }
      setReqError(data);
    }
    GetUser();
  }, [token, setUser]);

  const closeAlert = () => {
    setReqError("");
  };

  return (
    <>
      <div className={classes.container}>
        <SideBar />
        <div className={classes.mainScreen}>
          <h1>{user?.nome_loja}</h1>
          {!!products.length &&
            <>
              <h2>Seus produtos</h2>
              <div className={classes.cardsContainer}>
                {products?.map(({ id, nome, imagem, descricao, estoque, preco }) => (
                  <ProductCard
                    key={id}
                    id={id}
                    name={nome}
                    image={imagem}
                    description={descricao}
                    inventory={estoque}
                    price={`${preco / 100},00`}
                  />
                ))}
              </div>
            </>}
          {reqError && (
            <Alert severity="error" onClose={closeAlert}>
              {reqError}
            </Alert>
          )}
          <Button
            className={classes.button}
            onClick={() => history.push("/produtos/novo")}
            type="button"
            variant="contained"
            color="primary"
          >
            Adicionar produto
          </Button>
        </div>
      </div>
    </>
  );
}
