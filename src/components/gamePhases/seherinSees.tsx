import React from "react";

import GamePhasePropsI from "./gamePhaseInterface";

class SeherinSees extends React.Component<GamePhasePropsI> {
    render() {
        return <div>
            Die Seherin/Seherlehring darf sehen.
            <button onClick={() => this.props.nextPhase()}>Weiter</button>
        </div>
    }
}

export default SeherinSees;
