# Colleague Book Club

A standalone Vite and React recreation of the book club app.

## Run locally

```sh
npm install
npm run dev
```

Open the address printed by Vite. Run `npm run lint` and `npm run build` to check the app.

## Books and storage

The starting list is in `src/data/books.json`, imported from the supplied reading list. The paste contained 85 suggestions, 13 past reads and one current read; it differs slightly from the screenshots (which showed 82 suggestions). Some column boundaries were unclear in the pasted text, so check the imported genres and content warnings against the original where possible.

Changes made through the app are saved **only in that browser on that device** using localStorage. They are not shared with other club members and can be lost when browser data is cleared. There is no backend or database. If the browser cannot save or read the list, the app displays an error.

The home page meeting details are copied from the screenshot and should be updated in `src/pages/BookClubHome.jsx` when they change. The Teams link opens the club's channel; members may need to sign in and have access to it.

## Upcoming work

See [TODO.md](./TODO.md) for the feature backlog and smaller tasks.

## Hosting later

`npm run build` creates static files in `dist`. A static host must serve `index.html` for the app's routes (such as `/reading-list`) as well as the root URL. Hosting alone will not make browser-saved changes shared.
