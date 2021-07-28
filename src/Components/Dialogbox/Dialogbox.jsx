import React, { useState } from 'react'
import {TextField, Button, Dialog, Slide, DialogContent, DialogActions } from '@material-ui/core';
import { useFormik } from "formik"
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import PulseLoader from "react-spinners/ClipLoader"
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

const validationSchema = yup.object({
    name: yup.string().min(2, "Enter your real name").required("Name required"),
    phone: yup.string().min(11, "Phone required").required("Phone required"),
    // email: yup.string().email("Pls enter a valid email address").required(),
    address: yup.string().required("Address required"),
    productName: yup.string().required("Product required"),
    description: yup.string().required("Description required"),
    quantity: yup.string().required("Quantity required"),
    weight: yup.string().required("Weight required"),
    freight: yup.string().required("Freight required"),
    cost: yup.string().required("Cost required"),

  });

export default function Dialogbox({OpenBox, CloseBox}) {
    const classes = useStyles();
   
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [Loader, setLoader] = useState(false)


    // Adding close on escape for keyboard users.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          CloseBox();
        }
      });


      const onSubmit = async (values) => {
           setLoader(true)
           console.log(values)
        axios.post('https://delivered-demo.herokuapp.com/api/orders/process', values)
          .then(response => {
            if (response.data.status === "success") {
              setSuccess(response.data.message)
              setError("")
            };
            if (response.data.status === "error") {
              setError(response.data.message)
              setSuccess("")
            }
            formik.resetForm();
            setLoader(false)
            // console.log(data.data.message)
          })
          .catch((error) => {
            setError(error.response.data.message)
            setSuccess("")
            setLoader(false)
            // console.error('Error:', error);
          });
      }


      const formik = useFormik({
        initialValues: {
          name: "",
          phone: "",
          address: "",
          productName: "",
          description: "",
          quantity: "",
          weight:"",
          freight:"",
          cost: "",
        },
        onSubmit, 
        validateOnBlur: true,
        validationSchema: validationSchema,
    
      });
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
                         <div className="Alert">
                            {error && <Alert severity="error">{error}</Alert>}
                            {success && <Alert severity="success">{success}</Alert>}
                          </div>
                         <form className={classes.root} onSubmit={formik.handleSubmit}> 
                            <div className="Dia_field_one_container">
                                <div>
                                    <div>
                                        <TextField
                                            size="small"
                                            label="Name"
                                            placeholder="Name"
                                            name="name"
                                            type="name"
                                            variant="outlined"
                                            value={formik.values.name}
                                            // className="account_textfield"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <div className="field_container">
                                        <span className="field">
                                            {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                                        </span>
                                    </div>
                               </div>
                               <div>
                                    <div>
                                         <TextField
                                            size="small"
                                            label="Phone"
                                            placeholder="Phone"
                                            name="phone"
                                            type="phone"
                                            variant="outlined"
                                            className="Phone_textfield"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                    </div>
                                    <div className="field_container">
                                        <span className="field">
                                            {formik.touched.phone && formik.errors.phone? formik.errors.phone : ""}
                                        </span>
                                    </div>
                               </div>
                            </div>
                            <div>
                                <TextField
                                    size="small"
                                    label="Delivery Address"
                                    placeholder="Delivery Address"
                                    name="address"
                                    type="name"
                                    variant="outlined"
                                    className="Delivery_textfield"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="field_container">
                                    <span className="field">
                                        {formik.touched.address && formik.errors.address? formik.errors.address : ""}
                                    </span>
                            </div>
                            <div>
                                <TextField
                                    size="small"
                                    label="Product Name"
                                    placeholder="Product Name"
                                    name="productName"
                                    type="name"
                                    variant="outlined"
                                    className="Product_textfield"
                                    value={formik.values.productName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="field_container">
                                    <span className="field">
                                        {formik.touched.productName && formik.errors.productName? formik.errors.productName : ""}
                                    </span>
                            </div>
                            <div>
                                <TextField
                                    size="small"
                                    label="Product description"
                                    placeholder="Product description"
                                    name="description"
                                    type="name"
                                    variant="outlined"
                                    className="Delivery_textfield"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="field_container">
                                    <span className="field">
                                        {formik.touched.description && formik.errors.description? formik.errors.description : ""}
                                    </span>
                            </div>
                            <div className="Dia_field_one_container">
                                <div>
                                    <div>
                                        <TextField
                                            size="small"
                                            label="Quantity"
                                            placeholder="Quantity"
                                            name="quantity"
                                            type="phone"
                                            variant="outlined"
                                            className="Quantity_textfield"
                                            value={formik.values.quantity}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />

                                    </div>
                                    <div className="field_container">
                                        <span className="field">
                                            {formik.touched.quantity && formik.errors.quantity? formik.errors.quantity : ""}
                                        </span>
                                    </div>
                                 </div>
                                 <div>
                                    <div>
                                        <TextField
                                                size="small"
                                                label="Weight (Kg)"
                                                placeholder="Weight (Kg)"
                                                name="weight"
                                                type="name"
                                                variant="outlined"
                                                className="Weight_textfield"
                                                value={formik.values.weight}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                    </div>
                                    <div className="field_container">
                                        <span className="field">
                                            {formik.touched.weight && formik.errors.weight? formik.errors.weight : ""}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <TextField
                                                size="small"
                                                label="Freight"
                                                placeholder="Freight"
                                                name="freight"
                                                type="phone"
                                                variant="outlined"
                                                className="Freight_textfield"
                                                value={formik.values.freight}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                    </div>
                                    <div className="field_container">
                                        <span className="field">
                                            {formik.touched.freight && formik.errors.freight? formik.errors.freight : ""}
                                        </span>
                                    </div>
                                 </div>
                            </div>
                            <div>
                                <TextField
                                        size="small"
                                        label="Cost"
                                        placeholder="Cost"
                                        name="cost"
                                        type="phone"
                                        variant="outlined"
                                        className="Cost_textfield"
                                        value={formik.values.cost}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                            </div>
                            <div className="field_container">
                                    <span className="field">
                                        {formik.touched.cost && formik.errors.cost? formik.errors.cost : ""}
                                    </span>
                             </div>
                             {Loader?
                                <Button variant="outlined" className="Dialog_button">
                                    <PulseLoader color={"white"} size={30}/>
                                </Button>
                                :
                                <Button variant="outlined" className="Dialog_button" type="submit" disabled={!formik.isValid}>
                                    Submit
                                </Button>
                             }
                         </form>

                     </DialogContent>

                </Dialog>

            </div>
        </> 
    );
}
