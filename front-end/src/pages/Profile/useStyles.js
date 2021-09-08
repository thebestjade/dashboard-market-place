import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#F0F0F0"
  },
  mainScreen: {
    margin: "75px 0px 0px 75px",
    display: "flex",
    flexDirection: "column",

    "& h1": {
      marginBottom: 85,
      fontSize: 48
    },
    "& h2": {
      marginBottom: 37
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 48,
  },
  button: {
    backgroundColor: "#007DFF",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 45,
    width: 150,

    "&:hover": {
      backgroundColor: "#075CB4",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

export default useStyles;