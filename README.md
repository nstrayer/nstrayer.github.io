# Nick Strayer's Personal Website

This is the source code for my personal website, built with Astro and featuring an interactive WebGL particle background animation.

Visit: [nickstrayer.me](https://nickstrayer.me)

## 🚀 Features

- Interactive WebGL particle background with mouse interaction
- Responsive design for all device sizes
- Accessibility features including reduced motion preferences
- Project showcase with filterable categories
- Skills and experience sections
- Contact information

## 🔧 Technologies

- **Astro**: Static site generator
- **TypeScript**: Type-safe JavaScript
- **WebGL**: Interactive particle background
- **TailwindCSS**: Styling
- **CSV**: Project data storage

## 📁 Project Structure

```text
/
├── public/           # Static assets (images, CNAME)
├── src/
│   ├── components/   # Astro components (Hero, About, Projects, etc.)
│   │   └── background/  # WebGL particle system
│   ├── data/         # Project data and constants
│   ├── layouts/      # Page layouts
│   └── pages/        # Page routes
└── package.json
```

## 🧞 Development Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build production site to `./dist/`               |
| `npm run preview`      | Preview production build locally                 |

## 🚢 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the master branch.

## 📝 License

This project is available as open source under the terms of the MIT License.