import * as React from 'react';

import { sl } from 'Services';

export interface IArticlePreview {
    pic: string;
    title: string;
    description: string;
}

interface IArticlePreviewProps extends IArticlePreview {

}

export const ArticlePreview = function({ pic, title, description}:IArticlePreviewProps) {
    const c = sl(() => require('./ArticlePreview.scss'));

    const background = { backgroundImage: `url(${pic})` };

    return (
        <article className={c('container')}>
            <div className={c('pic')} style={background}/>

            <p className={c('title')}>{title}</p>
            <span className={c('description')}>{description}</span>
        </article>
    )
};

