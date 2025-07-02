export type GitHubUser =  {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string; // ISO date
  updated_at: string; // ISO date
  // plus additional URL fields:
  url: string;
  followers_url: string;
  repos_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}
