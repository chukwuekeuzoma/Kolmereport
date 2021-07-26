import React, { useState } from 'react'
import "./Hompage.scss"
import {Button} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import Dialogbox from '../Dialogbox/Dialogbox';
import Fade from 'react-reveal/Fade'

export default function Hompage(props) {
    
    const[Open, setOpen] = useState(false)

    const columns = [ 
        { field: 'id', headerName: "S/N", width: 100 },
        { field: 'requestId', headerName: 'item name', width: 150 },
        { field: 'date', headerName: 'Date', width: 120 },
        { field: 'status', headerName: 'satus', width: 120 },
    ]

    const rows = [
        // { id: 1, requestId: 'none', amount: 'none'},
      ];

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
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>
                
           </div>
        </Fade>
        </>
    );
}

