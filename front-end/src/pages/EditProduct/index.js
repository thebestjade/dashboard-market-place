import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Backdrop,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import UserContext from "../../contexts/user/UserContext";
import TokenContext from "../../contexts/token/TokenContext";
import ProductsContext from "../../contexts/products/ProductsContext";
import SideBar from "../../components/SideBar";

import useStyles from "./useStyles";

export default function EditProduct() {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const {
    handleSubmit,
    register
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const [bookCover, setBookCover] = useState("");
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductsContext);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const { imagem } = products.find((produto) => produto.id === Number(id));
    setBookCover(imagem);
  }, [id, products]);

  const sendProduct = async (sendData) => {
    try {
      setLoading(true);
      setReqError("");

      const response = await fetch(`http://localhost:3003/produtos/${id}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify(sendData),
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        return history.push("/produtos");
      }

      setReqError(data);
    } catch (error) {
      setReqError(error.message);
    }
  };
  const closeAlert = () => {
    setReqError("");
  };

  return (
    <div className={classes.container}>
      <SideBar />
      <div className={classes.mainScreen}>
        <div className={classes.form}>
          <h1>{user.nome_loja}</h1>
          <h2>Atualizar produto</h2>
          <form onSubmit={handleSubmit(sendProduct)}>
            <div className={classes.column}>
              <FormControl>
                <InputLabel htmlFor="nome">
                  Nome do produto
                </InputLabel>
                <Input
                  id="nome"
                  {...register("nome")}
                />
              </FormControl>
              <div>
                <FormControl>
                  <InputLabel htmlFor="preco">
                    Preço
                  </InputLabel>
                  <Input
                    id="preco"
                    {...register("preco")}
                    startAdornment= {<InputAdornment position="start">R$</InputAdornment>}
                  />
                </FormControl>
                <FormControl className={classes.inventoryInput}>
                  <InputLabel htmlFor="estoque">
                    Estoque
                  </InputLabel>
                  <Input
                    id="estoque"
                    {...register("estoque")}
                    startAdornment= {<InputAdornment position="start">Un</InputAdornment>}
                  />
                </FormControl>
              </div>
              <FormControl>
                <InputLabel htmlFor="categoria">
                  Categoria
                </InputLabel>
                <Input
                  id="categoria"
                  {...register("categoria")}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="descricao">
                  Descrição do produto
                </InputLabel>
                <Input
                  id="descricao"
                  {...register("descricao")}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="imagem">
                  Imagem
                </InputLabel>
                <Input
                  id="imagem"
                  {...register("imagem")}
                />
              </FormControl>
              {reqError && (
                <Alert severity="error" onClose={closeAlert}>
                  {reqError}
                </Alert>
              )}
            </div>
            
            <div className={classes.buttons}>
              <Button className={classes.cancelButton} color="primary" onClick={() => history.push("/produtos")}>
                Cancelar
              </Button>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Atualizar produto
              </Button>
            </div>
          </form>
        </div>
        <div className={classes.row}>
          <img src={bookCover} alt="Foto do produto" />
        </div>
      </div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
