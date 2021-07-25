import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Logo from "../../Images/logo.png"
import "./Preloder.scss"


const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 5,
      borderRadius: 5,
      width:"30%",
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#cc7722',
    },
  }))(LinearProgress);
  

export default function Preloder({Progress}) {
   
    return (
        <>
         <div className="Preloder_main_container">
            <div className="Preloder_container">
               <div><img src={Logo} alt="load" className="Logo" height="20px"/></div>
               <div className="Preloder_writeup"><span>Your trusted logistic and <br/>reporting system.</span></div>
               <BorderLinearProgress variant="determinate" value={Progress}/>
            </div>
          </div>
        </>
    );
}
