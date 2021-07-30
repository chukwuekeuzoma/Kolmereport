import React, { useState } from 'react';
import "./Navigation.scss"
import { Link } from "react-router-dom"
import { Dashboard, Notes, Settings, ExitToApp } from '@material-ui/icons';

export default function Navigation(props) {
    const [NavClass, setNavClass] = useState("main")

    const DashClass = () => {
        setNavClass("Dash")
    }

    const VerClass = () => {
        setNavClass("verclass")
    }

    const Order = () => {
        setNavClass("Order")
    }

    return (
        <>
            <div className="NAV_container">
                <Link to={{ pathname: "/" }} className="links">
                    <div className={NavClass === "Dash" ? "NAV_Dashboard_Click" : "NAV_Dashboard"} onClick={DashClass}>
                        <Dashboard className="DashboardIcon" />
                        <span>Dashboard<span style={{ opacity: "0" }}>.</span></span>
                    </div>
                </Link>
                <Link to={{ pathname: "/orders" }} className="links">
                    <div className={NavClass === "Order" ? "NAV_Notes_click" : "NAV_Notes"} onClick={Order}>
                        <Notes className="NotesIcon" />
                        <span>Orders<span style={{ opacity: "0" }}>........</span></span>
                    </div>
                </Link>
                <Link to={{ pathname: "/verification" }} className="links">
                    <div className={NavClass === "verclass" ? "NAV_Notes_click" : "NAV_Notes"} onClick={VerClass}>
                        <Notes className="NotesIcon" />
                        <span>Verification<span style={{ opacity: "0" }}>.</span></span>
                    </div>
                </Link>
            </div>

            <div className="NAV_container_two">
                <div className="NAV_settings">
                    <Settings className="SettingsIcon" />
                    <span>Settings<span style={{ opacity: "0" }}>......</span></span>
                </div>
                <div className="NAV_Exit">
                    <ExitToApp className="ExitIcon" />
                    <span>Logout<span style={{ opacity: "0" }}>........</span></span>
                </div>

            </div>
        </>
    );
}

