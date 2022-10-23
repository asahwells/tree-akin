import React, { useEffect, useState } from "react";
import HistoryHeader from "./HistoryHeader";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "./Fire";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "130vh",
    flexGrow: 1,
    flexWrap: "wrap",
    flex: 1,
  },
}));

const History = (handleLogout) => {
  const classes = useStyles();
  // const theme = useTheme();
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("visitors")
      .get()
      .then((querySnapshot) => {
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedData.push(data);
        });
        setHistory(fetchedData);
      });
  }, []);
  const handleDelete = () => {
    const db = firebase.firestore();
    db.collection("visitors")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .catch((error) => console.error("error in removing :", error));
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <HistoryHeader />
      {history.map((i) => (
        <div
          key={i.Email}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "30px",
            }}
          >
            <h3>Email: {i.Email}</h3> <h3>Name: {i.Name}</h3>
          </div>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px 10px",
        }}
      >
        <button
          style={{
            width: "20rem",
            borderRadius: "10px",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Your history has been cleared successfully
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default History;
