import * as React from 'react';

import { sl } from 'Services';


interface IArticleViewProps {
    title: string;
    descr: string;
    image: string;
    post: string;
}


export const ArticleView = function({ title, descr, image, post }:IArticleViewProps) {
    const c = sl(() => require('./ArticleView.scss'));

    const background = { backgroundImage: `url(${image})` };

    return (
        <article className={c('container')}>
            <div className={c('image')} style={background}/>

            <h1 className={c('section title')}>{ title }</h1>

            <span className={c('section description')}>{ descr }</span>

            <p className={c('section post')}>{ post }</p>
        </article>
    )
};


