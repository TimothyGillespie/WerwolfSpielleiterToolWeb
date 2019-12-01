import React from 'react';
import ReactDOM from 'react-dom';
import Status from "../../classes/status";
import Player from "../../classes/status";

interface State {
    players: Map<Player, Status>;


}

interface Props {

}

class Game extends React.Component<State, Props> {


    // Game variables
    private turnCounter: number = 0;
    private liebende: Player[] = [];
    private mussRaus: Player | null = null;
    private protectedThisNight: Player | null = null;
    private priesterProtected: Player | null = null;
    private prinz: Player | null = null;
    private unruheGestifted: boolean = false;


    private rostigeLanzeRevengeNextNight: boolean = false;
    private harterBurscheDiesNextNight: boolean = false
    private aussaetzigerGetsRoleNextNight: boolean = false;
    private oldmanDiedOnce: boolean = false;

    // Hexentränke
    private hexeGoodPotionAvailable: boolean = true;
    private hexeBadPotionAvailable: boolean = true;

    //Magiertränke
    private magierGoodPotionAvailable: boolean = true;
    private magierBadPotionAvailable: boolean = true;

    }
