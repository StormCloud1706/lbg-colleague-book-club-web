# Colleague Book Club

A book club app built for a community I run, and a learning project that is growing beyond its original brief.

## The story behind the project

I developed the original app as my final project for a learning and development scheme at work. I also run the book club at my workplace hub, so I wanted to build something useful for the people taking part: one place to collect suggestions, see what we're reading and look back at the books we've discussed.

The original book club app sat within a larger group project. This repository is a standalone rebuild, recreated from screenshots and the exported reading list.

Now that the scheme has finished, I intend to keep developing the app and publish it for our book club to use. This repository documents that progression, from recreating the original experience to adding shared data, reviews and monthly voting.

## What it does today

- **Club homepage** with the current read, next meeting and previous read.
- **Reading list** with search, genre filters, sorting and pagination.
- **Book management** for adding, editing and removing books.
- **Past reads** with club ratings, descriptions and content warnings.
- **Random book picker** with three distinct suggestions, individual re-rolls and an animated reveal.
- **Browser storage** so changes survive a refresh on the same browser and device.
- **Responsive layouts** and reduced-motion support for the picker animation.

## Built with

React, Vite, React Router, CSS, Lucide icons and the browser's localStorage API.

## Where it's heading

The next stage is to turn the standalone app into a shared space for the club:

- Book covers from an API and a tidier reading list.
- Shared database storage.
- Evenly sized picker cards that can be downloaded for Teams posts.
- Member reviews and automatically updated homepage tiles.
- Monthly voting and more varied genre choices in the picker.

See [TODO.md](./TODO.md) for the working checklist. Feature branches and incremental commits record the development as it progresses.

## Running locally

You'll need a Node.js version supported by Vite and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Vite.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check the code with Oxlint |
| `npm run build` | Create a production build in `dist` |
| `npm run preview` | Preview the production build locally |

## Current limitations

This is a work in progress, not yet a shared, hosted service. Book changes are saved only in the browser where they were made; they aren't synchronised between members and may be lost if browser data is cleared. There is no backend, member authentication or database yet.

The bundled reading list contains 99 books: 85 suggestions, 13 past reads and one current read. It was imported from a text export, and checking and tidying that data is part of the planned work.

Meeting details are currently maintained in the app rather than through an editing screen. Hosting is planned; a static deployment will need to serve `index.html` for client-side routes as well as the homepage.
