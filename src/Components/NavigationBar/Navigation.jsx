import React from 'react';
import "./Navigation.scss"
import {Link} from "react-router-dom"
import {Dashboard, Notes, Settings, ExitToApp} from '@material-ui/icons';

export default function Navigation(props) {
    return (
        <>
            <div className="NAV_container">
                <Link to={{ pathname: "/" }} className="links">
                    <div className="NAV_Dashboard">
                        <Dashboard className="DashboardIcon"/>
                        <span>Dashboard<span style={{ opacity: "0" }}>.</span></span>
                    </div>
                </Link>
                <div className="NAV_Notes">
                    <Notes className="NotesIcon"/>
                    <span>Orders<span style={{ opacity: "0" }}>........</span></span>
                </div>
                <Link to={{ pathname: "/verification" }} className="links">
                    <div className="NAV_Notes">
                        <Notes className="NotesIcon"/>
                        <span>Verification<span style={{ opacity: "0" }}>.</span></span>
                    </div>
                </Link>
                {/* <div className="NAV_Notes">
                    <Notes className="NotesIcon"/>
                    <span>Some Label</span>
                </div> */}
            </div>
             
             <div className="NAV_container_two">
                 <div className="NAV_settings">
                     <Settings className="SettingsIcon"/>
                     <span>Settings<span style={{ opacity: "0" }}>......</span></span>
                 </div>
                 <div className="NAV_Exit">
                     <ExitToApp className="ExitIcon"/>
                     <span>Logout<span style={{ opacity: "0" }}>........</span></span>
                 </div>
                  
             </div>
        </>
    );
}

