class Player {
    id: number;
    name: string;


    constructor(player: {playerID: number, name: string}) {
        this.id = player.playerID;
        this.name = player.name;
    }

    public getID(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}

export default Player;
