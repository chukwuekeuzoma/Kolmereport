import React from 'react';
import "./Verification.scss"
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fade from 'react-reveal/Fade'


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


    return (
        <>
           <Fade bottom>
                <div className="Ver_container">
                    <div className="Ver_head"><span>Verification</span></div>
                    <div>
                        <form className={classes.root}>
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
                                        // onChange={e => setamount(e.target.value)}
                                    />
                                </div>

                                <div className="Var_text">
                                    <span>
                                        Please provide the six-digit verification<br />
                                        code for item 66664646 to confirm<br />
                                        delivery
                                    </span>
                                </div>

                                <Button variant="outlined" className="Ver_button"> 
                                    Confirm
                                </Button>
                            </div>
                        </form>
                    </div>
                    
                   
                </div>
            </Fade>
        </>
    );
}


