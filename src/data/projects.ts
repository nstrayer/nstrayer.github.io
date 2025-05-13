import { parse } from 'csv-parse/sync';

export interface Project {
  title: string;
  link: string;
  photo: string;
  github: string;
  description: string[];
}

// Import CSV directly using Vite's import feature
import projectsCsv from './projects.csv?raw';

// Parse the CSV data
const projectsData = parse(projectsCsv, {
  columns: true,
  skip_empty_lines: true
});

// Function to fix image paths to point to public directory
function fixImagePath(path: string): string {
  if (!path || path === 'NA') return '';
  
  // If it's already an absolute URL, return as is
  if (path.startsWith('http')) return path;
  
  // Remove any leading 'images/' as we'll add it back
  const cleanPath = path.replace(/^images\//, '');
  
  // Add the correct public path prefix
  return `/${cleanPath}`;
}

// Parse the CSV data into a more usable format
export const PROJECTS: Project[] = projectsData.map((project: any) => ({
  title: project.title,
  link: project.link,
  photo: fixImagePath(project.photo),
  github: project.github === 'NA' ? '' : project.github,
  description: [
    project.description_1,
    project.description_2,
    project.description_3,
    project.description_4,
    project.description_5,
  ].filter(desc => desc && desc !== 'NA'), // Filter out empty strings and 'NA' values
})); 