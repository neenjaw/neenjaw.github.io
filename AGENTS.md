# Project Context

## Overview

This repository is the source for [neenjaw.com](https://neenjaw.com), a personal website built with Ruby and Jekyll. It is a content-first site for publishing notes, development threads, and longer essays.

Keep the site lightweight and maintainable. Prefer Jekyll, Liquid, Markdown, semantic HTML, and the existing vanilla CSS approach over adding a frontend framework or unnecessary build tooling.

## Technology

- Jekyll `4.4.x`
- Ruby and Bundler
- Liquid templates
- Markdown content
- Vanilla CSS, organized as imported files rather than Sass or a CSS framework
- Jekyll plugins: `jekyll-feed` and `jekyll-seo-tag`

## Repository Structure

- `_config.yml`: Site metadata, collections, defaults, plugins, and build exclusions.
- `_layouts/`: Page templates. `default.html` provides the document shell; content types use `essay`, `note`, or `devlog` layouts.
- `_includes/`: Reusable Liquid and HTML fragments such as the head, header, footer, and stream items.
- `_notes/`: Short-form notes. These are output as `/notes/:name/`.
- `_devlogs/`: Longer development threads. These are output as `/devlogs/:name/`.
- `_essays/`: Essay collection content. These are output as `/essays/:name/`.
- `_posts/`: Older or transitional Jekyll posts, generally using the essay format and front matter.
- `_posts_archived/`: Historical content that is retained but not part of the active publishing workflow.
- `assets/css/`: Site stylesheets. `main.css` imports the individual CSS modules.
- `index.markdown`, `essays.markdown`, `devlogs.markdown`, `profile.markdown`: Top-level pages and section indexes.
- `scripts/new-content.sh`: Shell helper for creating dated notes, devlogs, and essays.
- `Rakefile`: Shortcuts for serving and building the site.
- `preact-components/`: Separate, excluded frontend experiments. Do not introduce dependencies here for ordinary site work.
- `_site/`, `.jekyll-cache/`, and `.sass-cache/`: Generated files and caches; do not edit or commit them.

## Content Types

### Notes

Notes are short, focused entries intended to capture an idea or work in progress. They commonly use front matter such as:

```yaml
---
date: 2026-08-15 09:10
tags: [workflow, publishing]
---
```

The collection default assigns the `note` layout. Notes can reference a devlog using a `devlog` front matter field whose value matches the devlog slug.

### Devlogs

Devlogs document an ongoing project or development thread. They generally include a date, title, description, and tags:

```yaml
---
date: 2026-08-15 08:00
title: Second System
description: Notes on rebuilding neenjaw.com from scratch.
tags: [jekyll, design, rebuilding]
---
```

The `devlog` layout finds related notes and renders them beneath the thread content.

### Essays

Essays are longer, considered pieces. They may include a title, subtitle, date, and categories:

```yaml
---
layout: essay
title: Essay title
subtitle: Optional subtitle
date: 2025-04-30 06:02:08 -0600
categories: programming puzzles
---
```

Use the `essay` layout for essay content unless the relevant collection default already supplies it.

## Templates and URLs

- Use `relative_url` when generating internal links, as existing templates do.
- Escape user-authored values rendered into HTML, especially titles, subtitles, and descriptions.
- Preserve the existing layout hierarchy: content-specific layout -> `default` -> shared head/header/footer includes.
- Collection permalinks are configured in `_config.yml`; do not hard-code alternate URL schemes without a specific requirement.
- Keep front matter valid YAML and preserve date formats compatible with Jekyll.

## CSS Guidelines

The site intentionally uses modular vanilla CSS. Add or modify the smallest relevant file in `assets/css/`, and register new modules in `assets/css/main.css` when needed.

- Reuse the variables in `variables.css` before adding new colors, spacing values, or typography values.
- Keep selectors scoped to the component or page area they style.
- Preserve responsive behavior in `responsive.css` and verify narrow viewport layouts when changing desktop styles.
- Prefer semantic class names and the existing naming conventions over inline styles.
- Do not add Tailwind, Bootstrap, Sass, CSS-in-JS, or a JavaScript styling dependency for routine changes.

## Development Commands

Install dependencies with Bundler, then use:

```sh
bundle exec jekyll serve
bundle exec jekyll build
rake serve
rake build
```

The site is normally available at `http://localhost:4000`. Use `bundle exec jekyll build` as the basic verification for content, Liquid, configuration, and layout changes.

To create content with the helper:

```sh
./scripts/new-content.sh note
./scripts/new-content.sh note aoc-2025
./scripts/new-content.sh devlog "Devlog title"
./scripts/new-content.sh essay "Essay title"
```

The helper opens the generated file in `$EDITOR` (or `vim` by default). Review the filename and front matter before publishing.

## Change Guidelines

- Make the smallest change that solves the problem.
- Preserve existing content and URLs unless a change explicitly requires migration.
- Keep writing and content edits separate from presentation or infrastructure changes when practical.
- Do not edit generated output or cache directories.
- Check `git status` before and after work, and do not overwrite unrelated worktree changes.
- Run a Jekyll build after template, front matter, configuration, or CSS changes.
