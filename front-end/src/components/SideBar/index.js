import React, { useContext } from 'react';
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { ReactComponent as StoreIcon } from "../../assets/store.svg";
import { ReactComponent as StoreSelectedIcon } from "../../assets/store-selected.svg";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as UserSelectedIcon } from "../../assets/user-selected.svg";
import ProductsContext from '../../contexts/products/ProductsContext';
import TokenContext from '../../contexts/token/TokenContext';
import { Link, useLocation, useHistory } from "react-router-dom";


import useStyles from "./useStyles";

export default function SideBar() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { setProducts } = useContext(ProductsContext);
  const { logout } = useContext(TokenContext);

  const endSection = () => {
    setProducts([])
    logout(() => history.push('/'))
  }

  return (
    <div className={classes.sideBar}>
      <div className={classes.iconsContainer}>
        <Link to="/produtos">
          {location.pathname.includes("produtos") ? (
            <StoreSelectedIcon />
          ) : (
            <StoreIcon />
          )}
        </Link>
        <Link to="/perfil">
          {location.pathname.includes("perfil") ? (
            <UserSelectedIcon />
          ) : (
            <UserIcon />
          )}
        </Link>
        <button type="button" onClick={endSection} className={classes.buttonLogout}>
          <CloseIcon/>
        </button>
      </div>
    </div>
  )
}
