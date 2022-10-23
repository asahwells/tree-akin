import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import firebase from "./Fire";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from "./Loading";
import Icon from "./tree.svg";
import QuestionHeader from "./QuestionHeader"
import Button from "@material-ui/core/Button";
// import Axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  header: {
    minWidth: "130vh",
    flexGrow: 1,
    flexWrap: "wrap",
    flex: 1,
    marginTop: "2rem",
  },
}));
const Question = ({ handleLogout }) => {
  // const codex = [
  //   "1",
  //   "2",
  //   "3",
  //   "4",
  //   "5",
  //   "6",
  //   "7",
  //   "8",
  //   "9",
  //   "10",
  //   "11",
  //   "12",
  //   "13",
  //   "14",
  //   "15",
  //   "16",
  // ];
  // const code = codex.sort((a, b) => a - b);
  // const defaultOutcomeDetails = {
  //   Question: "",
  //   Description: "",
  //   image: "",
  // };
  const [quest, setQuest] = useState([]);
  // code.map((x, i) => ({
  //   number: x,
  //   ...defaultOutcomeDetails,
  // }))
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = useState(0);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // console.log(quest);
  useEffect(() => {
    firebase
      .firestore()
      .collection("questions")
      .get()
      .then((snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuest(fetchedData);
        console.log(fetchedData);
      });
  }, []);
  const handleChange = (num, value) => {
    const newNub = [...quest];
    const newQuest = newNub.map((questValue) => {
      if (num === questValue.number) {
        return { ...questValue, Question: value };
      }
      return questValue;
    });
    setQuest(newQuest);
  };
  const handleChange2 = (num, value) => {
    const newNub = [...quest];
    const newQuest = newNub.map((questValue) => {
      if (num === questValue.number) {
        return { ...questValue, Description: value };
      }
      return questValue;
    });
    setQuest(newQuest);
  };
  const handleSave = () => {
    const db = firebase.firestore();
    quest.forEach((val) => {
      db.collection("questions").doc(val.number).update(val);
    });
    setOpen(true);
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const upload = (num) => {
    const ref = firebase.storage().ref(`images/${image.name}`).put(image);
    ref.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            alert("image uploaded");
            const newNub = [...quest];
            const newQuest = newNub.map((questValue) => {
              if (num === questValue.number) {
                return { ...questValue, image: url };
              }
              return questValue;
            });
            setQuest(newQuest);
          });
      }
    );
  };
  // useEffect = (() => {
  //   Axios.get("http://localhost:3001/getfilter").then((response) =>  )
  // },[])

  // useEffect(() => {
  //   quest.forEach((element) => {
  //     firebase
  //       .firestore()
  //       .collection("questions")
  //       .doc(element.number)
  //       .set(element);
  //   });
  // }, []);
  console.log(quest);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  const classes = useStyles();

  return (
    <section className="hero">
       <QuestionHeader/>

      <div className={classes.header}>
        {isLoading === true ? (
          <Loader />
        ) : (
          <>
            {quest.map((co, i) => (
              <>
                <Grid container>
                  <Grid item xs={4}>
                    <div style={{ marginLeft: "5rem" }}>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Question"
                        multiline
                        rowsMax={4}
                        value={co.Question}
                        color="primary"
                        onChange={(e) =>
                          handleChange(co.number, e.target.value)
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ marginLeft: "10rem" }}>
                      <TextField
                        id="standard-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        color="primary"
                        value={co.Description}
                        onChange={(e) =>
                          handleChange2(co.number, e.target.value)
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="photo"
                        multiple
                        type="file"
                        onChange={handleImageChange}
                      />
                      {co.image !== "" ? (
                        <progress value={progress} max="100" />
                      ) : null}

                      <label htmlFor="contained-button-file">
                        <Button
                          style={{ fontSize: "1rem" }}
                          variant="contained"
                          color="primary"
                          onClick={() => upload(co.number)}
                          component="span"
                        >
                          Upload
                        </Button>
                      </label>
                    </div>
                  </Grid>
                </Grid>
              </>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  width: "20rem",
                  borderRadius: "10px",
                }}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                The Questions has been updated successfully
              </Alert>
            </Snackbar>
          </>
        )}
      </div>
    </section>
  );
};

export default Question;
