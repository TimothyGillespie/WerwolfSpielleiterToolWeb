import Role from "./role";

class Status {
    alive: boolean = true
    role: Role;

    constructor(role: Role) {
        this.role = role;
    }
}

export default Status;
