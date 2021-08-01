import React, { useState, useEffect } from 'react'
import "./Home.scss"
import Dialogbox from '../Dialogbox/Dialogbox';
import { Button } from '@material-ui/core';
import Fade from 'react-reveal/Fade'
import axios from "axios"



export default function Home(props) {

    const [Open, setOpen] = useState(false)
    const [OrderPending, setOrderPending] = useState([])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    console.log(OrderPending)

    useEffect(() => {
        let Orderdata = true
        // setLoder(true)
        axios.get("https://delivered-demo.herokuapp.com/api/orders/processing")
            .then(response => {
                if (Orderdata) {
                    setOrderPending(response.data.data)
                    // setLoder(false)
                }
            })
            .catch(e => { if (Orderdata) { console.log(e) }
            //  setLoder(false) 
            })
        return () => Orderdata = false
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
                                <span className="Home_success_inner">Sucsessful Orders</span>
                                <br/>
                                {/* {OrderPending.map((num) => ( */}
                                <span className="Home_success_inner">47</span>
                                 {/* ))} */}
                            </div>
                            <div className="Home_pending">
                                <span className="Home_pending_inner">Pending Orders</span>
                                <br/>
                                {/* {OrderPending.map(({is_processing}) => ( */}
                                <span className="Home_success_inner">
                                     47
                                    {/* {OrderPending.length} */}
                                    </span>
                                {/* ))} */}
                            </div>
                    </div>
                    <Dialogbox OpenBox={Open} CloseBox={handleClose} />
                </div>
            </Fade>
        </>
    );
}
