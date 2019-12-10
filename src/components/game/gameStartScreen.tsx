import React from "react";
import GamePhasePropsI from "../gamePhases/gamePhaseInterface";

import AmorChoosesLovers from "../gamePhases/amorChoosesLovers";
import DoppelgangerChoses from "../gamePhases/doppelgangerChoses";
import WerwolvesSeeEachOther from "../gamePhases/werwolvesSeeEachOther";
import LeibwachterProtects from "../gamePhases/leibwachterProtects";
import WerwolveChooseKill from "../gamePhases/werwolvesChooseKill";
import UrwolfMayTransform from "../gamePhases/urwolfMayTransform";

class GameStartScreen extends React.Component<GamePhasePropsI, {}> {


    render() {
        return <div>
        Willkommen zum Spiel<br />
        <button onClick={() => this.startGame()}> Starten </button>
        </div>;
    }


    private startGame(): void {
        const firstNight: React.ComponentType<GamePhasePropsI>[] = [
            AmorChoosesLovers,
            DoppelgangerChoses,
            WerwolvesSeeEachOther,
            LeibwachterProtects,
            WerwolveChooseKill,
            // Not yet implemented
            // UrwolfMayTransform,
        ];
        this.props.parentSetState!({upcomingGamePhases: firstNight});
    }
}

export default GameStartScreen;
