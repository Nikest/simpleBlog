import * as React from 'react';

import { sl, serverConnector, modalService } from 'Services';


interface INewPostProps {
    channelID: string
}


export const NewPost = function({ channelID }:INewPostProps) {
    const c = sl(() => require('./NewPost.scss'));

    const postData = {
        ID: channelID,
    };

    const saveData = (field) => (e) => postData[field] = e.target.value;

    const sendData = () => {
        serverConnector.newPost(postData).then(res => {
            modalService.open(<div>Post saved!</div>);
            serverConnector.allPosts().then(data => console.log(data))
        })
    };

    return (
        <article className={c('container')}>
            <label className={c('section title')}>
                <input type={'text'} placeholder={'Enter title'} onInput={saveData('title')}/>
            </label>

            <label className={c('section descr')}>
                <textarea placeholder={'Enter description'} onInput={saveData('descr')}/>
            </label>

            <label className={c('section image')}>
                <input type={'text'} placeholder={'Image url address: http://...'} onInput={saveData('image')}/>
            </label>

            <label className={c('section post')}>
                <textarea placeholder={'Write your post'} onInput={saveData('post')}/>
            </label>

            <button className={c('button')} onClick={sendData}>Publication</button>
        </article>
    )
};
