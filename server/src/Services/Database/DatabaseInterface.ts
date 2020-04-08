import * as mongoose from 'mongoose';

mongoose.connect('mongodb://mongo/blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error => console.log(error));

const db = mongoose.connection;
db.once('open', function() {
    console.log('DATABASE connection success');
});

interface IUser {
    login: string,
    channel: string,
    password: string,
    ID: string
}

const userSchema = new mongoose.Schema({
    login: String,
    channel: String,
    password: String,
    ID: String
});

const User = mongoose.model('User', userSchema);

const articleSchema = new mongoose.Schema({
    ID: String,
    title: String,
    descr: String,
    image: String,
    post: String,
});

const Article = mongoose.model('Article', articleSchema);

interface IDatabaseInterface {
    newUser: (userdata: object) => Promise<IUser>;
    findUser: (login: string) => Promise<IUser>;
    getAllUsers: () => Promise<IUser[]>;
}

export class DatabaseInterface implements IDatabaseInterface {
    newUser(userData): Promise<IUser> {
        return new Promise((res, rej) => {
            const newUser = new User({...userData, ID: Math.random().toString(32)});

            newUser.save((err, data) => {
                if (err) {
                    rej();
                    return;
                }

                res(data);
            })
        })
    }

    findUser(login): Promise<IUser> {
        return new Promise((res, rej) => {
            User.find({ login }, (err, user) => {
                if (err) {
                    rej();
                    return;
                }

                res(user[0]);
            });
        })
    }

    findChannelName(ID): Promise<IUser> {
        return new Promise((res, rej) => {
            User.find({ ID }, (err, user) => {
                if (err) {
                    rej();
                    return;
                }

                res(user[0]);
            });
        })
    }

    getAllUsers(): Promise<IUser[]> {
        return new Promise((res, rej) => {
            User.find((err, user) => {
                if (err) {
                    rej();
                    return;
                }

                res(user);
            });
        })
    }

    saveArticle(articleData): Promise<object[]> {
        return new Promise((res, rej) => {
            const newArticle = new Article(articleData);

            newArticle.save((err, data) => {
                if (err) {
                    rej();
                    return;
                }

                res(data);
            })
        })
    }

    allArticle(): Promise<object[]> {
        return new Promise((res, rej) => {
            Article.find((err, articles) => {
                if (err) {
                    rej();
                    return;
                }

                res(articles);
            });
        })
    }

    findArticle(channelID): Promise<object[]> {
        return new Promise((res, rej) => {
            Article.find({ID: channelID},(err, articles) => {
                if (err) {
                    rej();
                    return;
                }

                res(articles);
            });
        })
    }
}