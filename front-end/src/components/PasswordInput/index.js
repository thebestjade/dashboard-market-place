import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles({
  input: {
    maxWidth: 250,
  },
});

export default function InputSenha(props) {
  const classes = useStyles();
  const [visibleInput, setVisibleInput] = useState(false);

  return (
    <div>
      <FormControl>
        <InputLabel error={props.error} htmlFor={props.htmlFor}>
          {props.label}
        </InputLabel>
        <Input
          className={classes.input}
          id={props.id}
          error={props.error}
          {...props.register()}
          type={visibleInput ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(e) => setVisibleInput(!visibleInput)}
              >
                {visibleInput ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}
