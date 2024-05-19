export interface Repo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  topics: string[];
  stargazersCount: number;
  language: string;
}