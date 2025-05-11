// Converted TypeScript version
import sha256 from './sha256';

const ACK_TYPE = 3;
const INPUT_TYPE = 1; // const OUTPUT_TYPE = 0;

let messageSequenceNumber = 0;

export function buildAgentMessage(
    payload: string | Uint8Array,
    messageType: string,
    sequenceNumber: number,
    payloadType: number,
    flags: number
) {
    return {
        headerLength: 116,
        messageType,
        schemaVersion: 1,
        createdDate: new Date().getTime(),
        sequenceNumber,
        flags,
        messageId: generateUuid(),
        payloadDigest: generateDigest(payload),
        payloadType,
        payloadLength: payload.length,
        payload,
    };
}

export function parseUuid(buf: Uint8Array): string {
    const part1 = [...buf.slice(8, 12)].map(b => formatNum(b.toString(16))).join('');
    const part2 = [...buf.slice(12, 14)].map(b => formatNum(b.toString(16))).join('');
    const part3 = [...buf.slice(14, 16)].map(b => formatNum(b.toString(16))).join('');
    const part4 = [...buf.slice(0, 2)].map(b => formatNum(b.toString(16))).join('');
    const part5 = [...buf.slice(2, 8)].map(b => formatNum(b.toString(16))).join('');
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

function formatNum(num: string): string {
    return ('0' + num).slice(-2);
}

function generateUuid(): Uint8Array {
    const result = new Uint8Array(16);
    const uuid = uuidv4().split('-');
    const toBytes = (hex: string): number[] => hex.match(/.{1,2}/g)!.map(b => parseInt(b, 16));
    [8, 12, 14, 0, 2].forEach((start, i) => {
        const bytes = toBytes(uuid[i]);
        result.set(bytes, start);
    });
    return result;
}

function generateDigest(data: string | Uint8Array | any): string {
    return sha256(data).substring(0, 32);
}

export function agentMessageToBuffer(payload: ReturnType<typeof buildAgentMessage>): Uint8Array {
    const buf = new Uint8Array(116 + payload.payload.length + 4);
    putInt(buf, payload.headerLength, 0);
    putString(buf, payload.messageType, 4, 32);
    putInt(buf, payload.schemaVersion, 36);
    putLong(buf, payload.createdDate, 40);
    putLong(buf, payload.sequenceNumber, 48);
    putLong(buf, payload.flags, 56);
    putByteArray(buf, payload.messageId, 64);
    putString(buf, payload.payloadDigest, 80);
    putInt(buf, payload.payloadType, 112);
    putInt(buf, payload.payloadLength, 116);
    typeof payload.payload === 'string'
        ? putString(buf, payload.payload, 120)
        : putByteArray(buf, payload.payload, 120);
    return buf;
}

function putInt(buf: Uint8Array, data: number, offset: number): void {
    const byteArray = intToByteArray(data);
    buf.set(byteArray, offset);
}

function putLong(buf: Uint8Array, data: number, offset: number): void {
    const byteArray = longToByteArray(data);
    buf.set(byteArray, offset);
}

function putString(buf: Uint8Array, data: string, offset: number, maxLength?: number): void {
    const fill = (buf: Uint8Array, start: number, count: number, value: number = 0) => {
        for (let i = 0; i < count; i++) buf[start + i] = value;
    };

    if (maxLength) {
        const diff = maxLength - data.length;
        fill(buf, offset, diff);
        for (let i = 0; i < maxLength; i++) {
            buf[offset + i] = data[i - diff]?.charCodeAt(0) ?? 0;
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            buf[offset + i] = data[i]?.charCodeAt(0) ?? 0;
        }
    }
}

function putByteArray(buf: Uint8Array, data: Uint8Array, offset: number): void {
    for (let i = 0; i < data.length; i++) {
        buf[offset + i] = data[i];
    }
}

function longToByteArray(long: number): number[] {
    const byteArray = new Array(8).fill(0);
    for (let i = 7; i >= 0; i--) {
        byteArray[i] = long & 0xff;
        long = (long - byteArray[i]) / 256;
    }
    return byteArray;
}

function intToByteArray(int: number): number[] {
    const byteArray = new Array(4).fill(0);
    for (let i = 3; i >= 0; i--) {
        byteArray[i] = int & 0xff;
        int = (int - byteArray[i]) / 256;
    }
    return byteArray;
}

function getInt(buf: Uint8Array): number {
    return buf.slice(0, 4).reduce((acc, val, i) => acc + (val << ((3 - i) * 8)), 0);
}

function getString(buf: Uint8Array): string {
    return Array.from(buf).map(b => String.fromCharCode(b)).join('');
}

function getLong(buf: Uint8Array): number {
    return buf.reduce((acc, val, i) => acc + val * Math.pow(256, buf.length - 1 - i), 0);
}

function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const ssm = {
    decode: function (buffer: any) {
        /*
        var buf = new Uint8Array([
        0x00,0x00,0x00,0x74,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x69,0x6e,0x70,0x75,0x74,0x5f,0x73,0x74,0x72,0x65,0x61,0x6d,0x5f,0x64,0x61,0x74,0x61,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x1e,0x5b,0x37,0xe2,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x73,0x0f,0x66,0x49,0x14,0x53,0x4e,0x2a,0x9f,0x01,0xa3,0x7d,0xbf,0xfe,0xfc,0xe1,0x65,0x34,0x34,0x33,0x36,0x35,0x62,0x39,0x35,0x31,0x31,0x36,0x32,0x65,0x64,0x61,0x36,0x34,0x61,0x63,0x65,0x66,0x64,0x32,0x37,0x35,0x37,0x32,0x32,0x30,0x39,0x65,0x00,0x00,0x00,0x03,0x00,0x00,0x00,0x16,0x7b,0x22,0x63,0x6f,0x6c,0x73,0x22,0x3a,0x32,0x30,0x32,0x2c,0x22,0x72,0x6f,0x77,0x73,0x22,0x3a,0x31,0x38,0x7d]);
        console.log(buf);
        */
        const buf = new Uint8Array(buffer);
        const agentMessage = {
            headerLength: getInt(buf.slice(0, 4)),
            //4
            messageType: getString(buf.slice(4, 36)).trim(),
            //32
            schemaVersion: getInt(buf.slice(36, 40)),
            //4
            createdDate: getLong(buf.slice(40, 48)),
            //8
            sequenceNumber: getLong(buf.slice(48, 56)),
            //8
            flags: getLong(buf.slice(56, 64)),
            //8
            messageId: parseUuid(buf.slice(64, 80)),
            //16
            payloadDigest: getString(buf.slice(80, 112)),
            //32
            payloadType: getInt(buf.slice(112, 116)),
            //4
            payloadLength: getInt(buf.slice(116, 120)),
            //4
            payload: buf.slice(120, buf.byteLength)
        };
        const res = buf.slice(120, buf.byteLength);
        let charList = "";

        for (let i = 0; i < res.length; i++) {
            charList += String.fromCharCode(res[i]);
        }

        return agentMessage;
    },

    init: function (connection: any, data: any) {
        messageSequenceNumber = 0;
        connection.send(ssm.buildTokenMessage(data.token));
        connection.send(ssm.buildInitMessage(data.termOptions));
    },

    sendInitMessage: function (connection: any, termOptions: any) {
        connection.send(ssm.buildInitMessage(termOptions));
    },

    buildTokenMessage: function (token: any) {
        return JSON.stringify({
            MessageSchemaVersion: "1.0",
            RequestId: uuidv4(),
            TokenValue: token
        });
    },

    buildInitMessage: function (options: any) {
        const payload = {
            cols: options.cols,
            rows: options.rows
        };
        const initMessage = buildAgentMessage(JSON.stringify(payload), "input_stream_data", messageSequenceNumber, ACK_TYPE, 1);
        return agentMessageToBuffer(initMessage);
    },

    buildAcknowledge: function (messageType: any, sequenceNumber: any, messageID: any) {
        const payload = {
            AcknowledgedMessageType: "output_stream_data",
            AcknowledgedMessageId: messageID,
            AcknowledgedMessageSequenceNumber: sequenceNumber,
            IsSequentialMessage: true
        };
        const ackMessage = buildAgentMessage(JSON.stringify(payload), "acknowledge", sequenceNumber, ACK_TYPE, 0);
        return agentMessageToBuffer(ackMessage);
    },

    buildInputMessage: function (text: any, sequenceNumber: any) {
        const inputMessage = buildAgentMessage(text, "input_stream_data", sequenceNumber, INPUT_TYPE, sequenceNumber == 1 ? 0 : 1);
        return agentMessageToBuffer(inputMessage);
    },

    sendACK: function (connection: any, agentMessage: any) {
        connection.send(ssm.buildAcknowledge(agentMessage.messageType, agentMessage.sequenceNumber, agentMessage.messageId));
    },

    sendText: function (connection: any, text: any, sequenceNum?: any) {
        if (typeof sequenceNum === "undefined") {
            messageSequenceNumber++;
            connection.send(ssm.buildInputMessage(text, messageSequenceNumber));
        } else {
            connection.send(ssm.buildInputMessage(text, sequenceNum));
        }
    }
};
