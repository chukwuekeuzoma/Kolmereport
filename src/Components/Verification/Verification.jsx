import React, { useState, useEffect } from 'react';
import "./Verification.scss"
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Fade from 'react-reveal/Fade'
import axios from "axios"
import PulseLoader from "react-spinners/ClipLoader"


const useStyles = makeStyles({

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
    // const [verData, setverData] = useState([])
    const [verLoader, setverLoader] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
  

    const codedata = {
        code
    }
     
    console.log(codedata)

    const SubmitCode = (e) => {
        e.preventDefault();
        let dataCheck = true
        setverLoader(true)
        axios.get(`https://delivered-demo.herokuapp.com/api/orders/confirm`,codedata)
            .then(response => {
                if (dataCheck) {
                    if (response.data.status === "success") {
                        // setverData(response.data.data)
                        setverLoader(false) 
                        setSuccess(response.data.message)
                        setError("")
                      };

                      if (response.data.status === "error") {
                        setError(response.data.message)
                        setverLoader(false) 
                        setSuccess("")
                      }
                   
                }
            })
            .catch(e => { if (dataCheck) { console.log(e) } 
              setError(e.response.data.message)
              setSuccess("")
              setverLoader(false) })
        return () => dataCheck = false
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
                                        // id="amount"
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
                                {verLoader?
                                <Button variant="outlined" className="Ver_button"> 
                                    <PulseLoader color={"white"} size={20}/>
                                </Button>
                                :
                                <Button variant="outlined" className="Ver_button" type="submit" disabled={!code}> 
                                    Confirm
                                </Button>

                                }
                            </div>
                        </form>
                    </div>
                    
                   
                </div>
            </Fade>
        </>
    );
}


