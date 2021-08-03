import React, { useState, useEffect } from 'react'
import "./Home.scss"
import Dialogbox from '../Dialogbox/Dialogbox';
import { Button } from '@material-ui/core';
import Fade from 'react-reveal/Fade'
import PulseLoader from "react-spinners/ClipLoader"
import axios from "axios"



export default function Home(props) {

    const [Open, setOpen] = useState(false)
    const [OrderPending, setOrderPending] = useState([])
    const [OrderSucessful, setOrderSucessful] = useState([])
    const [PendingLoader, setPendingLoader] = useState(false)
    const [SucessLoader, setSucessLoader] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        let PendingData = true
        setPendingLoader(true)
        axios.get("https://delivered-demo.herokuapp.com/api/orders/processing")
            .then(response => {
                if ( PendingData) {
                    setOrderPending(response.data.data)
                    setPendingLoader(false)
                }
            })
            .catch(e => { if (PendingData) { console.log(e) }
             setPendingLoader(false) 
            })
        return () =>  PendingData = false
    }, [])

    useEffect(() => {
        let SucessData = true
        setSucessLoader(true)
        axios.get("https://delivered-demo.herokuapp.com/api/orders/closed")
            .then(response => {
                if ( SucessData) {
                    setOrderSucessful(response.data.data)
                    setSucessLoader(false)
                }
            })
            .catch(e => { if (SucessData) { console.log(e) }
             setSucessLoader(false) 
            })
        return () =>  SucessData = false
    }, [])

    return (
        <>
            <Fade top>
                <div>
                    <div className="Home_container">
                        <div>
                            <span>Home</span>
                        </div>
                        <Button variant="outlined" className="Home_button" onClick={handleOpen}>
                            New Order
                        </Button>
                    </div>
                    <div className="Home_line_container">
                        <div className="Home_line"></div>
                    </div>
                    <div className="Home_process_container">
                            <div className="Home_success_order">
                                <div  className="Home_success_inner">Successful Orders</div>
                                
                                <div className="Home_success_inner_main">
                                    <div>
                                       {SucessLoader?<PulseLoader color={"white"} size={25} />
                                        :
                                        OrderSucessful.length}
                                    </div>
                                </div>
                            </div>
                            <div className="Home_pending_order">
                                <div className="Home_pending_inner">Pending Orders</div>
                                   
                                    <div className="Home_pending_inner_main">
                                        <div>
                                            {PendingLoader?<PulseLoader color={"white"} size={25} />
                                            :
                                            OrderPending.length}
                                        </div>
                                    </div>
                            </div>
                    </div>
                    <Dialogbox OpenBox={Open} CloseBox={handleClose} />
                </div>
            </Fade>
        </>
    );
}
