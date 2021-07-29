import React, { useState, useEffect } from 'react';
import "./Orders.scss";
import Fade from 'react-reveal/Fade'
import {Button} from '@material-ui/core';
import {useParams} from "react-router-dom"
import axios from "axios"


export default function Orders(props) {
        
    const [orderDetails, setorderDetails] = useState([])
    const [Dloader, setDloder] = useState(false)

    const {id} = useParams(); 

    console.log(orderDetails)
    useEffect(() => {
        let Orderdata = true
        setDloder(true)
        axios.get(`https://delivered-demo.herokuapp.com/api/orders/${id}`)
            .then(response => {
                if (Orderdata) {
                    orderDetails(response.data.data)
                    setDloder(false) 
                    // setBankDetails(response.data.data)
                }
            })
            .catch(e => { if (Orderdata) { console.log(e) } setDloder(false) })
        return () => Orderdata = false
    }, [id])

    return (
        <>
            <Fade>
                <div className="Order_container">
                    <div>
                        <div className ="Or_header_text"><span>Product Name</span></div>
                        <div className="product_Name"><span>Some product name goes here</span></div>
                        <div className="Or_Sender_container">
                            <div>
                                <div className ="Or_header_text"><span>Sender name</span></div>
                                <div className="font_size"><span>John Doe</span></div>
                            </div>
                            <div>
                                <div className ="Or_header_text"><span>Sender phone</span></div>
                                <div className="font_size"><span>+2348144045239</span></div>
                            </div>
                        </div>
                        <div className="margin_buttom">
                            <div className ="Or_header_text"><span>Address</span></div>
                            <div className="font_size"><span>112 Osborne Road, Ikon, Lagos Nigeria</span></div>
                        </div>
                        <div>
                            <div className ="Or_header_text"><span>Product Description</span></div>
                            <div className="font_size"><span>Some Product description that sapns well</span></div>
                        </div>
                        <div className="Or_qauntity_container">
                            <div>
                                <div className ="Or_header_text"><span>Quantity</span></div>
                                <div className="font_size"><span>12344</span></div>
                            </div>
                            <div>
                                <div className ="Or_header_text"><span>Weight</span></div>
                                <div className="font_size"><span>1233kg</span></div>
                            </div>
                            <div>
                                <div className ="Or_header_text"><span>Frieght</span></div>
                                <div className="font_size"><span>6677w</span></div>
                            </div>
                        </div>
                        <div>
                            <div className ="Or_header_text"><span>Cost</span></div>
                            <div className="font_size"><span>N 23,343,444.55</span></div>
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
