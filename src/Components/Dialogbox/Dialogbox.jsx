import React from 'react';
import {TextField, Button, Dialog, Slide, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "./Dialogbox.scss"

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

export default function Dialogbox({OpenBox, CloseBox}) {
    const classes = useStyles();

    return (
        <>
            <div>
                <Dialog
                   open={OpenBox}
                   TransitionComponent={Transition}
                   keepMounted
                   onClose={CloseBox}
                   aria-labelledby="alert-dialog-slide-title"
                   aria-describedby="alert-dialog-slide-description"
                   BackdropProps={{
                    classes: {
                      root: classes.backDrop,
                    },
                    }}
                >
                     <DialogActions>
                        <Button onClick={CloseBox} variant="outlined" >
                                X
                        </Button>
                     </DialogActions>
                     <DialogContent style={{ width: "420px", height: "auto"}}>
                         <form className={classes.root}> 
                            <div className="Dia_field_one_container">
                                <div>
                                    <TextField
                                        size="small"
                                        label="Name"
                                        placeholder="Name"
                                        // id="amount"
                                        type="name"
                                        variant="outlined"
                                        // className="account_textfield"
                                        // onChange={e => setamount(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        size="small"
                                        label="Phone"
                                        placeholder="Phone"
                                        // id="amount"
                                        type="phone"
                                        variant="outlined"
                                        className="Phone_textfield"
                                        // onChange={e => setamount(e.target.value)}
                                    />

                                </div>
                            </div>
                            <div>
                                <TextField
                                    size="small"
                                    label="Delivery Address"
                                    placeholder="Delivery Address"
                                    // id="amount"
                                    type="name"
                                    variant="outlined"
                                    className="Delivery_textfield"
                                    // onChange={e => setamount(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    size="small"
                                    label="Product Name"
                                    placeholder="Product Name"
                                    // id="amount"
                                    type="name"
                                    variant="outlined"
                                    className="Product_textfield"
                                    // onChange={e => setamount(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    size="small"
                                    label="Product description"
                                    placeholder="Product description"
                                    // id="amount"
                                    type="name"
                                    variant="outlined"
                                    className="Delivery_textfield"
                                    // onChange={e => setamount(e.target.value)}
                                />
                            </div>
                            <div className="Dia_field_one_container">
                                <div>
                                    <TextField
                                        size="small"
                                        label="Quantity"
                                        placeholder="Quantity"
                                        // id="amount"
                                        type="name"
                                        variant="outlined"
                                        className="Quantity_textfield"
                                        // onChange={e => setamount(e.target.value)}
                                    />

                                </div>
                                <div>
                                    <TextField
                                            size="small"
                                            label="Weight (Kg)"
                                            placeholder="Weight (Kg)"
                                            // id="amount"
                                            type="name"
                                            variant="outlined"
                                            className="Weight_textfield"
                                            // onChange={e => setamount(e.target.value)}
                                        />

                                </div>
                                 <div>
                                    <TextField
                                            size="small"
                                            label="Freight"
                                            placeholder="Freight"
                                            // id="amount"
                                            type="name"
                                            variant="outlined"
                                            className="Freight_textfield"
                                            // onChange={e => setamount(e.target.value)}
                                        />
                                </div>
                            </div>
                            <div>
                                <TextField
                                        size="small"
                                        label="Cost"
                                        placeholder="Cost"
                                        // id="amount"
                                        type="name"
                                        variant="outlined"
                                        className="Cost_textfield"
                                        // onChange={e => setamount(e.target.value)}
                                    />
                            </div>
                            <Button variant="outlined" className="Dialog_button">
                                Submit
                           </Button>
                         </form>

                     </DialogContent>

                </Dialog>

            </div>
        </> 
    );
}
