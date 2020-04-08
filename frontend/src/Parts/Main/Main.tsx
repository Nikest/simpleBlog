import * as React from 'react';
import {cd, storeInjector, serverConnector, modalService, storeInterface} from 'Services';
import { ArticlePreview, IArticlePreview, Settings, ArticleView } from 'Components';

interface IMainProps {

}

interface IChannel {
    channel: string;
    ID: string;
}

interface IMainState {
    articles?: IArticlePreview[]
    channels: IChannel[];
}

@cd(() => require('./Main.scss'))
export class Main extends React.Component<IMainProps, IMainState> {
    state = { articles: null, channels: [] };

    render(c?) {
        const { articles, channels } = this.state;

        return (
            <main className={c('container')}>
                <div>
                    <p className={c('block-header')}>All channels</p>
                    <section className={c('section')}>
                        <div className={c('channel')} onClick={this.getAllArticles}>All articles</div>
                        {
                            channels.map(ch => <div className={c('channel')} onClick={this.switchChannel(ch.ID)}>{ ch.channel }</div>)
                        }
                    </section>
                </div>

                <div>
                    <p className={c('block-header')}>All articles</p>

                    <section className={c('section')}>
                        {
                            articles && articles.map(a => {
                                return (
                                    <div className={c('article-prev')} onClick={this.openArticle(a)}>
                                        <ArticlePreview pic={a.image} title={a.title} description={a.descr}/>
                                    </div>
                                )
                            })
                        }
                    </section>
                </div>

                <div>
                    <p className={c('block-header')}>Profile settings</p>
                    <section className={c('section')}>
                        <Settings/>
                    </section>
                </div>
            </main>
        )
    }

    @storeInjector(['channels'], true)
    onChannels({ channels }) {
        this.setState({channels})
    }

    @storeInjector(['articles'], true)
    onArticles({ articles }) {
        this.setState({ articles: articles.reverse() })
    }

    componentDidMount(): void {
        serverConnector.getAllChannels();
        serverConnector.allPosts().then(data => console.log(data))
    }

    switchChannel = (id) => () => { serverConnector.findPosts({ channelID: id }) };

    getAllArticles = () => {
        serverConnector.allPosts();
    };

    openArticle = (article) => () => modalService.open(<ArticleView title={article.title} descr={article.descr} image={article.image} post={article.post}/>)
}
