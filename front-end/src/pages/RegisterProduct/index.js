import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import SideBar from "../../components/SideBar";

import useStyles from "./useStyles";

export default function RegisterProduct() {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const history = useHistory();

  useEffect(() => {
    async function getUser() {
      setReqError("");
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
    getUser();
  }, [token, setUser]);

  const sendProduct = async (sendData) => {
    try {
      setLoading(true);
      setReqError("");

      const response = await fetch("http://localhost:3003/produtos", {
        method: "POST",
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
        <h1>{user.nome_loja}</h1>
        <h2>Adicionar produto</h2>
        <form onSubmit={handleSubmit(sendProduct)}>
          <div className={classes.column}>
            <FormControl>
              <InputLabel error={!!errors.nome} htmlFor="nome">
                Nome do produto
              </InputLabel>
              <Input
                id="nome"
                error={!!errors.nome}
                {...register("nome", { required: true })}
              />
            </FormControl>
            <div>
              <FormControl>
                <InputLabel error={!!errors.preco} htmlFor="preco">
                  Preço
                </InputLabel>
                <Input
                  id="preco"
                  error={!!errors.preco}
                  {...register("preco", { required: true })}
                  startAdornment= {<InputAdornment position="start">R$</InputAdornment>}
                />
              </FormControl>

              <FormControl className={classes.inventoryInput}>
                <InputLabel
                  error={!!errors.estoque}
                  htmlFor="estoque"
                >
                  Estoque
                </InputLabel>
                <Input
                  id="estoque"
                  error={!!errors.estoque}
                  {...register("estoque", { required: true })}
                  startAdornment= {<InputAdornment position="start">Un</InputAdornment>}
                />
              </FormControl>
            </div>

            <FormControl>
              <InputLabel
                htmlFor="categoria"
              >
                Categoria
              </InputLabel>
              <Input
                id="categoria"
                {...register("categoria")}
              />
            </FormControl>

            <FormControl>
              <InputLabel
                error={!!errors.descricao}
                htmlFor="descricao"
              >
                Descrição do produto
              </InputLabel>
              <Input
                id="descricao"
                error={!!errors.descricao}
                {...register("descricao", { required: true })}
              />
            </FormControl>

            <FormControl>
              <InputLabel error={!!errors.imagem} htmlFor="imagem">
                Imagem
              </InputLabel>
              <Input
                id="imagem"
                error={!!errors.imagem}
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
              Adicionar produto
            </Button>
          </div>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
