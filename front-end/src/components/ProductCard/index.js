import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DeleteDialog from "../DeleteDialog";
import noImage from "../../assets/noImage.png";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: 500,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    padding: 0,
  },
  actionArea: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  media: {
    height: 350,
    width: "100%",
    position: "relative",
    padding: 10,
  },
  content: {
    height: 100,
    width: 200,
    overflow: "hidden",
    display: "-webkit-box",
    lineClamp: 7,
    WebkitBoxOrient: 'vertical',
  },
  title: {
    width: 200,
    marginBottom: 30,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  footer: {
    display: "flex",
    width: "90%",
    padding: "0 20px",
    marginBottom: 10,
    alignSelf: "flex-end",
    justifyContent: "space-around",
  },
});

export default function ProductCard(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          className={classes.media}
          image={props.image || noImage}
          title={props.name}
        >
        <DeleteDialog id={props.id} />
        </CardMedia>
        <CardContent
          onClick={() => history.push(`/produtos/${props.id}/editar`)}
        >
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h3"
          >
            {props.name}
          </Typography>
          <Typography
            className={classes.content}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {props.description}
          </Typography>
        </CardContent>
        <div className={classes.footer}>
          <span>{props.inventory} UNIDADES</span>
          <span>R$ {props.price}</span>
        </div>
      </CardActionArea>
    </Card>
  );
}
