"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
let NUMERICS = 1;
class RoomManager {
    constructor() {
        console.log("Room Manager Created");
        this.room = new Map();
    }
    addRoom(user1, user2) {
        const roomId = this.generateRoomId().toString();
        this.room.set(roomId, { user1, user2 });
        user1.user.emit("create-offer", {
            roomId
        });
        user2.user.emit("create-offer", {
            roomId
        });
    }
    onOffer(roomId, sdp, senderSocketid) {
        const userRoom = this.room.get(roomId);
        if (!userRoom) {
            return;
        }
        const receivingUser = (senderSocketid === userRoom.user1.user.id) ? userRoom.user2 : userRoom.user1;
        receivingUser.user.emit("offer", {
            roomId,
            sdp
        });
    }
    onAnswer(roomId, sdp, senderSocketid) {
        const userRoom = this.room.get(roomId);
        if (!userRoom) {
            return;
        }
        const receivingUser = (senderSocketid === userRoom.user1.user.id) ? userRoom.user2 : userRoom.user1;
        receivingUser.user.emit("answer", {
            roomId,
            sdp
        });
    }
    onIceCandidates(roomId, iceCandidates, senderSocketid, type) {
        const userRoom = this.room.get(roomId);
        if (!userRoom) {
            return;
        }
        const receivingUser = userRoom.user1.user.id === senderSocketid ? userRoom.user2 : userRoom.user1;
        receivingUser.user.emit("add-ice-candidate", ({ iceCandidates, type }));
    }
    generateRoomId() {
        return NUMERICS++;
    }
}
exports.RoomManager = RoomManager;
