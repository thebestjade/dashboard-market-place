import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 392,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
      "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    borderRadius: 16,
    padding: "80px 86px 88px 86px",

    "& h1": {
      marginBottom: 70,
    },
  },

  container: {
    display: "grid",
    placeContent: "center",
    minHeight: "100vh",

    "& span": {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 200
    }
  },

  column: {
    display: "flex",
    flexDirection: "column",
    gap: 48,
  },

  input: {
    maxWidth: 250
  },

  button: {
    backgroundColor: "#007DFF",
    padding: 10,
    marginTop: 40,
    marginBottom: 45,

    "&:hover": {
      backgroundColor: "#075CB4",
    },
  },

  link: {
    color: '#007DFF'
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

export default useStyles;