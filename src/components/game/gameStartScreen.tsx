import React from "react";
import GamePhasePropsI from "../gamePhases/gamePhaseInterface";

import AmorChoosesLovers from "../gamePhases/amorChoosesLovers";

class GameStartScreen extends React.Component<GamePhasePropsI, {}> {


    render() {
        return <div>
        Willkommen zum Spiel
        <button onClick={() => this.startGame()}> Starten </button>
        </div>;
    }


    private startGame(): void {
        const firstNight: React.ComponentType<GamePhasePropsI>[] = [AmorChoosesLovers /*, DoppelgangerChooses, WerwolvesSeeEachOther*/];
        this.props.parentSetState!({upcomingGamePhases: firstNight});
    }
}

export default GameStartScreen;
