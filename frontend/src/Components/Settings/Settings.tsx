import * as React from 'react';

import { cd, serverConnector, storeInjector, tokenParser, modalService } from 'Services';
import { NewPost } from 'Components';

interface ISettingsProps {

}


interface ISettingsState {
    functional: number;
    auth: string;
}

@cd(() => require('./Settings.scss'))
export class Settings extends React.Component<ISettingsProps, ISettingsState> {
    state = {
        functional: 0,
        auth: ''
    };

    fields = {};

    render(c?) {
        const { functional, auth } = this.state;

        if (auth) {
            const token = tokenParser(auth);

            return (
                <section className={c('container')}>
                    <p className={c('title')}>Hello, { token.login }</p>

                    <div className={c('button')}>{ token.channel }</div>
                    <br/>
                    <div className={c('button')} onClick={this.newPost(token.ID)}>New post</div>
                    <br/>
                    <div className={c('button')} onClick={this.logout}>Logout</div>
                </section>
            )
        }

        return (
            <section className={c('container')}>
                <div className={c('buttons')}>
                    <div className={c('button')} onClick={this.changeFunctional(0)}>Sign in</div>
                    <div className={c('button')} onClick={this.changeFunctional(1)}>Registration</div>
                </div>

                <p className={c('title')}>{ functional ? 'Registration form:' : 'SignIn form:'}</p>

                {
                    functional ?
                        (
                            <>
                                <div className={c('form')}>
                                    <input type="text" placeholder={'login'} autoComplete={'off'} onInput={this.dataToField('login')}/>
                                    <input type="text" placeholder={'Channel name'} autoComplete={'off'} onInput={this.dataToField('channel')}/>
                                    <input type="password" placeholder={'Password'} autoComplete={'off'} onInput={this.dataToField('password')}/>
                                </div>
                                <div className={c('button')} onClick={this.registration}>Registration</div>
                            </>
                        ) :
                        (
                            <>
                                <div className={c('form')}>
                                    <input type="text" placeholder={'login'} autoComplete={'off'} onInput={this.dataToField('login')}/>
                                    <input type="password" placeholder={'Password'} autoComplete={'off'} onInput={this.dataToField('password')}/>
                                </div>
                                <div className={c('button')} onClick={this.login}>Next</div>
                            </>
                        )
                }
            </section>
        )
    }

    dataToField = (field: string) => (e) => {
        this.fields[field] = e.target.value;
    };

    @storeInjector(['auth'])
    onAuth({ auth }) {
        this.setState({ auth })
    }

    registration = () => {
        serverConnector.registration(this.fields);
    };

    login = () => {
        serverConnector.authentication(this.fields).catch(() => {
            modalService.open(<div>
                <h2>Login error</h2>
                <br/>
                <p>Check login or password</p>
            </div>)
        });
    };

    logout = () => serverConnector.logout();

    changeFunctional = (functional: number) => () => {
        this.fields = {};
        this.setState({functional});
    };

    newPost = (channelID) => () => {
        modalService.open(<NewPost channelID={channelID}/>)
    }
}



