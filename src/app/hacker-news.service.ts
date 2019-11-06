import { Service, Inject } from '@lit-kit/di';

export interface HackerNewsItem {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}

export const HackerNews = () => (c: any, p: any, i: any) => Inject(HackerNewsService)(c, p, i);

@Service()
export class HackerNewsService {
  getNews(): Promise<HackerNewsItem[]> {
    return fetch('https://api.hackerwebapp.com/news').then(res => res.json());
  }
}
