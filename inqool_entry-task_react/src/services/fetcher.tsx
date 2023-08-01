
import axiosInstance from "./base";
import User from "../types/User";
import Repository from "../types/Repository";
import Organization from "../types/Organization";

export const getUserData = async (user: string): Promise<User> => {
  const response = await axiosInstance.get(`/users/${user}`);
  
  const returnUser: User = {
    empty: false,
    username: response.data.login,
    bio: response.data.bio,
    avatar_url: response.data.avatar_url,
    following: response.data.following,
    followers: response.data.followers,
    url: response.data.html_url,
  };
  return returnUser;
}


export const getUserRepos = async (user: string): Promise<Repository[]> => {
  let repositories: Repository[] = [];

  let response = await axiosInstance.get(`/users/${user}/repos`);

  let repos: Object[] = response.data;
  repos.map((repo: any) => {
    const repository: Repository = {
      name: repo["name"],
      description: repo["description"],
      language: repo["language"],
      updated_at : repo["updated_at"],
      url: repo["html_url"],
      ssh_url : repo["ssh_url"]
    }
    repository.name = repository.name.toUpperCase();
    let date = new Date(repository.updated_at)
    repository.updated_at = date.toLocaleDateString();
    if (date.toLocaleDateString() == (new Date()).toLocaleDateString()) {
      repository.updated_at = "Today";
    }
    repositories.push(repository);
})

  return repositories;
};

export const getUserOrgs = async (user: string): Promise<Organization[]> => {
  let organizations: Organization[] = [];

  let response = await axiosInstance.get(`/users/${user}/orgs`);

  let orgs: Object[] = response.data;
  orgs.map((repo: any) => {
    const organization: Organization = {
      login: repo["login"],
      description: repo["description"],
      avatar_url: repo["avatar_url"]
    };

    organizations.push(organization);
  });

  return organizations;
};;