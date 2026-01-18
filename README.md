# CodexFabrica Website

A Jekyll-based website for publishing repositories, releases, downloads, research, and news.

## Features

- **Homepage**: Welcome page with quick links to all sections
- **Repositories**: Showcase your GitHub repositories
- **Releases**: Display software releases and version updates
- **Downloads**: Provide access to tools, documentation, and resources
- **Research**: Publish research projects and publications
- **News**: Share announcements and updates

## Local Development

### Prerequisites

- Ruby 2.7 or higher
- Bundler

### Setup

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Run the local server:
   ```bash
   bundle exec jekyll serve
   ```

3. Visit `http://localhost:4000` in your browser

### Build for Production

```bash
bundle exec jekyll build
```

The site will be generated in the `_site` directory.

## Content Management

### Adding News Articles

Create a new Markdown file in the `_news` directory:

```markdown
---
title: "Your Article Title"
date: 2026-01-18
author: Your Name
tags: [tag1, tag2]
excerpt: "A brief description of your article."
---

Your article content here...
```

### Adding Research Projects

Create a new Markdown file in the `_research` directory:

```markdown
---
title: "Research Project Name"
description: "Brief description"
tags: [research, topic]
---

Your research content here...
```

### Updating Pages

Edit the HTML files in the root directory:
- `repos.html` - Repositories page
- `releases.html` - Releases page
- `downloads.html` - Downloads page
- `research.html` - Research overview page
- `news.html` - News overview page

## Customization

### Site Configuration

Edit `_config.yml` to change:
- Site title and description
- Base URL
- Navigation settings
- Plugin configuration

### Styling

Modify `assets/css/style.css` to customize the appearance.

### Layouts

Edit files in `_layouts/` to change page structures:
- `default.html` - Base layout
- `page.html` - Standard page layout
- `post.html` - News/blog post layout

### Includes

Modify files in `_includes/` to update:
- `header.html` - Site header
- `footer.html` - Site footer
- `navigation.html` - Navigation menu

## GitHub Pages Deployment

This site is configured to work with GitHub Pages automatically. Simply push your changes to the main branch, and GitHub will build and deploy the site.

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]
