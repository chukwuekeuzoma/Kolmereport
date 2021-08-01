import React, { useState, useEffect } from 'react';
import "./Verification.scss"
import {TextField, Button, Dialog, Slide, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Fade from 'react-reveal/Fade'
import axios from "axios"
import qs from 'qs'
import {useHistory } from "react-router-dom"
// import { useFormik } from "formik"
// import * as yup from 'yup';
import PulseLoader from "react-spinners/ClipLoader"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
      
    backDrop: {
        backdropFilter: "blur(3px)",
        position:"relative"
        // backgroundColor:'rgba(0,0,30,0.4)'
      },

      root: {
        '& label.Mui-focused': {
            color: '#cc7722',
        },
        '& .MuiInputBase-root': {
            color: 'black'
        },
        '&.MuiTextField-root label': {
            top: 8,
            bottom: 8
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover': {
                borderColor: '#cc7722',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#cc7722',
            },

        },
    },

})

// const validationSchema = yup.object({
//     code: yup.string().min(6, "code required").required("code required"),

//   });

export default function Verification(props) {
    const classes = useStyles();
    const [code, setcode] = useState("")
    const [verId, setverId] = useState([])
    const [VerData, setVerData] = useState([])
    const [verLoader, setverLoader] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [OpenConfrimDialog, setOpenConfrimDialog] = useState(false)
    const [orderSucces, setorderSucess] = useState("")
    const [orderError, setorderError] = useState("")
    const [dialogLoder, setdialogLoder] = useState(false)
  
    const history = useHistory();

    const codedata = {
        code
    }


    const CloseDialog = () => {
        setOpenConfrimDialog(false);
    };

    const OpenDialog  = () => {
        setOpenConfrimDialog(true);
    };

    // const params = new URLSearchParams()

    // params.append(code)
     
    // console.log(codedata)

   

    // const SubmitCode = async (e)  => {
    //     e.preventDefault();
    //     let dataCheck = true
    //     setverLoader(true)
    //     axios.get('https://delivered-demo.herokuapp.com/api/orders/confirm', codedata)
    //         .then(response => {
    //             if (dataCheck) {
    //                 if (response.data.status === "success") {
    //                     setverId(response.data.data["id"])
    //                     setverLoader(false) 
    //                     setSuccess(response.data.message)
    //                     setError("")
    //                   };

    //                   if (response.data.status === "error") {
    //                     setError(response.data.message)
    //                     setverLoader(false) 
    //                     setSuccess("")
    //                   }
                   
    //             }
    //         })
    //         .catch(e => { if (dataCheck) { console.log(e) } 
    //           setError(e.response.data.message)
    //           setSuccess("")
    //           setverLoader(false) })
    //     return () => dataCheck = false
    // }

     // const options = {
        //     method: 'GET',
        //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //     data: qs.stringify(codedata),
        //     url: 'https://delivered-demo.herokuapp.com/api/orders/confirm',
        //   };
        //   axios(options)
    
    const SubmitCode = async (e)  => {
        e.preventDefault();
        let dataCheck = true
        setverLoader(true)
        axios({
            method: 'GET',
            url: 'https://delivered-demo.herokuapp.com/api/orders/confirm',
            data: qs.stringify(codedata),
            headers: {
            'content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            console.log(codedata)
            if (dataCheck) {
                if (response.data.status === "success") {
                    setVerData(response.data.data)
                    setverId(response.data.data["id"])
                    setverLoader(false) 
                    setSuccess(response.data.message)
                    setError("")
                    OpenDialog()
                };

                if (response.data.status === "error") {
                    setorderError(response.data.message)
                    setverLoader(false) 
                    setSuccess("")
                }
            
            }
        }) .catch(e => { if (dataCheck) { console.log(e) } 
            setError(e.response.data.message)
            setSuccess("")
            setverLoader(false) })

    }

    // const formik = useFormik({
    //     initialValues: {
    //       code: "",
    //      },
    //     onSubmit, 
    //     validateOnBlur: true,
    //     validationSchema: validationSchema,
    
    //   });


     const onConfirmCode = (e) =>{
        // e.preventDefault();
        let Orderdata = true
        // setdialogLoder(true)
        axios.get(`https://delivered-demo.herokuapp.com/api/orders/confirm/${verId}`)
        .then(response => {
            console.log(codedata)
            if (Orderdata) {
                if (response.data.status === "success") {
                    setorderSucess(response.data.message)
                    setError("")
                };

                if (response.data.status === "error") {
                    setError(response.data.message)
                    // setverLoader(false) 
                    setSuccess("")
                }
            
            }
        }) .catch(e => { if (Orderdata) { console.log(e) } 
            setError(e.response.data.message)
            setSuccess("")
            // setverLoader(false) 
        })
     }

    return (
        <>
           <Fade bottom>
                <div className="Ver_container">
                    {/* <div className="Ver_head"><span>Verification</span></div> */}
                    <div>
                        <div className="Ver_Alert">
                            {error && <Alert severity="error">{error}</Alert>}
                            {success && <Alert severity="success">{success}</Alert>}
                        </div>
                        <form className={classes.root} onSubmit={SubmitCode}>
                            <div className="Ver_container_two">
                                <div>
                                    <TextField
                                        size="small"
                                        label="Code"
                                        placeholder="Code"
                                        name="code"
                                        type="phone"
                                        variant="outlined"
                                        className="Ver_textfield"
                                        onChange={e => setcode(e.target.value)}
                                        // value={formik.values.code}
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                    />
                                </div>

                                <div className="Var_text">
                                    <span>
                                        Please provide the verification<br />
                                        code sent to confirm<br />
                                        delivery
                                    </span>
                                </div>
                                {verLoader?
                                <Button variant="outlined" className="Ver_button"> 
                                    <PulseLoader color={"white"} size={20}/>
                                </Button>
                                :
                                <Button variant="outlined" className="Ver_button" type="submit" disabled={!code} > 
                                    Confirm
                                </Button>

                                    // <Button variant="outlined" className="Ver_button" onClick={OpenDialog} > 
                                    //    Check
                                    // </Button>

                                }
                            </div>
                        </form>
                    </div>
                    
                   
                </div>
            </Fade>

            {/* Dialogconfirmation box*/}
            <Dialog
                   open={OpenConfrimDialog}
                   TransitionComponent={Transition}
                   keepMounted
                   onClose={CloseDialog}
                   aria-labelledby="alert-dialog-slide-title"
                   aria-describedby="alert-dialog-slide-description"
                   BackdropProps={{
                    classes: {
                      root: classes.backDrop,
                    },
                    }}
                >
                <DialogActions>
                    <Button onClick={CloseDialog} variant="outlined" >
                            X
                    </Button>
                </DialogActions>
                <DialogContent style={{ width: "420px", height: "auto"}}>
                        <div className="ver_dialog_alert">
                            {orderError && <Alert severity="error">{orderError}</Alert>}
                            {orderSucces && <Alert severity="success">{orderSucces}</Alert>}
                        </div>
                      <div>
                          <div>
                              <div className="ver_dialog_text"><span>Product Name</span></div>
                              <div className="ver_dialog_inner_text"><span>{VerData.order_name}</span></div>
                          </div>
                          <div>
                              <div className="ver_dialog_text"><span>Send</span></div>
                              <div className="ver_dialog_inner_text" ><span>{VerData.customer_fullname}</span></div>
                          </div>
                          <div>
                              <div className="ver_dialog_text"><span>Sender phone</span></div>
                              <div className="ver_dialog_inner_text"><span>{VerData.customer_phone}</span></div>
                          </div>
                          <div>
                              <div className="ver_dialog_text"><span>Address</span></div>
                              <div className="ver_dialog_inner_text"><span>{VerData.address}</span></div>
                          </div>
                          <div>
                              <div className="ver_dialog_text"><span>Product Description</span></div>
                              <div className="ver_dialog_inner_text"><span>{VerData.order_description}</span></div>
                          </div>
                          <div>
                              <div className="ver_dialog_text"><span>Quantity</span></div>
                              <div className="ver_dialog_inner_text"><span>{VerData.quantity}</span></div>
                          </div>
                          <div>
                              <div className="ver_dialog_text"><span>Weight</span></div>
                              <div className="ver_dialog_inner_text"><span>{VerData.weight}</span></div>
                          </div>
                          <div>
                              <div className="ver_dialog_text"><span>Frieght</span></div>
                              <div className="ver_dialog_inner_text"><span>{VerData.freight}</span></div>
                          </div>
                          <div>
                              <div className="ver_dialog_text"><span>Cost</span></div>
                              <div className="ver_dialog_inner_text"><span>N {VerData.cost}</span></div>
                          </div>
                      </div>
                      {dialogLoder?
                        <Button variant="outlined" className="Ver_button"> 
                          <PulseLoader color={"white"} size={20}/>
                       </Button>
                        :
                        <Button variant="outlined" className="dialog_button"> 
                            Confirm Order
                        </Button>
                      }

                </DialogContent>

            </Dialog>

            
        </>
    );
}


