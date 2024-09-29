import { ref } from "vue";

export function useSocket() {
    const ws = ref<any>()


    const initSocket = (url: string, token?: string) => {
        return new Promise(function(resolve, reject) {
            const server = new WebSocket(url);

            server.onopen = function() {
                resolve(server);
            };

            server.onerror = function(err) {
                reject(err);
            };
        });
    }

    const connectSocket = async (url = 'wss://echo.websocket.org', token?: string) => {
        try {
            ws.value = await initSocket(url, token)
        } catch (e) {
            throw e
        }
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