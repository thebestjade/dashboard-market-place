import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  container: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#F0F0F0"
  },
  mainScreen: {
    margin: "75px 0px 0px 75px",

    "& h1": {
      marginBottom: 95,
      marginTop: 0,
      fontSize: 48
    },
    "& h2": {
      marginBottom: 80
    },
  },
  
  cardsContainer: {
    display: "flex",
    overflowX: "auto",
    gap:40
  },
  button: {
    backgroundColor: "#007DFF",
    marginTop: 40,
    marginBottom: 45,

    "&:hover": {
      backgroundColor: "#075CB4",
    },
  },
}));

export default useStyles;