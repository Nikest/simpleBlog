import { Server } from './Server';
import { StaticRoute } from './Route';
import {
    authRouter,
    registrationRouter,
    logoutRouter,
    allChannelsRouter,
    saveArticle,
    allArticle,
    findArticle
} from './Services';

const blogMainServer = new Server();

blogMainServer.addStaticRoute(new StaticRoute());
blogMainServer.addRoute(authRouter);
blogMainServer.addRoute(registrationRouter);
blogMainServer.addRoute(logoutRouter);
blogMainServer.addRoute(allChannelsRouter);
blogMainServer.addRoute(saveArticle);
blogMainServer.addRoute(allArticle);
blogMainServer.addRoute(findArticle);

blogMainServer.run('127.0.0.1', 3010);