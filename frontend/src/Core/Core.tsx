import * as React from 'react';
import { cd } from 'Services';

import { Header, Main, Footer } from "Parts";

@cd(() => require('./Core.scss'))
export class Core extends React.Component {
  render(c?) {
    return (
      <section className={c('container')}>
        <Header/>
        <Main/>
      </section>
    )
  }
}
