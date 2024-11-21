import { io } from "socket.io-client";

class SocketService {
    socket;

    setUpSocketConnection() {
        // CONNECTION TO SERVER
        this.socket = io(import.meta.env.VITE_REACT_APP_BASE_ENDPOINT, {
            transports: ["websocket"],
            secure: true
        });

        this.socketConnectoinEvent();
    }

    socketConnectoinEvent() {
        this.socket.on("connect", () => {
            console.log("Connected to the socket server");
        });

        this.socket.on("disconnect", (reason) => {
            console.log("Disonnected. REASON:", reason);
            this.socket.connect();
        });

        this.socket.on("error", (err) => {
            console.log("ERROR. REASON:", err);
            this.socket.connect();
        });
    }
}

export const socketService = new SocketService();
