import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Icon from "./NewTree.svg";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
// import TextHeader from "./TextHeader";
import InfoIcon from "@material-ui/icons/Info";
// import Loader from "./Loading";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import NavBar from "./NavBar";
// import { Link } from "react-router-dom";
import firebase from "./Fire";
import IconButton from "@material-ui/core/IconButton";
import Second from "./Second";
import Axios from "axios";

const move = keyframes`
0% { transform: translateY(-5px)         }
    50% { transform: translateY(100px) translateX(-100px)        }
    100% { transform: translateY(-5px)         }
`;
const TreeSvg = styled.img`
 display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;
  margin-top: 10rem;
  max-width: 100%;
  width: calc(30% + 10vw);
  height: 20rem;
  z-index: 7;
  animation: ${move} 2.5s ease infinite;
  }
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* position: relative; */
`;

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		flexDirection: "column",
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));
// const Questions = [
//   "Does it have leaves?",
//   "Are the leaves broad?",
//   "is the leaf green?",
//   "is it tall",
// ];
export default function Text() {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const [data, setData] = useState([]);
	const [questdata, setQuestdata] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("1");
	const [binary, setBinary] = React.useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		// const db = firebase.firestore();
		// let newdata = [];
		// db.collection("answers")
		//   .get()
		//   .then((querySnapshot) => {
		//     querySnapshot.forEach((doc) => newdata.push(doc.data()));
		//     setData(newdata);
		//   });
		// Axios.get("http://localhost:3001/getData", {
		Axios.get("https://akin-app.herokuapp.com/getData", {
			params: { limit: 10 },
		}).then((response) => {
			setData(response?.data || []);
			console.log(response.data);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		const db = firebase.firestore();
		db.collection("questions")
			.get()
			.then((querySnapshot) => {
				const fetchedData = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					fetchedData.push(data);
				});
				setQuestdata(fetchedData);
				setIsLoading(false);
			});
	}, []);
	useEffect(() => {
		if (questdata.length > 0 && data.length > 0) setIsLoading(false);
	}, [data.length, questdata.length]);

	const handleNext = () => {
		setBinary([...binary, value]);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setValue("");
		// console.log(activeStep);
		if (newquest.length === activeStep) {
			filterAnswersToShow();
		}
	};

	const handleBack = () => {
		const lastItemRemoved = binary.pop();
		setBinary(binary);
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		// console.log(lastItemRemoved);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	// kpk

	// const tree = data;
	// const newTree = tree.map((trees) => trees.code);
	const filteredCode = [...(data || [])].filter((tre) => {
		return tre?.code?.indexOf(binary?.join()) !== -1;
	});
	// console.log(filteredCode, "filteredcode", tree);
	const filterAnswersToShow = () => {
		// const db = firebase.firestore();
		// db.collection("answers")
		//   .where("code", "==", binary.join())
		//   .get()
		//   .then((querySnapshot) => {
		//     console.log(querySnapshot.docs.map((v) => v.data()));
		//   });
		Axios.get("https://akin-app.herokuapp.com/getfilter", {
			codex: binary?.join(),
		}).then((response) => console.log(response));
		setIsLoading(false);
	};

	// useEffect(() => {
	// }, []);
	console.log(binary?.join());

	// const getCode = (code) => {
	//   const index = tree.find((item) => item.code === code);

	//   return index.code;
	// };
	const newquest = questdata.map((da) => da);
	const newValue = [newquest[activeStep]];
	const num = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
	];
	const arrangedNum = [num[activeStep]];
	// const number = questdata.map((da) => da.number);

	console.log(filteredCode);
	// console.log(isLoading);
	return (
		<Container>
			<NavBar />
			{isLoading === true ? (
				<TreeSvg src={Icon} alt="tree Svg" srcset="" width="400" height="400" />
			) : (
				<div className="card">
					{newquest.length === activeStep ? (
						<Second filteredCode={filteredCode} />
					) : (
						<div className="card-body">
							{newValue.map((i) => (
								<div key={i}>
									<h3 className="card-title" style={{ marginTop: "30px" }}>
										{arrangedNum.map((num) => num)}. {i.Question}
										<IconButton
											onClick={handleOpen}
											color="primary"
											aria-label="info icon"
											component="span"
										>
											<InfoIcon />
										</IconButton>
									</h3>
									<Modal
										aria-labelledby="transition-modal-title"
										aria-describedby="transition-modal-description"
										className={classes.modal}
										open={open}
										onClose={handleClose}
										closeAfterTransition
										BackdropComponent={Backdrop}
										BackdropProps={{
											timeout: 500,
										}}
									>
										<Fade in={open}>
											<div className={classes.paper}>
												<img
													id="transition-modal-title"
													src={i.image}
													alt={i.number}
													style={{
														height: "10rem",
														width: "15rem",
														marginBottom: "10px",
													}}
												/>
												{/* <h2 id="transition-modal-title">Transition modal</h2> */}
												<p id="transition-modal-description">{i.Description}</p>
											</div>
										</Fade>
									</Modal>
									<FormControl component="fieldset">
										{/* <FormLabel component="legend">Questions</FormLabel> */}
										<RadioGroup
											aria-label="gender"
											name="gender1"
											value={value}
											onChange={handleChange}
										>
											<FormControlLabel
												value="1"
												control={<Radio color="primary" />}
												label="Yes"
												style={{ paddingTop: "20px" }}
											/>
											<FormControlLabel
												value="0"
												control={<Radio color="primary" />}
												label="No"
												style={{ paddingTop: "20px" }}
											/>
										</RadioGroup>
									</FormControl>
								</div>
							))}
							<MobileStepper
								style={{ marginTop: "30px" }}
								variant="progress"
								steps={newquest.length}
								position="static"
								activeStep={activeStep}
								className={classes.root}
								nextButton={
									<Button
										size="large"
										style={{ width: "10rem" }}
										onClick={handleNext}
										disabled={activeStep === newquest.length || value === ""}
									>
										Next
										{theme.direction === "rtl" ? (
											<KeyboardArrowLeft />
										) : (
											<KeyboardArrowRight />
										)}
									</Button>
								}
								backButton={
									<Button
										style={{ width: "10rem" }}
										size="large"
										onClick={handleBack}
										disabled={activeStep === 0}
									>
										{theme.direction === "rtl" ? (
											<KeyboardArrowRight />
										) : (
											<KeyboardArrowLeft />
										)}
										Back
									</Button>
								}
							/>
						</div>
					)}
				</div>
			)}
		</Container>
	);
}
