import React, { useState, useEffect } from 'react';
import "./OrderDetails.scss"
import Fade from 'react-reveal/Fade'
import {Button} from '@material-ui/core';
import {useParams} from "react-router-dom"
import axios from "axios"
import PulseLoader from "react-spinners/ClipLoader"
import moment from 'moment'
// import QrCode from "../../Images/Qrcode.png"


export default function OrdersDetails(props) {
        
    const [orderDetails, setorderDetails] = useState([])
    const [Dloader, setDloder] = useState(false)

    const {id} = useParams(); 

    useEffect(() => {
        let Orderdata = true
        setDloder(true)
        axios.get(`https://delivered-demo.herokuapp.com/api/orders/${id}`)
            .then(response => {
                if (Orderdata) {
                    setorderDetails(response.data.data)
                    setDloder(false) 
                }
            })
            .catch(e => { if (Orderdata) { console.log(e) } setDloder(false) })
        return () => Orderdata = false
    }, [id])

    return (
        <>
            <Fade>
                {Dloader?
                <div className="Or_pluse_container">
                   <PulseLoader color={"#cc7722"} size={30} />
                </div>
                
                :
                <div className="Order_container">
                    <div>
                        <div className ="Or_header_text"><span>Product Name</span></div>
                        <div className="product_Name"><span>{orderDetails.order_name}</span></div>
                        <div className="Or_Sender_container">
                            <div>
                                <div className ="Or_header_text"><span>Customer Name</span></div>
                                <div className="font_size"><span>{orderDetails.customer_fullname}</span></div>
                            </div>
                            <div>
                                <div className ="Or_phone_text"><span>Customer Phone</span></div>
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
                        <div className="Dlivery_date_container">
                            <div>
                                <div className ="Or_header_text"><span>Cost</span></div>
                                <div className="font_size"><span>N {orderDetails.cost}</span></div>
                            </div>
                            <div>
                                <div className ="Or_header_text"><span>Delivery Date</span></div>
                                <div className="font_size"><span>
                                    {
                                        orderDetails.is_processing === true?
                                          <div>In Transit</div>
                                        :
                                        moment(orderDetails.updated_at).format('D/MM/YYYY')
                                    }
                                </span></div>
                            </div>
                        </div>
                    </div>
                    <div className="Or_button_container">
                        <div>
                            <div className="box"><img 
                               src={`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=https://kolmereport.web.app/#/ordersdetails/${id}`}
                            // src={QrCode}
                            
                            alt="load" height="160px"/></div>
                        </div>
                        {orderDetails.is_processing?
                        <Button variant="outlined" className="Or_button"> 
                            ORDER PROCESSING 
                        </Button>
                        :
                        <Button variant="outlined" className="Or_button"> 
                            DELIVERY SUCCESSFUL
                        </Button>
                        } 
                    </div>
                </div>
                }
            </Fade>
        </>
    );
}
