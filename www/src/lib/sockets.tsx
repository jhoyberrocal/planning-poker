import socketIOClient from 'socket.io-client';
export const IO = socketIOClient(process.env.WS_URL as string);

export default IO;
