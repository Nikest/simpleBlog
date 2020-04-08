import * as React from 'react';

import { Config, tokenParser, serverConnector } from 'Services';

export class Initializer extends React.Component<{children: any}> {
  componentDidMount() {
    require('Themes/default/theme.scss');

    const theme = Config.get('THEMES');

    document.body.classList.add(`theme-${theme}`);

    const token = document.cookie.split('token=')[1];

    try {
      token && serverConnector.authentication(tokenParser(token));
    } catch (e) { }
  }

  render() {
    return this.props.children
  }
}
