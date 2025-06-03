import { User } from "./UserManager";

type Room = {
    user1 : User,
    user2 : User
}

let NUMERICS = 1;

export class RoomManager {

    private room : Map<string, Room>;

    constructor(){
        console.log("Room Manager Created")
        this.room = new Map();
    }

    addRoom(user1 : User, user2 : User){
        const roomId : string = this.generateRoomId().toString();
        this.room.set(roomId, { user1, user2});

        user1.user.emit("create-offer", {
            roomId
        })

        user2.user.emit("create-offer", {
            roomId
        })
    }

    onOffer(roomId: string, sdp: string, senderSocketid: string){
        const userRoom = this.room.get(roomId);
        if(!userRoom){
            return;
        }
        
        const receivingUser = (senderSocketid === userRoom.user1.user.id ) ? userRoom.user2 : userRoom.user1;

        receivingUser.user.emit("offer", {
            roomId,
            sdp
        })
    }

    onAnswer(roomId : string, sdp : string, senderSocketid : string){
        const userRoom = this.room.get(roomId);
        if(!userRoom){
            return;
        }
        
        const receivingUser = (senderSocketid === userRoom.user1.user.id ) ? userRoom.user2 : userRoom.user1;

        receivingUser.user.emit("answer", {
            roomId,
            sdp
        })        
    }

    onIceCandidates(roomId : string, iceCandidates : any, senderSocketid : string,  type: "sender" | "receiver"){
        const userRoom = this.room.get(roomId);
        if(!userRoom){
            return;
        }
        
        const receivingUser = userRoom.user1.user.id === senderSocketid ? userRoom.user2: userRoom.user1;
        receivingUser.user.emit("add-ice-candidate", ({iceCandidates, type}));     
    }

    generateRoomId(){
        return NUMERICS++;
    }

}