"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const RoomManager_1 = require("./RoomManager");
class UserManager {
    constructor() {
        this.users = [];
        this.queue = [];
        this.room = new RoomManager_1.RoomManager();
    }
    addUser(name, user) {
        this.users.push({ name, user });
        this.queue.push(user.id);
        user.emit("lobby");
        this.clearQueue();
    }
    removeUser(userId) {
        const user = this.users.find(x => x.user.id === userId);
        this.users = this.users.filter(x => x.user.id !== userId);
        this.queue = this.queue.filter(x => x === userId);
    }
    clearQueue() {
        if (this.queue.length < 2) {
            return;
        }
        const id1 = this.queue.pop();
        const id2 = this.queue.pop();
        console.log("id is " + id1 + " " + id2);
        const user1 = this.users.find(x => x.user.id === id1);
        const user2 = this.users.find(x => x.user.id === id2);
        if (!user1 || !user2) {
            return;
        }
        this.room.addRoom(user1, user2);
        this.clearQueue();
    }
    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.room.onOffer(roomId, sdp, socket.id);
        });
        socket.on("answer", ({ sdp, roomId }) => {
            this.room.onAnswer(roomId, sdp, socket.id);
        });
        socket.on("add-ice-candidate", ({ candidate, roomId, type }) => {
            this.room.onIceCandidates(roomId, socket.id, candidate, type);
        });
    }
}
exports.UserManager = UserManager;
