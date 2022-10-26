import React, { useState, useEffect } from "react";
import Data from "./Data";
import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useTheme } from "@material-ui/core/styles";
import AdminHeader from "./AdminHeader";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from "./Loading";
import "./Table.css";
import Axios from "axios";
import Scrollbutton from "./Scrollbutton";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
	root2: {
		display: "flex",
		marginTop: theme.spacing.unit * 3,
		overflowX: "hide",
	},
}));

const Admin = ({ handleLogout }) => {
	const classes = useStyles();
	const theme = useTheme();
	// const codeArray = Data;
	// const [url, setUrl] = useState("");
	const [activeStep, setActiveStep] = React.useState(0);
	const [image, setImage] = useState(null);
	// const [filter, setFilter] = useState("");
	// const [progress, setProgress] = useState(0);
	// const [sqlValues, setSqlValues] = useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const [open, setOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const handleNext = (e) => {
		// const db = firebase.firestore();
		// newValue.forEach((val) => {
		//   db.collection("answers").doc(val.code).update(val);
		// });
		Axios.put("https://akin-app.herokuapp.com/updated", {
			values: code,
		}).then(() => {
			console.log("successful");
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			setOpen(true);
			setIsLoading(true);
		});
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	// useEffect(() => {
	//   setTimeout(() => {
	//     setIsLoading(false);
	//   }, 2500);
	// }, []);
	// const [ractiveStep, setRactiveStep] = useState();
	// const [numberOfConfigFS, setNumberOfConfigFS] = useState([]);
	// const defaultOutcomeDetails = {
	// 	botanicalName: "",
	// 	commonName: "",
	// 	image: "",
	// };
	// const [code, setCode] = useState([
	// 	codeArray.map((x, i) => ({
	// 		code: x,
	// 		...defaultOutcomeDetails,
	// 	})),
	// ]);

	const [code, setCode] = useState([]);
	const [search, setSearch] = useState("");

	// useEffect(() => {
	//   firebase
	//     .firestore()
	//     .collection("answers")
	//     .get()
	//     .then((snapshot) => {
	//       const fetchedData = snapshot.docs.map((doc) => ({
	//         id: doc.id,
	//         ...doc.data(),
	//       }));
	//       setCode(fetchedData);
	//       // console.log(fetchedData);
	//     });
	//   setIsLoading(true);
	// }, []);

	const maxSteps = 65536;
	// const newSqlValues = sqlValues.slice(
	//   activeStep * 100,
	//   activeStep * 100 + 100
	// );

	// const newImage = newValue.map((fix) => fix.images);

	// useEffect(() => {
	// 	const newCode = [...code];
	// 	const sqlsyntaxdata = newCode.map((r) => r.map((e) => Object.values(e)));
	// 	console.log(sqlsyntaxdata, "shajnnn");
	// 	let data = newCode.reduce((o, a, code) => {
	// 		let ini = [];
	// 		ini.push(a.botanicalName);
	// 		ini.push(a.code);
	// 		ini.push(a.commonName);
	// 		ini.push(a.image);
	// 		o.push(ini);
	// 		return o;
	// 	});

	// 	Axios.post("https://tree-akin.vercel.app/create", {
	// 		data: sqlsyntaxdata,
	// 	})
	// 		.then(() => {
	// 			console.log("successful");
	// 		})
	// 		.catch((e) => console.error(e));
	// 	console.log(sqlsyntaxdata);
	// }, []);

	const handleBotanicalName = (codeName, value) => {
		const newCodeArray = [...code];
		const newArray = newCodeArray.map((codeVal) => {
			if (codeName === codeVal.code) {
				return { ...codeVal, botanicalName: value };
			}
			return codeVal;
		});
		setCode(newArray);
	};

	const handleCommonName = (codeName, value) => {
		const newCodeArray = [...code];
		const newArray = newCodeArray.map((codeVal) => {
			if (codeName === codeVal.code) {
				return { ...codeVal, commonName: value };
			}
			return codeVal;
		});
		setCode(newArray);
	};
	const handleChange = (e, code) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
			const formData = new FormData();
			formData.append("image", e.target.files[0]);
			formData.append("code", code);
			Axios.put("https://akin-app.herokuapp.com/upload", formData).then(() => {
				console.log("successful");
			});
		}
	};
	useEffect(() => {
		Axios.get("https://akin-app.herokuapp.com/get").then((response) => {
			setIsLoading(false);
			setCode(response.data);
			// console.log("response:", response.data, code);
		});
	}, [activeStep]);
	// console.log(
	// 	code.filter((r) => r.code.includes("1,1,1,0,1,0,0,1,0,1,0,1,1,1,1,1"))
	// );
	// useEffect(() => {
	//   Axios.get("https://akin-app.herokuapp.com/onload").then((response) => {
	//     setImage("https://akin-app.herokuapp.com/" + response.data.image);
	//     console.log(response.data.image);
	//     console.log(image);
	//   });
	// }, []);
	// const upload = (codeName) => {
	//   const ref = firebase.storage().ref(`images/${image.name}`).put(image);
	//   ref.on(
	//     "state_changed",
	//     (snapshot) => {
	//       const progress = Math.round(
	//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
	//       );
	//       setProgress(progress);
	//     },
	//     (error) => {
	//       console.log(error);
	//     },
	//     () => {
	//       firebase
	//         .storage()
	//         .ref("images")
	//         .child(image.name)
	//         .getDownloadURL()
	//         .then((url) => {
	//           alert("image uploaded");
	//           const newCodeArray = [...code];
	//           const newArray = newCodeArray.map((codeVal) => {
	//             if (codeName === codeVal.code) {
	//               return { ...codeVal, image: url };
	//             }
	//             return codeVal;
	//           });
	//           setCode(newArray);
	//         });
	//     }
	//   );
	// };

	// console.log(newValue);
	// console.log(activeStep, "active");
	return (
		<>
			<AdminHeader search={search} setSearch={setSearch} />
			<div>
				{isLoading === true ? (
					<Loader />
				) : (
					<div class="table-responsive">
						<table
							style={{
								margin: "100px 50px 50px 20px",
								textAlign: "center",
								justifyContent: "center",
								alignContent: "center",
								width: "90%",
								alignItems: "center",
							}}
						>
							<thead>
								<tr>
									<th>Binary Code</th>
									<th scope="col">Botanical Name</th>
									<th scope="col">Common Name</th>
									<th scope="col">Images</th>
								</tr>
							</thead>
							<tbody>
								{code
									.filter((r) => r.code.includes(search))
									// code
									// 	.filter((val) => {

									// 		if (search === "") {
									// 			return val;
									// 		} else if (val.code.includes(search)) {
									// 			return val;
									// 		} else if (val.botanicalName.includes(search)) {
									// 			return val;
									// 		}
									// 	}
									// 	)
									.map((co, i) => (
										<tr key={i}>
											<th scope="row">
												<td data-label="Binary Code-">
													<input
														className={classes.headers}
														type="text"
														autoFocus
														disabled
														value={co.code}
													/>
												</td>
											</th>
											<td data-label="Botanical Name -">
												<input
													className={classes.header}
													type="text"
													autoFocus
													required
													value={co.botanicalName}
													onChange={(e) =>
														handleBotanicalName(co.code, e.target.value)
													}
												/>
											</td>
											<td data-label="Common Name -">
												<input
													className={classes.header}
													type="text"
													autoFocus
													required
													value={co.commonName}
													onChange={(e) =>
														handleCommonName(co.code, e.target.value)
													}
												/>
											</td>
											<td data-label="Image-">
												<input
													accept="image/*"
													className={classes.input}
													id="photo"
													type="file"
													onChange={(e) => handleChange(e, co.code)}
												/>
												{co.images !== "" ? (
													<img
														src={"https://akin-app.herokuapp.com/" + co.images}
														alt={co.botanicalName}
														style={{ height: 90, width: 90 }}
													/>
												) : null}
											</td>
										</tr>
									))}
							</tbody>
						</table>
						<MobileStepper
							steps={Math.ceil(maxSteps / 10)}
							position="static"
							variant="text"
							activeStep={activeStep}
							nextButton={
								<Button
									size="small"
									onClick={(id) => handleNext(id)}
									disabled={activeStep === maxSteps - 1}
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
									size="small"
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
						<Scrollbutton />
						<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
							<Alert onClose={handleClose} severity="success">
								The answers has been updated successfully
							</Alert>
						</Snackbar>
					</div>
				)}
			</div>
		</>

		// <section className="hero">
		//   <AdminHeader setSearch={setSearch} handleLogout={handleLogout}/>
		//   {/* <nav>
		//     <h4>
		//       <img src={Icon} alt="tree" width="50px" height="50px" />
		//       Tree identifier
		//     </h4>
		//     <input
		//       className={classes.headers}
		//       type="search"
		//       placeholder="Search...."
		//       onChange={(e) => setSearch(e.target.value)}
		//     />
		//     <Link to="/history">
		//       <button> History</button>
		//     </Link>
		//     <Link to="/question">
		//       <button> Questions</button>
		//     </Link>

		//     <button onClick={handleLogout}> logout</button>
		//   </nav> */}

		//   <div className={classes.root}>
		//     {isLoading === true ? (
		//       <Loader />
		//     ) : (
		//       <>
		//         <Grid container style={{ margin: "0px 10px" }}>
		//           <Grid item xs={3} md={3}>
		//             <h4>Binary Code</h4>
		//           </Grid>
		//           <Grid item xs={3} md={3}>
		//             <h4>Botanical Name</h4>
		//           </Grid>
		//           <Grid item xs={3} md={3}>
		//             <h4> Common Name</h4>
		//           </Grid>
		//           <Grid item xs={3} md={3}>
		//             <h4>images</h4>
		//           </Grid>
		//           {newValue
		//             .filter((val) => {
		//               if (search === "") {
		//                 return val;
		//               } else if (val.code.includes(search)) {
		//                 return val;
		//               } else if (val.botanicalName.includes(search)) {
		//                 return val;
		//               }
		//             })
		//             .map((co, i) => (
		//               <Grid
		//                 container
		//                 key={i}
		//                 style={{ flexDirection: "row", display: "flex" }}
		//               >
		//                 <Grid item xs={3} md={3}>
		//                   <input
		//                     className={classes.headers}
		//                     type="text"
		//                     autoFocus
		//                     disabled
		//                     value={co.code}
		//                   />
		//                 </Grid>
		//                 <Grid item xs={3} md={3}>
		//                   <input
		//                     className={classes.header}
		//                     type="text"
		//                     autoFocus
		//                     required
		//                     value={co.botanicalName}
		//                     onChange={(e) =>
		//                       handleBotanicalName(co.code, e.target.value)
		//                     }
		//                   />
		//                 </Grid>
		//                 {/* </Grid> */}
		//                 {/* <Grid item xs> */}
		//                 <Grid item xs={3} md={3}>
		//                   <input
		//                     className={classes.header}
		//                     type="text"
		//                     autoFocus
		//                     required
		//                     value={co.commonName}
		//                     onChange={(e) =>
		//                       handleCommonName(co.code, e.target.value)
		//                     }
		//                   />
		//                 </Grid>
		//                 <Grid item xs={3} md={3}>
		//                   <div style={{ display: "flex", flexDirection: "column" }}>
		//                     <input
		//                       accept="image/*"
		//                       className={classes.input}
		//                       id="photo"
		//                       type="file"
		//                       onChange={(e) => handleChange(e, co.code)}
		//                     />
		//                     {/* {co.images !== "" ? (
		//                     <progress value={progress} max="100" />
		//                   ) : null} */}

		//                     {co.images !== "" ? (
		//                       <img
		//                         src={"https://akin-app.herokuapp.com/" + co.images}
		//                         alt={co.botanicalName}
		//                         style={{ height: 90, width: 90 }}
		//                       />
		//                     ) : null}
		//                     {/* <img src={image} alt="img" /> */}
		//                   </div>
		//                 </Grid>
		//               </Grid>
		//             ))}
		//         </Grid>
		//         <MobileStepper
		//           steps={Math.ceil(maxSteps / 100)}
		//           position="static"
		//           variant="text"
		//           activeStep={activeStep}
		//           nextButton={
		//             <Button
		//               size="small"
		//               onClick={(id) => handleNext(id)}
		//               disabled={activeStep === maxSteps - 1}
		//             >
		//               Next
		//               {theme.direction === "rtl" ? (
		//                 <KeyboardArrowLeft />
		//               ) : (
		//                 <KeyboardArrowRight />
		//               )}
		//             </Button>
		//           }
		//           backButton={
		//             <Button
		//               size="small"
		//               onClick={handleBack}
		//               disabled={activeStep === 0}
		//             >
		//               {theme.direction === "rtl" ? (
		//                 <KeyboardArrowRight />
		//               ) : (
		//                 <KeyboardArrowLeft />
		//               )}
		//               Back
		//             </Button>
		//           }
		//         />
		//         <Scrollbutton />
		//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
		//           <Alert onClose={handleClose} severity="success">
		//             The answers has been updated successfully
		//           </Alert>
		//         </Snackbar>
		//       </>
		//     )}
		//   </div>
		// </section>
	);
};
export default Admin;
