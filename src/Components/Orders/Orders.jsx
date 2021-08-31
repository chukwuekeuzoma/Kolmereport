import React, { useState, useEffect } from 'react'
import "./Orders.scss"
// import Dialogbox from '../Dialogbox/Dialogbox';
import { Button } from '@material-ui/core';
import Fade from 'react-reveal/Fade'
import moment from 'moment'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import axios from "axios"
import PulseLoader from "react-spinners/ClipLoader"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        maxHeight: 440,
    },
});


// function useForceUpdate() {
//     const [value, setvalue] = useState(true); // integer state
//     return () => setvalue(!value); // update the state to force render
// }

export default function Orders(props) {
    const classes = useStyles();
    const [orderData, setorderData] = useState([])
    const [Loder, setLoder] = useState(false)
    

    // const forceUpdate = useForceUpdate();

  


    useEffect(() => {
        let Orderdata = true
        setLoder(true)
        axios.get("orders")
            .then(response => {
                if (Orderdata) {
                    setorderData(response.data.data)
                    setLoder(false)
                }
            })
            .catch(e => { if (Orderdata) { console.log(e) } setLoder(false) })
        return () => Orderdata = false
    }, [])

    return (
        <>
            <Fade>
                {/* <Dialogbox Update={forceUpdate}/> */}
                <div>
                    <div className="Hom_text">
                        <span>Orders</span>
                    </div>
                    <div className="Hom_line_container">
                        <div className="Hom_line"></div>
                    </div>
                    <div className="Data_grid_container">
                    {Loder ? <div className="Hom_pluse_container"><PulseLoader color={"#cc7722"} size={30} /></div>
                        :
                        <TableContainer component={Paper} className={classes.table}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S/N</TableCell>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                
                                    <TableBody>
                                        {orderData.slice().reverse().map(({ order_name, created_at, is_processing, id }, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="tb_cell_name">{order_name}</TableCell>
                                                <TableCell type="date">{moment(created_at).format('D/MM/YYYY')}</TableCell>
                                                <TableCell>{is_processing ? "Pending" : "Success"}</TableCell>
                                                <TableCell>
                                                    <Link to={{ pathname: `/ordersdetails/${id}` }} className="links">
                                                        <Button variant="outlined" className="tb_button">
                                                            Details
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                
                            </Table>
                        </TableContainer>}
                    </div>
                </div>
            </Fade>
            
        </>
    );
}

