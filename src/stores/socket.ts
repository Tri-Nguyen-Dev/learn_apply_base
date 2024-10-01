import { defineStore } from 'pinia';

interface SOCKET {
    socket: WebSocket | null
}

export const useMessageStore = defineStore('socket', {
    state: (): SOCKET => ({
        socket: null,
    }),
    actions: {
        connect(url: string) {
            if (!this.socket) {
                this.socket = new WebSocket(url);
            }
        },
        disconnect() {
            if (this.socket) {
                this.socket.close();
                this.socket = null;
            }
        },
    },
});