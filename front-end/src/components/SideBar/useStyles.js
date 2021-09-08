import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  sideBar: {
    display: "flex",
    justifyContent: "center",
    width: 138,
    backgroundColor: "#434343",
    minHeight: "100%",
    overflow: "none",
    borderRadius: "0px 0px 32px 0px"
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: 200,
    marginTop: 113,
  },
  buttonLogout: {
    background: "none",
    outline: "none",
    border: "none",
    cursor: "pointer",
    '& svg': {
      width: '30px',
      height: '30px',
    }
  }
}));

export default useStyles;