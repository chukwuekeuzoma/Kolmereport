import React, { useState, useEffect } from 'react';
import "../OrderDetails/OrderDetails.scss"
import Fade from 'react-reveal/Fade';
import {Button} from '@material-ui/core';
import {useParams} from "react-router-dom";
import axios from "axios";

export default function OrderDetailsConfirmation(props) {

    const [orderDetails, setorderDetails] = useState([])
    const [Dloader, setDloder] = useState(false)

    const {token} = useParams();
    
   

    useEffect(() => {
        let Orderdata = true
        setDloder(true)
        axios.get(`https://delivered-demo.herokuapp.com/api/orders/confirm/${token}`)
            .then(response => {
                if (Orderdata) {
                    setorderDetails(response.data.data)
                    setDloder(false) 
                }
            })
            .catch(e => { if (Orderdata) { console.log(e) } setDloder(false) })
        return () => Orderdata = false
    }, [token])

    return (
        <>
            <Fade>
                <div className="Order_container">
                    <div>
                        <div className ="Or_header_text"><span>Product Name</span></div>
                        <div className="product_Name"><span>{orderDetails.order_name}</span></div>
                        <div className="Or_Sender_container">
                            <div>
                                <div className ="Or_header_text"><span>Sender name</span></div>
                                <div className="font_size"><span>{orderDetails.customer_fullname}</span></div>
                            </div>
                            <div>
                                <div className ="Or_phone_text"><span>Sender phone</span></div>
                                <div className="font_size_phone"><span>{orderDetails.customer_phone}</span></div>
                            </div>
                        </div>
                        <div className="margin_buttom">
                            <div className ="Or_header_text"><span>Address</span></div>
                            <div className="font_size"><span>{orderDetails.address}</span></div>
                        </div>
                        <div>
                            <div className ="Or_header_text"><span>Product Description</span></div>
                            <div className="font_size"><span>{orderDetails.order_description}</span></div>
                        </div>
                        <div className="Or_qauntity_container">
                            <div>
                                <div className ="Or_header_text"><span>Quantity</span></div>
                                <div className="font_size"><span>{orderDetails.quantity}</span></div>
                            </div>
                            <div>
                                <div className ="Or_header_text"><span>Weight</span></div>
                                <div className="font_size"><span>{orderDetails.weight}</span></div>
                            </div>
                            <div>
                                <div className ="Or_header_text"><span>Frieght</span></div>
                                <div className="font_size"><span>{orderDetails.freight}</span></div>
                            </div>
                        </div>
                        <div>
                            <div className ="Or_header_text"><span>Cost</span></div>
                            <div className="font_size"><span>N {orderDetails.cost}</span></div>
                        </div>
                    </div>
                    <div className="Or_button_container">
                        <div>
                            <div className="box">

                            </div>
                        </div>
                        <Button variant="outlined" className="Or_button"> 
                            Confirm Order
                        </Button>
                    </div>
                </div>
            </Fade>
        </>
    );
}
