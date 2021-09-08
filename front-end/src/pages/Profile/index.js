import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import UserContext from "../../contexts/user/UserContext";
import TokenContext from "../../contexts/token/TokenContext";
import SideBar from "../../components/SideBar";

import useStyles from "./useStyles";

export default function Perfil() {
  const classes = useStyles();
  const history = useHistory();
  const [reqError, setReqError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);

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
      {Object.keys(user).length &&
        <div className={classes.container}>
          <SideBar />
          <div className={classes.mainScreen}>
            <h1>{user.nome_loja}</h1>
            <h2>Perfil</h2>
            <div className={classes.column}>
              <FormControl>
                <InputLabel htmlFor="nome">
                  Seu nome
                </InputLabel>
                <Input
                  id="nome"
                  className={classes.input}
                  defaultValue={user.nome}
                  disabled={true}
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
                  defaultValue={user.nome_loja}
                  disabled={true}
                />
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="email">
                  E-mail
                </InputLabel>
                <Input
                  id="email"
                  className={classes.input}
                  defaultValue={user.email}
                  disabled={true}
                />
              </FormControl>
              {reqError && (
                <Alert severity="error" onClose={closeAlert}>
                  {reqError}
                </Alert>
              )}
              <Button
                className={classes.button}
                onClick={() => history.push('/perfil/editar')}
                type="button"
                variant="contained"
                color="primary"
              >
                Editar perfil
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
}
