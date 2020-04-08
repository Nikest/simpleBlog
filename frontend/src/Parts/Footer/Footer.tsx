import * as React from 'react';

import { sl } from 'Services';


interface IFooterProps {

}


export const Footer = function({}:IFooterProps) {
    const c = sl(() => require('./Footer.scss'));

    return (
        <footer className={c('container')}>Footer</footer>
    )
};


