// projects.ts
import projectsData from './projects.json';

export interface Project {
  title: string;
  link: string;
  photo: string | ImageMetadata;  // Updated to support both string and ImageMetadata
  github: string;
  description: string[];
}

// No need for CSV parsing or transformation - data is already in the correct format
export const PROJECTS: Project[] = projectsData;