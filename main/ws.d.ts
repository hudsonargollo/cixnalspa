// Minimal ambient declaration for the 'ws' package, which ships without bundled
// type declarations in this project. Kept deliberately small to avoid pulling in
// @types/node resolution details; explicit members match the ws API used here.
declare module 'ws' {
  import { EventEmitter } from 'node:events';

  export interface Address {
    address: string;
    family: string;
    port: number;
  }

  export interface WebSocket extends EventEmitter {
    readonly readyState: number;
    address: Address;
    ping(data?: string | Buffer, mask?: boolean): boolean;
    pong(data?: string | Buffer, mask?: boolean): boolean;
    close(code?: number, reason?: string): void;
    send(data: string | Buffer, cb?: (err?: Error) => void): boolean;
    terminate(): void;
    on(event: 'close', listener: (this: WebSocket) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'message', listener: (data: string | Buffer, flags?: BufferEncoding | { encoding?: BufferEncoding | null; copy?: boolean; final?: boolean }) => void): this;
    on(event: 'ping', listener: (data: string | Buffer, mask: boolean) => void): this;
    on(event: 'pong', listener: (data: string | Buffer, mask: boolean) => void): this;
    on(event: 'close', listener: (code: number, reason: Buffer) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
  }

  export interface WebSocketServer extends EventEmitter {
    server: import('http').Server;
    clients: WebSocket[];
    maxPayload: number;
    dropConnection(ws: WebSocket, ...args: any[]): void;
    authorize?(req: import('http').IncomingMessage, callback: (result: boolean) => void): void;
    on(event: 'connection', listener: (socket: WebSocket, request: import('http').IncomingMessage) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
  }

  export const WebSocket: {
    readonly CONNECTING: number;
    readonly OPEN: number;
    readonly CLOSING: number;
    readonly CLOSED: number;
    new (options: any, webSocketFactory?: ((options: any, prototype: any) => any) | undefined): WebSocket;
  };

  export const WebSocketServer: {
    new (options?: any, callback?: () => void): WebSocketServer;
  };
}
