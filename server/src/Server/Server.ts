const http = require('http');

import {IRoute, Route} from '../Route';

export class Server {
    routes = {};
    static: IRoute;

    addStaticRoute = (route: IRoute) => {
        this.static = route;
    };

    addRoute = (route: IRoute) => {
        this.routes[route.path] = route;
    };

    onRequest = (req, res) => {
        if (req.url.split('/')[1] === '' || req.url.split('.')[1]) {
            this.static.onRequest(req, res);
            return;
        }

        if (this.routes[req.url]) {
            this.routes[req.url].onRequest(req, res);
        } else {
            const close = new Route('');
            close.onResponse(res);
        }
    };

    run = (hostname: string, port: number) => {
        http.createServer(this.onRequest).listen(port, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
}