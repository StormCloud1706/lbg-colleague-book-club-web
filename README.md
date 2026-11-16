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

## To-dos

- [ ] Get book covers from an API.
- [ ] Tidy and check the imported reading list data.
- [ ] Add a database so reading list changes are saved and shared between members.
- [ ] Make book picker cards evenly sized and include covers from the API.
- [ ] Make the book picker cards downloadable for Teams posts.
- [ ] Update the homepage tiles automatically when the reading list changes and when review collection is complete.
- [ ] Add a review function and show reviews in the past-read book details.
- [ ] Add monthly voting so members can vote for their three favourite books.
- [ ] Check the three picked books for similar genres and automatically re-roll until the choices are different enough before showing them.

## Hosting later

`npm run build` creates static files in `dist`. A static host must serve `index.html` for the app's routes (such as `/reading-list`) as well as the root URL. Hosting alone will not make browser-saved changes shared.
