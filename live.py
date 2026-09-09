from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
if __name__ == '__main__': ThreadingHTTPServer(('0.0.0.0',8000),SimpleHTTPRequestHandler).serve_forever()
