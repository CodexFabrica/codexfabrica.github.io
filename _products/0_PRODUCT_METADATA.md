# Product Metadata Guide

This guide defines the available frontmatter options for product Markdown files in the `_products/` directory.

## Core Metadata

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | The official name of the product. |
| `layout` | String | Jekyll layout to use. usually `page`. |
| `description` | String | A brief summary for SEO and meta tags. |
| `tagline` | String | A short, catchy phrase displayed on the product card. |
| `product_logo` | Path | Path to the logo image (e.g., `/assets/images/logo.svg`). |
| `repository` | String | GitHub repository identifier (e.g., `CodexFabrica/Feder`). |
| `tags` | Array | List of topic tags (e.g., `[markdown, writing]`). |
| `published` | Boolean | `true` to build the page, `false` to hide it completely. |
| `repo_public` | Boolean | `true` if the GitHub repo is public (usually updated automatically by scripts). |

---

## 1. `dev_stage` (Lifecycle)
*Indicates where the project is on the timeline.*

* **`concept`**
  * Just an idea or a "whitepaper."
  * *Behavior:* Card hidden from lists.
* **`in-dev`**
  * Active development. Code exists but is unstable.
  * *Behavior:* Card visible but link disabled. "In-Dev" badge shown.
* **`alpha`**
  * Functional but buggy; strictly for internal testing or brave users.
  * *Behavior:* Card visible and clickable (read-only). No download/repo links.
* **`beta`**
  * Feature complete, but in public testing (Early Access).
  * *Behavior:* Card visible. Repo/Download links shown (if open-source).
* **`stable release`**
  * Finished product, ready for production.
  * *Behavior:* Full visibility.

## 2. `distribution` (Access & License)
*Indicates what the user must do to get it.*

* **`open-source`**
  * Free and modifiable (MIT, GPL).
  * *Features:* Shows GitHub Repo link and Releases download link.
* **`freeware`**
  * Free to use, but closed source.
  * *Features:* Shows Download link only (no Repo link).
* **`commercial`** / **`paid`**
  * One-time payment to download.
  * *Features:* Custom purchase flow (implementation dependent).
* **`subscription`**
  * Recurring payment (SaaS).
* **`freemium`**
  * Basic free version + paid "Pro" version.
* **`donationware`**
  * Free, but with suggested donation.

## 3. `product_type` (Nature of the Product)
*Describes what the item actually is.*

* **`webapp`**: Web application (SaaS).
* **`desktop-app`**: Installable software (.exe, .dmg).
* **`library`**: Code package for developers (Python package, npm module).
* **`service`**: Consulting or manual service.
* **`course`** / **`resource`**: Educational material or templates.

---

## Example Frontmatter

```yaml
---
layout: page
title: "Feder"
dev_stage: "in-dev"
distribution: "open-source"
product_type: "webapp"
description: "A local alternative to Overleaf for your privacy"
tagline: "Serverless, Open-source and Markdown-based Workspace for Writing"
product_logo: "/assets/images/feder.svg"
repository: "CodexFabrica/Feder"
tags: [markdown, writing, open-source]
published: true
repo_public: false
---
```
