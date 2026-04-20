---
title: "Gitea 1.26.0 Is Out, Here's What's New and Why I Still Self-Host"
description: "A look at the best new features in Gitea 1.26.0, from Terraform state registry to Actions concurrency, plus why self-hosting your Git server still makes sense in 2026."
pubDate: 2026-04-20
tags: ["Gitea", "Self-Hosting", "DevOps", "Git"]
---

I've been running Gitea for a while now, first for my own projects, then as a self-hosted Git server for students in my programming courses. If you've never heard of it, Gitea is an open-source, self-hosted Git service: think GitHub, but running on your own hardware, under your own control.

Version 1.26.0 dropped on April 18, 2026, and it's a substantial release. Before I get into the features, let me briefly make the case for why self-hosting still matters in 2026.

---

## A Quick Word on Why Self-Hosting Matters

GitHub is a great platform. But it's worth knowing what you're signing up for when you depend on it entirely.

In March 2026 alone, GitHub had four incidents. On March 3, github.com request failures hit approximately 40%, and around 43% of API requests failed for over an hour. On March 5, 95% of GitHub Actions workflow runs failed to start within 5 minutes, with an average delay of 30 minutes — that outage lasted nearly three hours. Two more incidents followed later in the month.

Also worth knowing: GitHub's 99.9% SLA only applies to Enterprise Cloud customers. Free and Team plan users have no contractual uptime guarantee at all.

For personal projects, this is fine. For a classroom full of students trying to submit assignments, or a team with real deployment windows, it matters. Running your own instance means those external incidents are not your problem.

That said, self-hosting is a trade-off: you take on operational responsibility. But for instructors, teams with specific data needs, or anyone who wants real control over their infrastructure, it's worth it. And with Gitea, the operational overhead is genuinely low.

---

## What's New in Gitea 1.26.0

### Actions Just Got Much More Powerful

If you use Gitea for CI/CD, this release has a lot for you.

**Concurrency groups** are now supported with GitHub-style syntax. Workflows can cancel or queue relative to in-progress jobs — a feature that was a notable gap before. If you have long-running pipelines or overlapping runs, this changes how you'll design your workflows.

**Workflow dependency visualization** is now built into the run view. You can see how jobs relate to each other in a graph, which is genuinely useful once pipelines get complex. The graph styling was also refreshed for clarity.

**Re-run failed jobs** is a small quality-of-life addition that saves real time. Instead of restarting an entire workflow when one job flakes, you can retry only what failed.

**Actions and reusable workflows from private repositories** are now supported. If you have shared pipeline logic in private repos, you can reference it across projects — matching a common pattern that was already standard on GitHub.

**Configurable permissions for Actions automatic tokens** let you scope what the automatic credential can do per instance or organization. Least-privilege CI is now actually achievable without workarounds.

**Per-runner pause and disable** means administrators can take individual runners offline for maintenance without removing them entirely. Useful when you're isolating a bad host or doing hardware work.

---

### Infrastructure as Code: Terraform State Registry

This is the headline feature for anyone working with infrastructure. Gitea 1.26.0 adds a Terraform state registry to the package registry. You can now host your Terraform state directly alongside your code, with the same access controls.

Previously you'd need a separate backend — S3, Terraform Cloud, a custom HTTP backend — just for state. Now it lives in Gitea. For teams already self-hosting their code, this consolidates a meaningful piece of the infrastructure stack.

---

### Editor and UI Improvements

**Monaco has been replaced with CodeMirror** for in-browser editing. The change improves consistency with the rest of the UI and results in leaner bundles. If you edit files directly in the browser, the experience is noticeably cleaner.

**The frontend toolchain migrated from webpack to Vite.** The result is faster page loads and leaner production bundles throughout the UI.

**Keyboard shortcuts** for repository file and code search are new, making it faster to navigate large codebases without reaching for the mouse.

**Download subpath archive** lets users download a zip or tarball for a subdirectory rather than the full repository. If you run monorepos or have students working in assigned subdirectories, this is immediately useful.

**Automatic release notes generation** — the release editor can now generate Markdown notes from merged pull requests and contributors server-side. Less manual work when cutting a version.

**OpenAPI spec rendering** in the browser. If your repository contains OpenAPI documents, they're now rendered for reading and exploration directly in Gitea.

---

### Administration

**Instance-wide info banner and maintenance mode** is a welcome addition for anyone running Gitea for a team or class. You can now display a global notice to all users and enable a maintenance mode — without reaching for reverse proxy hacks.

**User badges** let profiles display badges for roles, achievements, or internal designations. For a classroom context, a small but nice touch.

---

### Security Fixes

Three CVEs were addressed in this release:

**CVE-2026-28737** — Stored XSS in the 3D File Viewer via the glTF `extensionsRequired` field. Fixed in #37233.

**CVE-2026-22555** — A missing permission check in the API fork flow that could allow exfiltration of organization secrets. Fixed in #36950.

**CVE-2026-27780** — A branch protection bypass caused by silent truncation in `bufio.Scanner` during pre-receive hook processing. Fixed in #36963.

If you're running an older version, these alone are reason enough to upgrade.

---

## How to Deploy or Upgrade

The quickest way to get Gitea running is Docker Compose with PostgreSQL:

```yaml
version: '3'

networks:
  gitea:
    external: false

services:
  server:
    image: gitea/gitea:1.26.0
    container_name: gitea
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - GITEA__database__DB_TYPE=postgres
      - GITEA__database__HOST=db:5432
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=gitea
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "222:22"
    depends_on:
      - db

  db:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=gitea
      - POSTGRES_DB=gitea
    networks:
      - gitea
    volumes:
      - ./postgres:/var/lib/postgresql/data
```

Run `docker-compose up -d`, navigate to `http://<your-server-ip>:3000`, and follow the setup screen.

**If you're upgrading:** back up your data first, then replace the binary or container image. A few breaking changes to be aware of in 1.26.0:

- The standalone `environment-to-ini` tool was removed and replaced with a `gitea config edit-ini` subcommand
- The GET endpoint for retrieving a registration token was removed — update any automation that calls it
- The new Actions concurrency behavior changes runtime behavior for overlapping pipelines — review existing workflows after upgrading
- `PUBLIC_URL_DETECTION` now defaults to `auto` on new installations — confirm your `[server]` settings if you're behind a reverse proxy

For production setups, put Gitea behind a reverse proxy like Nginx or Traefik for SSL termination.

---

## Final Thoughts

Gitea keeps moving in the right direction. The 1.26.0 release fills in meaningful gaps, especially around Actions, infrastructure tooling, and the editing experience. The Terraform state registry and Actions concurrency support are the two features I'm most interested in using, and the security fixes make upgrading a straightforward decision.

If you're already running Gitea, now's a good time to upgrade. If you're considering self-hosting your Git infrastructure for the first time, 1.26.0 is a solid place to start.
