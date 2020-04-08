interface IRequestParse {
    method?: string;
    url?: string;
}

export interface IRoute {
    path: string;
    onRequest: (req, res) => void;
    onGet: (req, res) => void;
    onPost: (req, res, body) => void;
}

export class Route implements IRoute {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    onRequest(req, res) {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                this.onPost(req, res, JSON.parse(body));
            });
            return;
        }

        if (req.method === 'GET') {
            this.onGet(req, res);
            return;
        }
    }

    onGet(req, res) {
        return this.onResponse(res);
    }

    onPost(req, res, body) {
        return this.onResponse(res);
    }

    onResponse(res, status = 404, contentType = 'text/plain', data?) {
        res.statusCode = status;
        res.setHeader('Content-Type', contentType);
        res.end(data || `Page not exist`);
    }
}