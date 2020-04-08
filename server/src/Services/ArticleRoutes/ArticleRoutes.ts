import { Route } from '../../Route';
import { DatabaseInterface } from '../Database';

const dbInterface = new DatabaseInterface();

const saveArticle = new Route('/savepost');
saveArticle.onPost = function (req, res, body) {
    dbInterface.saveArticle(body).then((data) => {
        this.onResponse(res,200, 'text/json', JSON.stringify({save: true}));
    })
};

const allArticle = new Route('/allposts');
allArticle.onPost = function (req, res, body) {
    dbInterface.allArticle().then((data) => {
        this.onResponse(res,200, 'text/json', JSON.stringify({articles: data}));
    })
};

const findArticle = new Route('/findposts');
findArticle.onPost = function (req, res, body) {
    Promise.all<object, object>([dbInterface.findArticle(body.channelID), dbInterface.findChannelName(body.channelID)])
        .then((data) => {
            this.onResponse(res,200, 'text/json', JSON.stringify({articles: data[0], channel: data[1]['channel']}));
        })
};

export { saveArticle, allArticle, findArticle }