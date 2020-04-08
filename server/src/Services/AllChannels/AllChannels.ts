import { Route } from '../../Route';
import { DatabaseInterface } from '../Database';
const dbInterface = new DatabaseInterface();

const allChannelsRouter = new Route('/channels');

allChannelsRouter.onPost = function (req, res, body) {
    dbInterface.getAllUsers().then((allchannels) => {
        const channels = allchannels.map((cn) => {
            return {
                channel: cn.channel,
                ID: cn.ID
            }
        });
        this.onResponse(res,200, 'text/json', JSON.stringify(channels));
    })
};

export { allChannelsRouter }