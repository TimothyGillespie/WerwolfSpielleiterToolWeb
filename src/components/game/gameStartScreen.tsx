import React from "react";
import GamePhasePropsI from "../gamePhases/gamePhaseInterface";

import AmorChoosesLovers from "../gamePhases/amorChoosesLovers";
import DoppelgangerChoses from "../gamePhases/doppelgangerChoses";
import WerwolvesSeeEachOther from "../gamePhases/werwolvesSeeEachOther";

class GameStartScreen extends React.Component<GamePhasePropsI, {}> {


    render() {
        return <div>
        Willkommen zum Spiel
        <button onClick={() => this.startGame()}> Starten </button>
        </div>;
    }


    private startGame(): void {
        const firstNight: React.ComponentType<GamePhasePropsI>[] = [
            AmorChoosesLovers,
            DoppelgangerChoses,
            WerwolvesSeeEachOther,
        ];
        this.props.parentSetState!({upcomingGamePhases: firstNight});
    }
}

export default GameStartScreen;
