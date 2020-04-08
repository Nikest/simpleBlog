import * as React from 'react';

import { cd, storeInjector } from 'Services';


interface IHeaderProps {

}


interface IHeaderState {
    channelName: string;
}

@cd(() => require('./Header.scss'))
export class Header extends React.Component<IHeaderProps, IHeaderState> {
    state = {
        channelName: 'Select channel'
    };

    render(c?) {
        const { channelName } = this.state;
        return (
            <header className={c('container')}>
                <h1 className={c('title')}>Simple Blog</h1>
                <h2 className={c('blog-name')}>{ channelName }</h2>
            </header>
        )
    }

    @storeInjector(['currentChannel'], true)
    onChannelChange({ currentChannel }) {
        this.setState({
            channelName: currentChannel
        })
    }
}



