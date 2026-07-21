# Portfolio.dev (Extended Version)

This is a personal portfolio website built with Astro, TypeScript, and Tailwind CSS. It features a unique Neovim-inspired theme and includes sections for About, Experience, Education, Skills, and Projects. 

> **Note:** This repository is an extended version of the excellent template originally created by [@Anmol-TheDev](https://github.com/Anmol-TheDev/potfolio2.0). I have cloned and modified it to add additional features like a Markdown-powered blog and dynamic project links.

## Features

*   **Markdown Blog Section:** Added a fully functional blog section powered by Astro Content Collections.
*   **Talks:** Publish presentations with event details and optional links to slides and recordings.
*   **Content Series:** Create ordered learning paths containing blog posts, talks, and future content types.
*   **Standard and Neovim Views:** Blog posts, talks, and series are available in both the regular portfolio design and the keyboard-driven Neovim interface.
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
*   pnpm

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

After the frontmatter (`---`), write your post content using standard Markdown syntax. The site automatically adds it to both blog views:

*   Standard: `/blog` and `/blog/<slug>`
*   Neovim: `/neovim/blog` and `/neovim/blog/<slug>`

The slug is the filename without `.md`. For example, `scaling-python-on-aws.md` uses the slug `scaling-python-on-aws`.

## Adding a Talk

Create a Markdown or MDX file in `src/content/talks/`. Its filename becomes the talk slug.

```yaml
---
title: "Your Talk Title"
date: 2026-07-21
event: "Conference or Meetup Name"
slidesUrl: "https://example.com/slides"
videoUrl: "https://example.com/video"
---
```

`event`, `slidesUrl`, and `videoUrl` are optional. Add notes, a transcript, resources, or other supporting material below the frontmatter using Markdown or MDX.

Talks are available in both interfaces:

*   Standard: `/talks` and `/talks/<slug>`
*   Neovim: `/neovim/talks` and `/neovim/talks/<slug>`

## Creating a Series

A series is an ordered collection of existing content. Create a Markdown or MDX file in `src/content/series/`:

```yaml
---
title: "Scaling Backend Systems"
description: "A guided path through scaling concepts, examples, and talks."
items:
  - type: blog
    slug: scaling-python-on-aws
  - type: talk
    slug: first-talk
---
```

Each item requires:

*   `type`: The content resolver to use. Currently supported values are `blog` and `talk`.
*   `slug`: The referenced content filename without its `.md` or `.mdx` extension.

Items appear in the order declared. A series can mix blogs and talks, and the same content can belong to multiple series. Optional introductory Markdown or MDX can be written below the frontmatter.

Series are available in both interfaces:

*   Standard: `/series` and `/series/<slug>`
*   Neovim: `/neovim/series` and `/neovim/series/<slug>`

If an item type or slug cannot be resolved, the series page displays a warning for that item. To support another content type, add its collection and resolver to both series detail pages:

*   `src/pages/series/[slug].astro`
*   `src/pages/neovim/series/[slug].astro`

## Navigating the Content Views

The standard landing page contains an **Explore** section linking to Blog, Talks, and Series. The command palette opened with `Ctrl+K` also includes these destinations.

Neovim mode has a persistent navigation bar for Blog, Talks, and Series. It also supports these commands:

```text
:blog
:talks
:series
```

Press `j` or `k` to move between selectable lines and `Enter` to open the selected item. Press `u` to move up one URL level.

## License

Distributed under the MIT License. See `LICENSE` for more information.
