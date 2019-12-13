import React from "react";
import { Link } from "react-router-dom";

class Navigation extends React.Component<{}, {}> {


    render() {
        return (
            <div className="Navigation">
                <li><Link to="/players">Spieler</Link></li>
                <li><Link to="/game">Spiel</Link></li>
                <li><Link to="/assignRoles">Rollenzuweisung</Link></li>
            </div>
        );
    }
}


export default Navigation;
