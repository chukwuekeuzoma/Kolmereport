import React, { useState } from 'react'
import "./Hompage.scss"
import {Button} from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';
import Dialogbox from '../Dialogbox/Dialogbox';
import Fade from 'react-reveal/Fade'
import {Table, TableBody, TableCell,TableContainer,TableHead,TableRow, Paper, makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

export default function Hompage(props) {
     const classes = useStyles();
    const[Open, setOpen] = useState(false)


    // const columns = [ 
    //     { field: 'id', headerName: "S/N", width: 100 },
    //     { field: 'requestId', headerName: 'item name', width: 150 },
    //     { field: 'date', headerName: 'Date', width: 120 },
    //     { field: 'status', headerName: 'satus', width: 120 },
    // ]

    // const rows = [
    //     { id: 1, requestId: 'none', date: 'none' , status:'none'},
    //     { id: 2, requestId: 'Martins', date: '20/21/1995' , status:'pending'},
    //     { id: 3, requestId: 'Henry', date: '20/21/1996' , status:'susessful'},
    //     { id: 4, requestId: 'Chisom', date: '20/21/1997' , status:'none'},
    //     { id: 5, requestId: 'none', date: 'none' , status:'none'},
    //   ];

      const handleClose = () => {
        setOpen(false);
      };

        const handleOpen = () => {
            setOpen(true);
        };

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
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                // <a href="row.link" style={{textDecoration:"none"}}>

                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
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

