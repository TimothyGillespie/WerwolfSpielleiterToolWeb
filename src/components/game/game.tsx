import React from 'react';
import ReactDOM from 'react-dom';
import Status from "../../classes/status";
import Player from "../../classes/status";
import Role from "../../classes/role";

interface StateI {

}

interface PropsI {
    players: Map<Player, Status>;
}

class Game extends React.Component<StateI, PropsI> {


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



    private getPeopleOfRole(role: Role): Player[] {
        const result: Player[] = [];


        return result;
    }

    }
