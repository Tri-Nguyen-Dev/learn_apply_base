import { ref } from "vue";

export function useSocket() {
    const ws = ref<any>()

    const connectSocket = () => {
        return new Promise(function(resolve, reject) {
            const url = 'wss://echo.websocket.org'

            const server = new WebSocket(url);

            server.onopen = function() {
                resolve(server);
            };

            server.onerror = function(err) {
                reject(err);
            };
        });
    }

    const closeSocket = async () => {
        ws.value.close()

        ws.value.onclose = function(message: any) {
            console.log('close socket', message)
        }
    }

    return {
        ws,
        connectSocket,
        closeSocket
    }
}