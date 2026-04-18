# Portfolio.dev (Extended Version)

This is a personal portfolio website built with Astro, TypeScript, and Tailwind CSS. It features a unique Neovim-inspired theme and includes sections for About, Experience, Education, Skills, and Projects. 

> **Note:** This repository is an extended version of the excellent template originally created by [@Anmol-TheDev](https://github.com/Anmol-TheDev/potfolio2.0). I have cloned and modified it to add additional features like a Markdown-powered blog and dynamic project links.

## Features

*   **Markdown Blog Section:** Added a fully functional blog section powered by Astro Content Collections.
*   **Dynamic Project Links:** Updated the project section to support and render dynamic project links.
*   **Neovim-inspired theme:** A unique theme that mimics the look and feel of the Neovim editor.
*   **Multiple Sections:** Includes sections for About, Experience, Education, Skills, and Projects.
*   **Responsive Design:** The website is designed to be responsive and work on all devices.
*   **Live CV:** The portfolio data is sourced from a `cv.json` file, making it easy to update.

## Tech Stack

*   **Astro:** The web framework for building the website.
*   **TypeScript:** For type safety and improved developer experience.
*   **Tailwind CSS:** For styling the website.
*   **React:** Used for some interactive components.
*   **Vercel:** For deployment.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v22.x or later)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/ZEZE1020/ogembo.me.git
    ```
2.  Install NPM packages
    ```sh
    pnpm install
    ```

### Running the Development Server

To run the development server, use the following command:

```sh
pnpm run dev
```

This will start the development server at `http://localhost:4321`.

## Adding a Blog Post

To publish a new article in the blog section, create a new Markdown (`.md`) file inside the `src/content/blog/` directory.

You must include the following YAML frontmatter at the top of your markdown file:

```yaml
---
title: "Your Blog Post Title"
description: "A short description of your post."
pubDate: 2026-04-18
tags: ["Astro", "Web"]
---
```

After the frontmatter (`---`), write your post content using standard Markdown syntax. The site will automatically parse it, apply the Neovim styles, and add it to the blog feed!

## License

Distributed under the MIT License. See `LICENSE` for more information.
