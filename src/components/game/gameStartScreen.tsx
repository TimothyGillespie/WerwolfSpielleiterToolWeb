import React from "react";
import GamePhasePropsI from "../gamePhases/gamePhaseInterface";

const GameStartScreen = (props: GamePhasePropsI) => {
    return <div>
    Willkommen zum Spiel
    <button onClick={() => props.nextPhase()}> Starten </button>
    </div>;
}

export default GameStartScreen;
