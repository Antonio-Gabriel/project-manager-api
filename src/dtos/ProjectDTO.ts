import ProjectStatus from "../status/ProjectStatus";

export interface ICreatProjectDto{
  name: string;
  user_id: string;
  client_id: string;
  status: ProjectStatus;
  logo?: string;
  description: string;
}