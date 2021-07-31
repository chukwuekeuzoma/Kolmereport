import React, { useState, useEffect } from 'react'
import "./Home.scss"
import Dialogbox from '../Dialogbox/Dialogbox';
import { Button } from '@material-ui/core';
import Fade from 'react-reveal/Fade'



export default function Home(props) {

    const [Open, setOpen] = useState(false)

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
                            <div>R</div>
                            <div>B</div>
                    </div>
                    <Dialogbox OpenBox={Open} CloseBox={handleClose} />
                </div>
            </Fade>
        </>
    );
}
