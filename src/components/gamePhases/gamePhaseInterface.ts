import Player from "../../classes/player";
import Status from "../../classes/status";

interface GamePhasePropsI {
    parentSetState(newState: any): void;
    nextPhase(): void;

    playersInTheGame: Map<Player, Status>;

    // Game variables
    diesTonight: Set<Player>;

    turnCounter: number;
    liebende: Player[];
    mussRaus: Player | null;
    protectedThisNight: Player | null;
    priesterProtected: Player | null;
    prinz: Player | null;
    unruheGestifted: boolean;


    rostigeLanzeRevengeNextNight: boolean;
    harterBurscheDiesNextNight: boolean;
    aussaetzigerGetsRoleNextNight: boolean;
    oldmanDiedOnce: boolean;

    // Hexentränke
    hexeGoodPotionAvailable: boolean;
    hexeBadPotionAvailable: boolean;

    //Magiertränke
    magierGoodPotionAvailable: boolean;
    magierBadPotionAvailable: boolean;

    doppelgangerCopies: Player | null;
}

export default GamePhasePropsI;
