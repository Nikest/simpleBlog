import { storeInterface } from 'Services';

const saveCookie = (token) => {
    const now = new Date();
    now.setTime(now.getTime() + (3600 * 1000));

    document.cookie = `token=${token};expires=${now['toGMTString']()};path=/`;
};

const removeCookie = () => {
    const now = new Date();
    document.cookie = `${document.cookie};expires=${now['toGMTString']()};path=/`;
};

const requestMaker = (url: string, data: object = {empty: true}): Promise<any> => {
    return new Promise<any>((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.onloadend = function () {
            const response = JSON.parse(xhr.response);

            if (xhr.status === 200) {
                res(response);
            } else {
                rej()
            }
        };

        xhr.send(JSON.stringify(data));
    });
};


const authentication = function (authData): Promise<boolean> {
    return requestMaker('/auth', authData)
        .then((response) => {
            saveCookie(response.auth);
            storeInterface().setData('auth', response.auth);

            return response;
        });
};

const registration = function (registrationData): Promise<boolean> {
    return requestMaker('/registration', registrationData)
        .then((response) => {
            saveCookie(response.auth);
            storeInterface().setData('auth', response.auth);
            getAllChannels();
            return response;
        });
};

const logout = function (): Promise<boolean> {
    return requestMaker('/logout')
        .then(res => {
            removeCookie();
            storeInterface().setData('auth', false);

            return res;
        });
};

const getAllChannels = function (): Promise<boolean> {
    return requestMaker('/channels')
        .then(response => {
            storeInterface().setData('channels', response);

            return response;
        });
};

const newPost = function (data): Promise<boolean> {
    return requestMaker('/savepost', data);
};

const allPosts = function (): Promise<boolean> {
    return requestMaker('/allposts')
        .then(response => {
            storeInterface().setData('articles', response.articles);
            storeInterface().setData('currentChannel', false);

            return response;
        });
};

const findPosts = function (channelID): Promise<boolean> {
    return requestMaker('/findposts', channelID)
        .then(response => {
            storeInterface().setData('articles', response.articles);
            storeInterface().setData('currentChannel', response.channel);

            return response;
        });
};

export const serverConnector = {
    authentication,
    registration,
    logout,
    getAllChannels,
    newPost,
    allPosts,
    findPosts
};