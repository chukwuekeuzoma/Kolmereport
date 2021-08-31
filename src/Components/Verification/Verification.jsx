import React, { useState } from 'react';
import "./Verification.scss"
import { TextField, Button, Dialog, Slide, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Fade from 'react-reveal/Fade'
import axios from "axios"
import PulseLoader from "react-spinners/ClipLoader"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({

    backDrop: {
        backdropFilter: "blur(3px)",
        position: "relative"
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


export default function Verification(props) {
    const classes = useStyles();
    const [code, setcode] = useState("")
    const [verId, setverId] = useState([])
    const [VerData, setVerData] = useState([])
    const [verLoader, setverLoader] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [OpenConfrimDialog, setOpenConfrimDialog] = useState(false)
    const [orderSuccess, setorderSucess] = useState("")
    const [orderError, setorderError] = useState("")
    const [dialogLoder, setdialogLoder] = useState(false)



    const codedata = {
        code
    }

    const CloseDialog = () => {
        setOpenConfrimDialog(false);
    };

    const OpenDialog = () => {
        setOpenConfrimDialog(true);
    };




    const SubmitCode = (e) => {
        e.preventDefault();
        let dataCheck = true
        setverLoader(true)
        axios.post('orders/confirm', codedata)
            .then(response => {
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
                        setError(response.data.message)
                        setverLoader(false)
                        setSuccess("")
                    }

                }
            })
            .catch(e => {
                if (dataCheck) { console.log(e) }
                setError(e.response.data.message)
                setSuccess("")
                setverLoader(false)
            })
        return () => dataCheck = false
    }



    const onConfirmCode = () => {
        let Orderdata = true
        setdialogLoder(true)
        axios.patch(`orders/confirm/${verId}`)
            .then(response => {
                if (Orderdata) {
                    if (response.data.status === "success") {
                        setorderSucess(response.data.message)
                        setorderError("")
                        setdialogLoder(false)
                    };

                    if (response.data.status === "error") {
                        setorderError(response.data.message)
                        setdialogLoder(false)
                        setorderSucess("")
                    }

                }
            }).catch(e => {
                if (Orderdata) { console.log(e) }
                setorderError(e.response.data.message)
                setorderSucess("")
                setdialogLoder(false)
            })
    }

    return (
        <>
            <Fade bottom>
                <div className="Ver_container">
                    <div>
                        <div className="Ver_Alert">
                            {error && <Alert severity="error">{error}</Alert>}
                            {success && <Alert severity="success">{success}</Alert>}
                        </div>
                        <form className={classes.root} onSubmit={SubmitCode}>
                            <div className="Ver_container_two">
                                <div>
                                    <TextField
                                        label="Code"
                                        placeholder="Code"
                                        name="code"
                                        type="phone"
                                        variant="outlined"
                                        className="Ver_textfield"
                                        onChange={e => setcode(e.target.value)}
                                    />
                                </div>

                                <div className="Var_text">
                                    <span>
                                        Please provide the verification<br />
                                        code sent to confirm<br />
                                        delivery
                                    </span>
                                </div>
                                {verLoader ?
                                    <Button variant="outlined" className="Ver_button">
                                        <PulseLoader color={"white"} size={27} />
                                    </Button>
                                    :
                                    <Button variant="outlined" className="Ver_button" type="submit"
                                        disabled={!code}
                                    >
                                        View Order
                                    </Button>
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
                <DialogContent style={{ width: "auto", height: "auto" }}>
                    <div className="ver_dialog_alert">
                        {orderError && <Alert severity="error">{orderError}</Alert>}
                        {orderSuccess && <Alert severity="success">{orderSuccess}</Alert>}
                    </div>
                    <div className="ver_dialog_text_container">
                         <div>
                            <div className ="ver_header_text"><span>Product Name</span></div>
                            <div className="ver_product_Name"><span>{VerData.order_name}</span></div>
                            <div className="ver_Sender_container">
                                <div>
                                    <div className ="ver_header_text"><span>Customer Name</span></div>
                                    <div className="ver_font_size"><span>{VerData.customer_fullname}</span></div>
                                </div>
                                <div>
                                    <div className ="ver_phone_text"><span>Customer Phone</span></div>
                                    <div className="ver_font_size_phone"><span>{VerData.customer_phone}</span></div>
                                </div>
                            </div>
                            <div className="ver_margin_buttom">
                                <div className ="ver_header_text"><span>Address</span></div>
                                <div className="ver_font_size"><span>{VerData.address}</span></div>
                            </div>
                            <div>
                                <div className ="ver_header_text"><span>Product Description</span></div>
                                <div className="ver_font_size"><span>{VerData.order_description}</span></div>
                            </div>
                            <div className="ver_qauntity_container">
                                <div>
                                    <div className ="ver_header_text"><span>Quantity</span></div>
                                    <div className="ver_font_size"><span>{VerData.quantity}</span></div>
                                </div>
                                <div>
                                    <div className ="ver_header_text"><span>Weight</span></div>
                                    <div className="ver_font_size"><span>{VerData.weight}</span></div>
                                </div>
                                <div>
                                    <div className ="ver_header_text"><span>Frieght</span></div>
                                    <div className="ver_font_size"><span>{VerData.freight}</span></div>
                                </div>
                            </div>
                            <div>
                                <div className ="ver_header_text"><span>Cost</span></div>
                                <div className="ver_font_size"><span>N {VerData.cost}</span></div>
                            </div>
                         </div>
                        
                         <div>
                            <div className="ver_box"><img 
                               src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=https://delivered-demo.herokuapp.com/api/orders/confirm/${verId}`}
                            // src={QrCode}
                            
                            alt="load" height="150px"/></div>
                        </div>

                        

                    </div>
                    {dialogLoder ?
                        <Button variant="outlined" className="dialog_button">
                            <PulseLoader color={"white"} size={20} />
                        </Button>
                        :
                        <Button variant="outlined" className="dialog_button" onClick={onConfirmCode}>
                            Confirm Order
                        </Button>
                    }

                </DialogContent>

            </Dialog>


        </>
    );
}


