import { Route } from '../../Route';
import { DatabaseInterface } from '../Database';

const authRouter = new Route('/auth');
const registrationRouter = new Route('/registration');
const logoutRouter = new Route('/logout');

const dbInterface = new DatabaseInterface();

interface IRegistration {
    login?: string;
    channel?: string;
    password?: string;
}

authRouter.onPost = function (req, res, body) {
    dbInterface.findUser(body.login).then((user) => {
        if (user.password === body.password) {
            const token = Buffer.from(JSON.stringify(user)).toString('base64');
            this.onResponse(res,200, 'text/json', JSON.stringify({auth: token}));
            return;
        }
        this.onResponse(res,401, 'text/json', JSON.stringify({auth: false}));
    }).catch(() => this.onResponse(res,401, 'text/json', JSON.stringify({auth: false})));
};

registrationRouter.onPost = function (req, res, body) {
    dbInterface.newUser(body)
        .then((data) => {
            const token = Buffer.from(JSON.stringify(data)).toString('base64');
            this.onResponse(res,200, 'text/json', JSON.stringify({auth: token}))
        })
        .catch(() => {
            this.onResponse(res,400, 'text/json', JSON.stringify({auth: false}))
        });
};

logoutRouter.onPost = function (req, res) {
    this.onResponse(res,200, 'text/json', JSON.stringify({auth: false}));
};

export { authRouter, registrationRouter, logoutRouter }