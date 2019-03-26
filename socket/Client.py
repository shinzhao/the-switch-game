#! /usr/bin/python3
'''
    Client - calls server, opens file, sends server data line by line.
'''


import socket


def connect(host, port):

    with open('input.txt', 'rt') as infile:
        lines = infile.read().split('\n')

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((host, port))
        print('Connected to %s:%s' % (host, port))

        for line in lines[:-1]:

            print('\tSending:\t%s' % line)
            sock.send(line.encode('utf-8'))

            data = sock.recv(1024)
            print('\tReceived:\t%s' % data.decode())

    print('Finished, connection closed.')


if __name__ == '__main__':

    host = '127.0.0.1'
    port = 9000

    connect(host, port)