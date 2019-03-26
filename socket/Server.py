#! /usr/bin/python3
'''
    Server - listens for connections, accepts data, reverses it, sends back.
'''


import socket


def listen(host, port):

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind((host, port))
        sock.listen()

        print('Listening on %s:%s' % (host, port))

        conn, addr = sock.accept()

        with conn:
            print('Connection from:', addr)

            while True:
                data = conn.recv(1024)

                if not data:
                    break
                else:
                    print('\tReversing:\t%s' % data.decode())
                    data = ''.join(reversed(data.decode()))
                    conn.send(data.encode('utf-8'))

            print('Connection closed to:', addr)


if __name__ == '__main__':

    host = '127.0.0.1'
    port = 9000

    listen(host, port)