import React, { useState, useEffect } from 'react'
import "./Hompage.scss"
import {Button} from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';
import Dialogbox from '../Dialogbox/Dialogbox';
import Fade from 'react-reveal/Fade'
import {generate} from "shortid"
import moment from 'moment'
import {Table, TableBody, TableCell,TableContainer,TableHead,TableRow, Paper, makeStyles} from '@material-ui/core';
import axios from "axios"
import PulseLoader from "react-spinners/ClipLoader"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxHeight: 440,
    },
  });

export default function Hompage(props) {
     const classes = useStyles();
     const [Open, setOpen] = useState(false)
     const [orderData, setorderData] = useState([])
     const [Loder, setLoder] = useState(false)

      const handleClose = () => {
        setOpen(false);
      };

        const handleOpen = () => {
            setOpen(true);
        };

        useEffect(() => {
            let Orderdata = true
            setLoder(true)
            axios.get("https://delivered-demo.herokuapp.com/api/orders")
                .then(response => {
                    if (Orderdata) {
                        setorderData(response.data.data)
                        setLoder(false) 
                        // setBankDetails(response.data.data)
                    }
                })
                .catch(e => { if (Orderdata) { console.log(e) } setLoder(false) })
            return () => Orderdata = false
        }, [])

    return (
        <>
        <Fade top>
           <div>
               <Dialogbox OpenBox={Open} CloseBox={handleClose}/>
                <div className="Hom_container">
                    <div>
                        <span>Orders</span>
                    </div>
                    <Button variant="outlined" className="Hom_button" onClick={handleOpen}> 
                        New Order
                    </Button>
                </div>
                <div className="Hom_line_container">
                   <div className="Hom_line"></div>
                </div>
                <div className="Data_grid_container">
                    <TableContainer component={Paper} className={classes.table}>
                        <Table  stickyHeader aria-label="sticky table">
                            <TableHead>
                            <TableRow>
                                <TableCell>S/N</TableCell>
                                <TableCell>item name</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                            </TableHead>
                            {Loder?<div className="Hom_pluse_container"><PulseLoader color={"#cc7722"} size={30}/></div> 
                            :
                            <TableBody>
                            {orderData.map(({order_name, created_at, is_processing, id}, index ) => (
                                // <Link to={{ pathname: `/Orders/:${id}`}} className="links">
                                    <TableRow key={generate()}>
                                        <TableCell component="th" scope="row">
                                            {generate()}
                                        </TableCell>
                                        <TableCell>{order_name}</TableCell>
                                        <TableCell type="date">{moment(created_at).format('D/MM/YYYY')}</TableCell>
                                        <TableCell>{is_processing?"pending":"success"}</TableCell>
                                        <TableCell>
                                            <Link to={{ pathname: `/ordersdetails/:${id}`}} className="links">
                                                <Button variant="outlined" className="tb_button"> 
                                                    Details 
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                /* </Link> */
                            ))}
                            </TableBody>
                             }
                        </Table>
                    </TableContainer>
                </div>
                
           </div>
        </Fade>
        </>
    );
}

