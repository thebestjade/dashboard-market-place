import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Card from "@material-ui/core/Card";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { Alert } from "@material-ui/lab";
import TokenContext from "../../contexts/token/TokenContext";
import UserContext from "../../contexts/user/UserContext";

import useStyles from "./useStyles";

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const useToken = useContext(TokenContext);
  const { setUser } = useContext(UserContext);

  const loginUser = async (loginData) => {
    try {
      setLoading(true);
      setReqError("");
      
      const response = await fetch("http://localhost:3003/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify(loginData),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        useToken.logar(data?.token, () => history.push("/produtos"));
        setUser(data.usuario);
        return;
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
    <form className={classes.container} onSubmit={handleSubmit(loginUser)}>
      <Card className={classes.card}>
        <Typography variant="h3" component="h1">
          Login
        </Typography>
        <div className={classes.column}>
          <FormControl>
            <InputLabel error={!!errors.email} htmlFor="email">
              E-mail
            </InputLabel>
            <Input
              id="email"
              className={classes.input}
              error={!!errors.email}
              {...register("email", { required: true })}
            />
          </FormControl>

          <PasswordInput
            label="Senha"
            id="senha"
            htmlFor="senha"
            error={!!errors.senha}
            register={() => register("senha", { required: true })}
          />
        </div>
        <br />
        {reqError && (
          <Alert severity="error" onClose={closeAlert}>
            {reqError}
          </Alert>
        )}

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <span>
          Primeira vez aqui?{" "}
          <Link className={classes.link} to="/cadastro">
            CRIE UMA CONTA
          </Link>
        </span>
      </Card>
    </form>
  );
}
