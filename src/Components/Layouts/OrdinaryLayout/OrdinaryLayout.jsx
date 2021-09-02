import React from "react";
import "./OrdinaryLayout.scss";
import Navigation from "../../NavigationBar/Navigation";

export default function OrdinaryLayout(props) {
  return (
    <>
      <div className="ORl_container">
        <div className="ORl_Navigation">
          <Navigation />
        </div>
        <div className="ORl_children">{props.children}</div>
      </div>
    </>
  );
}
