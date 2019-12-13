import Role from "./role";

class Status {
    alive: boolean = true
    role: Role = Role.DB;

    constructor(role: Role) {
        this.role = role;
    }
}

export default Status;
