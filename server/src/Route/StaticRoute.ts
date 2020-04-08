import * as fs from 'fs';
import * as path from 'path';
import { Route } from './Route';

const publicPath = (file: string) => `../staticFiles${file}`;

export class StaticRoute extends Route {
    constructor() {
        super('/');
    }

    onGet(req, res) {

        if (req.url.split('/')[1] === '') {
            const indexFilePath = path.join(__dirname, publicPath('/index.html'));

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            const readStream = fs.createReadStream(indexFilePath);
            readStream.pipe(res);

        } else {
            const filePath = path.join(__dirname, '../staticFiles' + req.url);
            const fileType = req.url.split('.')[1];

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    this.onResponse(res);
                }

                let contentType;
                switch (fileType) {
                    case 'js':
                        contentType = 'application/javascript';
                        break;
                    case 'ttf':
                        contentType = 'font/ttf';
                        break;
                    default:
                        contentType = 'text/plain';
                }

                this.onResponse(res,200, contentType, data);
            });
        }
    }
}