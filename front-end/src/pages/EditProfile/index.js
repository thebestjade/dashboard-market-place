import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, FormControl, Input, InputLabel, Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TokenContext from "../../contexts/token/TokenContext";
import UserContext from "../../contexts/user/UserContext";
import SideBar from "../../components/SideBar";
import PasswordInput from "../../components/PasswordInput";

import useStyles from "./useStyles";

export default function EditProfile() {
  const classes = useStyles();
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);

  const sendUpdate = async (updateData) => {

    if (updateData.senha !== updateData.repitasenha) {
      setError("senha", { type: "validate" }, { shouldFocus: true });
      setError("repitasenha", { type: "validate" }, { shouldFocus: false });
      return;
    }
    try {
      setLoading(true);
      setReqError("");

      const response = await fetch("http://localhost:3003/perfil", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify(updateData),
        headers: {
          "Content-type": "application/json",
          Authorization: token
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
        <h2>Perfil</h2>
        <form onSubmit={handleSubmit(sendUpdate)}>
          <div className={classes.column}>
            <FormControl>
              <InputLabel htmlFor="nome">
                Seu nome
              </InputLabel>
              <Input
                id="nome"
                className={classes.input}
                {...register("nome")}
              />
            </FormControl>

            <FormControl>
              <InputLabel
                htmlFor="nome_loja"
              >
                Nome da loja
              </InputLabel>
              <Input
                id="nome_loja"
                className={classes.input}
                {...register("nome_loja")}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="email">
                E-mail
              </InputLabel>
              <Input
                id="email"
                className={classes.input}
                {...register("email")}
              />
            </FormControl>
            <PasswordInput
              label="Senha"
              id="senha"
              htmlFor="senha"
              error={!!errors.senha}
              register={() => register("senha")}
            />
            <PasswordInput
              label="Repita a senha"
              id="repitasenha"
              htmlFor="repitasenha"
              error={!!errors.repitasenha}
              register={() => register("repitasenha")}
            />
          </div>
          {reqError && (
            <Alert severity="error" onClose={closeAlert}>
              {reqError}
            </Alert>
          )}
          <div className={classes.buttons}>
            <Button className={classes.cancelButton} color="primary" onClick={() => history.push("/perfil")}>
              Cancelar
            </Button>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Editar perfil
            </Button>
          </div>
        </form>
      </div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
