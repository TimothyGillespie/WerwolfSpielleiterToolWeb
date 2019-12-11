import React from "react";

import Player from "../../classes/player";
import Role from "../../classes/role";

import GamePhasePropsI from "./gamePhaseInterface";
import renderPlayerList from "../../utils/renderPlayerList";
import getAlivePlayers from "../../utils/gameBased/getAlivePlayers";
import getAlivePlayersOfRole from "../../utils/gameBased/getAlivePlayersOfRole";
import getPlayersRole from "../../utils/gameBased/getPlayersRole";

import difference from "../../utils/arrayHandling/difference";
import mapKeysToArray from "../../utils/mapKeysToArray";
import setToArray from "../../utils/setToArray";
import changePlayerRole from "../../utils/gameBased/changePlayerRole";

class EndOfTheNight extends React.Component<GamePhasePropsI> {

    private doppelganger: Player | undefined = getAlivePlayersOfRole(this.props.playersInTheGame, Role.D)[0];
    private seherlehrling: Player | undefined = getAlivePlayersOfRole(this.props.playersInTheGame, Role.SL)[0];
    private priester: Player | undefined = getAlivePlayersOfRole(this.props.playersInTheGame, Role.P)[0];

    async componentDidMount() {

        const playersToKill: Set<Player> = new Set<Player>(this.props.diesTonight);

        // If the priester dies the same night then the person protected can die the same night
        if(this.priester && playersToKill.has(this.priester))
            await this.props.parentSetState({priesterProtected: null});

        // Save players protected by Leibwächter
        if(this.props.protectedThisNight)
            playersToKill.delete(this.props.protectedThisNight)

        // Save players protected by the Priester
        if(this.props.priesterProtected)
            playersToKill.delete(this.props.priesterProtected);

        playersToKill.forEach((dyingPlayer: Player) => this.kill(dyingPlayer));
    }


    render() {
        return <div>

        Heute starben:
        {(this.renderPlayerDiedList())}

        </div>
    }



    private kill(dyingPlayer: Player, checkLovers = true): void {

        const killedRole: Role = getPlayersRole(this.props.playersInTheGame, dyingPlayer)!;

        // Special cases trigger

        // The old man must die twice to die for real. This is his first time.
        // It must appear before Doppelgänger, otherwise there will be two old men at the same time
        if(killedRole === Role.AM && !this.props.oldmanDiedOnce) {
            this.props.parentSetState({oldmanDiedOnce: true});
            return;
        }

        // The Urwolf choose him to become a werwolf so he should turn into one counterclockwise
        // Implement; don't forget to cancel with a return so he won't count as dead

        // The player the Doppelgänger copied died
        if(this.props.doppelgangerCopies === dyingPlayer && this.doppelganger)
            changePlayerRole(
                this.props.playersInTheGame,
                this.doppelganger,
                killedRole
            );

        // The Hexe / Magier died; in which case we will make the potions available again
        // in case the Doppelgänger became one of them
        if(killedRole === Role.HX)
            this.props.parentSetState({hexeGoodPotionAvailable: true, hexeBadPotionAvailable: true});

        if(killedRole === Role.M)
            this.props.parentSetState({magierGoodPotionAvailable: true, magierBadPotionAvailable: true});

        // Old man died twice now and the his variable will be reset in case the Doppelgänger became him
        if(killedRole === Role.AM)
            this.props.parentSetState({oldmanDiedOnce: false});

        // Seherin dies and the Seherlehrling takes her place (if he exists)
        if(killedRole === Role.S && this.seherlehrling)
            changePlayerRole(
                this.props.playersInTheGame,
                this.seherlehrling,
                Role.S
            );

        // Jäger dies and may take someone with him
        // Implement

        // Ritter mit der rostigen Lanze dies and takes the next werwolf counterclockwise from him with him
        // Implement

        // Hater Bursche dies only a night later
        // Implement

        // Wolfsjunges dies and the werwolves may attack twice next night
        // Implement

        // Aussätzige dies and the werwolves may not attack next night
        // Implement



        // One of the lovers dies so the other one dies with the first one
        // The checkLovers flag is used to avoid endless recursion
        if(checkLovers)
            if(this.props.liebende.includes(dyingPlayer))
                this.props.liebende
                    .filter((player: Player) => player !== dyingPlayer)
                    .forEach(
                        (leftLover: Player) => this.kill(leftLover, false)
                    );

        // Finally set the player status to dead
        this.props.playersInTheGame.get(dyingPlayer)!.alive = false;
    }

    private renderPlayerDiedList(): JSX.Element[] {
        const output: JSX.Element[] = [];

        this.props.diesTonight.forEach(
            (dyingPlayer: Player) => {
                output.push(<li>
                    {dyingPlayer.getName()} - {getPlayersRole(this.props.playersInTheGame, dyingPlayer)}
                    </li>);
            }
        );

        return output;
    }


}

export default EndOfTheNight;
