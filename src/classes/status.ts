import Role from "./role";

class Status {
    alive: boolean = true
    role: Role;

    // Hexe attributes
    goodPotionAvailable: boolean = true;
    badPotionAvailable: boolean = true;

    constructor(role: Role) {
        this.role = role;
    }
}

export default Status;
