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

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxHeight: 440,
    },
  });

//   function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];

export default function Hompage(props) {
     const classes = useStyles();
     const[Open, setOpen] = useState(false)
     const [orderData, setorderData] = useState([])

      const handleClose = () => {
        setOpen(false);
      };

        const handleOpen = () => {
            setOpen(true);
        };

        useEffect(() => {
            let Orderdata = true
            axios.get("https://delivered-demo.herokuapp.com/api/orders")
                .then(response => {
                    if (Orderdata) {
                        setorderData(response.data.data)
                        // setBankDetails(response.data.data)
                    }
                })
                .catch(e => { if (Orderdata) { console.log(e) } })
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
                    {/* <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection /> */}
                    <TableContainer component={Paper} className={classes.table}>
                        <Table  stickyHeader aria-label="sticky table">
                            <TableHead>
                            <TableRow>
                                <TableCell>S/N</TableCell>
                                <TableCell>item name</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {orderData.map(({order_name, created_at, is_processing}, index ) => (
                                // <a href="row.link" style={{textDecoration:"none"}}>
                                <TableRow key={generate()}>
                                    <TableCell component="th" scope="row">
                                        {generate()}
                                    </TableCell>
                                    <TableCell>{order_name}</TableCell>
                                     <TableCell type="date">{moment(created_at).format('D/MM/YYYY')}</TableCell>
                                    <TableCell>{is_processing?"pending":"success"}</TableCell>
                                </TableRow>
                                // </a>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                
           </div>
        </Fade>
        </>
    );
}

