import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "@material-ui/core/Card";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";

import useStyles from "./useStyles";
import { Alert } from "@material-ui/lab";

export default function RegisterUser() {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState('');
  const history = useHistory();


  const createAccount = async (accountData) => {

    if (accountData.senha !== accountData.repitasenha) {
      setError('senha', { type: 'validate' }, { shouldFocus: true });
      setError('repitasenha', { type: 'validate' }, { shouldFocus: false });
      return;
    }
    try {
      setLoading(true);
      setReqError('');

      const response = await fetch('http://localhost:3003/cadastro', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify(accountData),
        headers: {
          'Content-type': 'application/json'
        }
      });

      const data = await response.json()

      setLoading(false);

      if (response.ok) {
        return history.push('/login')
      }

      setReqError(data);

    } catch (error) {
      setReqError(error.message)
    }
  }

  const closeAlert = () => {
    setReqError('')
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit(createAccount)}>
      <Card className={classes.card}>
        <Typography variant="h3" component="h1">
          Criar uma conta
        </Typography>

        <div className={classes.column}>
          <FormControl>
            <InputLabel error={errors.nome ? true : false} htmlFor="nome">
              Seu nome
            </InputLabel>
            <Input
              id="nome"
              className={classes.input}
              error={errors.nome ? true : false}
              {...register("nome", { required: true })}
            />
          </FormControl>

          <FormControl>
            <InputLabel error={errors.nome_loja ? true : false} htmlFor="nome_loja">
              Nome da loja
            </InputLabel>
            <Input
              id="nome_loja"
              className={classes.input}
              error={errors.nome_loja ? true : false}
              {...register("nome_loja", { required: true })}
            />
          </FormControl>

          <FormControl>
            <InputLabel error={errors.email ? true : false} htmlFor="email">
              E-mail
            </InputLabel>
            <Input
              id="email"
              className={classes.input}
              error={errors.email ? true : false}
              {...register("email", { required: true })}
            />
          </FormControl>

          <PasswordInput
            label="Senha"
            id="senha"
            htmlFor="senha"
            error={errors.senha ? true : false}
            register={() => register("senha", { required: true })}
          />

          <PasswordInput
            label="Repita a senha"
            id="repitasenha"
            htmlFor="repitasenha"
            error={errors.repitasenha ? true : false}
            register={() => register("repitasenha", { required: true })}
          />
        </div>
        <br />
        {reqError && (<Alert severity="error" onClose={closeAlert}>
          {reqError}
        </Alert>)}

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Criar conta
        </Button>

        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <span>
          Já possui uma conta?{" "}
          <Link className={classes.link} to="/">
            ACESSE
          </Link>
        </span>
      </Card>
    </form>
  );

};
