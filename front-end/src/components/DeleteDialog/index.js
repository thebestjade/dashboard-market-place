import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as TrashIcon } from "../../assets/large.svg";
import TokenContext from "../../contexts/token/TokenContext";
import listProducts from '../../services/productService';
import ProductsContext from "../../contexts/products/ProductsContext";
import { Alert } from "@material-ui/lab";

import './styles.css';

export default function DeleteDialog({ id }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { token } = useContext(TokenContext);
  const { setProducts } = useContext(ProductsContext);
  const [reqError, setReqError] = useState("");

  const openWindow = () => {
    setOpen(true);
  };

  const closeWindow = () => {
    setOpen(false);
  };

  const closeAlert = () => {
    setReqError("");
  };

  const RemoveProduct = async () => {
    try {
      const resposta = await fetch(`http://localhost:3003/produtos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      });
      const data = resposta.json();

      if (resposta.ok) {
        closeWindow()
        listProducts(token, setProducts, setReqError);
        return history.push("/produtos");
      }

      setReqError(data);

    } catch (error) {
      return setReqError(error.message);
    }
  };

  return (
    <>
      <Link onClick={openWindow} className="icon">
        <TrashIcon />
      </Link>
      <Dialog
        open={open}
        onClose={closeWindow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remover produto do catálogo?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="buttonsContainer">
          <Button onClick={closeWindow} className="keepProduct" color="primary">
            Manter produto
          </Button>
          <Button onClick={RemoveProduct} className="removeProduct" color="primary" autoFocus>
            Remover
          </Button>
        </DialogActions>
        {reqError && (
          <Alert severity="error" onClose={closeAlert}>
            {reqError}
          </Alert>
        )}
      </Dialog>
    </>
  );
}
