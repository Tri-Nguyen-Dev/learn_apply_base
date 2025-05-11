import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import {useCreateSsmSession} from "@/components/terminal/ssm-session";

export function useTerminalSession(terminalRef: any) {
    const socket = ref<WebSocket | null>(null)
    const textDecoder = new TextDecoder()
    const textEncoder = new TextEncoder()

    const { ssm } = useCreateSsmSession()
    const termOptions = {
        rows: 34,
        cols: 197,
        fontFamily: 'Fira Code, courier-new, courier, monospace'
    }

    const initSession = async () => {
        const res = await axios.post('http://127.0.0.1:8000/api/session/create-session-manager')
        const { TokenValue, SessionId, StreamUrl } = res.data

        const ws = new WebSocket(StreamUrl)
        ws.binaryType = 'arraybuffer'
        socket.value = ws

        ws.addEventListener('open', () => {
            ssm.init(ws, {
                token: TokenValue,
                sessionId: SessionId,
                termOptions
            })
        })

        ws.addEventListener('message', (e: MessageEvent) => {
            const msg = ssm.decode(e.data)
            ssm.sendACK(ws, msg)

            if (msg.payloadType === 1) {
                terminalRef.value?.writeToTerminal(textDecoder.decode(msg.payload))
            } else if (msg.payloadType === 17) {
                ssm.sendInitMessage(ws, termOptions)
            }
        })
    }

    const sendText = (data: string) => {
        if (socket.value) {
            ssm.sendText(socket.value, textEncoder.encode(data))
        }
    }

    onMounted(initSession)
    onBeforeUnmount(() => {
        socket.value?.close()
    })

    return { sendText }
}
