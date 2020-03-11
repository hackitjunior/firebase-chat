import {User} from './user';

export class Message {
    messsage: string;
    createAt: Date;
    sender: User;

    constructor({message, createAt, sender}) {
        this.messsage = message;
        this.createAt = createAt;
        this.sender = new User(sender);
    }
}
