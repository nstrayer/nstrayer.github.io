import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export interface Project {
  title: string;
  link: string;
  photo: string;
  github: string;
  description: string[];
}

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse the CSV file
const csvFilePath = join(__dirname, 'projects.csv');
const fileContent = readFileSync(csvFilePath, 'utf-8');
const projectsData = parse(fileContent, {
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