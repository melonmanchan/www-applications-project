import sys
import SimpleHTTPServer
import SocketServer

class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    pass

Handler.extensions_map['.wasm'] = 'application/wasm'

try:
    httpd = SocketServer.TCPServer(('', 8000), Handler)
    print("Server running on port 8000")
    httpd.serve_forever()
except KeyboardInterrupt:
    httpd.shutdown()
    sys.exit()
