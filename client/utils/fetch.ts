import socket from './socket';

export function fetch (event: string, data = {}): Promise<Array<any>> {
  return new Promise((resolve) => {
    socket.emit(event, data, (res: any) => {
      resolve([null, res]);
    });
  });
}
