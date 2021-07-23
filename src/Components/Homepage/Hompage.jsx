import React from 'react';
import "./Hompage.scss"
import {Button} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

export default function Hompage(props) {
    
    const columns = [
        { field: 'id', headerName: "S/N", width: 100 },
        { field: 'requestId', headerName: 'item name', width: 150 },
        { field: 'date', headerName: 'Date', width: 120 },
        { field: 'status', headerName: 'satus', width: 120 },
    ]

    const rows = [
        // { id: 1, requestId: 'none', amount: 'none'},
      ];
    return (
        <>
          <div>
                <div className="Hom_container">
                    <div>
                        <span>Orders</span>
                    </div>
                    <Button variant="outlined" className="Hom_button"> 
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
        </>
    );
}

