import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Create directories if they don't exist
mkdirSync(join(rootDir, 'public/images'), { recursive: true });
mkdirSync(join(rootDir, 'public/images/projectPics'), { recursive: true });

// Copy files from data directory to public/images
const dataDir = join(rootDir, 'data');
const publicImagesDir = join(rootDir, 'public/images');

// List of image files to copy (excluding .DS_Store and non-image files)
const imagesToCopy = [
  'epidemic_spread.png',
  'vis_best_practices.jpg',
  'marketStory.png',
];

// Copy main images
imagesToCopy.forEach(image => {
  try {
    copyFileSync(
      join(dataDir, image),
      join(publicImagesDir, image)
    );
    console.log(`Copied ${image}`);
  } catch (error) {
    console.error(`Error copying ${image}:`, error);
  }
});

// Copy project pics
const projectPicsDir = join(dataDir, 'projectPics');
const publicProjectPicsDir = join(publicImagesDir, 'projectPics');

try {
  const projectPics = [
    'manhattanPlots.png',
    'binomial.png',
    'fillingStations.jpg',
    'labInTheWild.jpg',
    'leap.jpg',
    'CAPower.jpg',
    'integralTransform.png',
    'likelihood.png',
    'markdown_sites.png',
    'superHeroes.jpg',
    'confidenceIntervals.png',
    'growingSeasons.png',
    'rVisualization.png',
    'd3Manhattan.png',
    'polioHist.jpg',
    'wildfires.png',
    'pvalues.png',
    'reusableCharts.png',
    'survival_curve.png',
    'curvy.png',
    'shinysense.gif',
    'signLanguage.jpg',
    'signLanguage.png'
  ];

  projectPics.forEach(pic => {
    copyFileSync(
      join(projectPicsDir, pic),
      join(publicProjectPicsDir, pic)
    );
    console.log(`Copied projectPic ${pic}`);
  });
} catch (error) {
  console.error('Error copying project pics:', error);
} 