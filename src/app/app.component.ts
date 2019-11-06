import './loader.component';

import { Component, State, CompState, OnInit } from '@lit-kit/component';
import { html } from 'lit-html';
import { until } from 'lit-html/directives/until';

import { HackerNewsService, HackerNewsItem, HackerNews } from './hacker-news.service';

export interface AppState {
  loading: boolean;
  news: HackerNewsItem[];
}

@Component<AppState>({
  tag: 'app-root',
  defaultState: { loading: false, news: [] },
  style: html`
    <style>
      :host {
        display: block;
        max-width: 1200px;
        margin: 0 auto;
      }

      news-card,
      .placeholder-card {
        animation: cardEnter 0.4s;
        margin-bottom: 0.75rem;
      }

      app-loader {
        display: block;
        margin: 2rem auto;
      }

      .placeholder-card {
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        height: 130px;
      }

      @keyframes cardEnter {
        0% {
          opacity: 0;
          transform: translateY(-5%);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  `,
  template(state) {
    return html`
      ${state.loading
        ? html`
            <app-loader></app-loader>
          `
        : state.news.map(news =>
            until(
              import('./news-card.component').then(
                () =>
                  html`
                    <news-card .newsItem=${news}></news-card>
                  `
              ),
              html`
                <div class="placeholder-card"></div>
              `
            )
          )}
    `;
  }
})
export class AppComponent implements OnInit {
  constructor(
    @State() private state: CompState<AppState>,
    @HackerNews() private hackerNews: HackerNewsService
  ) {}

  onInit() {
    this.state.setState({ loading: true, news: [] });

    const state = this.hackerNews.getNews().then(news => ({ news, loading: false }));

    this.state.setState(state);
  }
}
