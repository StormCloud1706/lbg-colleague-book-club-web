# Book Club To-dos

The rebuild is committed on `main`. New features should use separate branches and small, meaningful commits. The checkboxes below can be tracked in Better Todo Tree.

## 1. Tidy the reading list data

- [ ] Check the imported books against the supplied list and flag missing or ambiguous entries.
- [ ] Correct title and author spelling, punctuation and capitalisation.
- [ ] Standardise primary and secondary genres without losing useful categories.
- [ ] Check content warnings, descriptions, ratings, read dates and statuses.
- [ ] Check for duplicate books and preserve stable IDs when correcting entries.
- [ ] Decide how corrected seed data should reach browsers that already have a saved list, without overwriting personal edits.
- [ ] Verify book totals and that search, filters and existing saved lists still work.

## 2. Book cover API

- [ ] Compare cover APIs for accuracy, usage limits, attribution and image download permissions.
- [ ] Choose a provider and confirm whether credentials or a server-side integration are needed.
- [ ] Match books by title and author, using ISBNs where available.
- [ ] Store cover references and allow incorrect matches to be corrected.
- [ ] Add loading and missing-cover placeholders.
- [ ] Handle failed requests and avoid repeating unnecessary lookups.
- [ ] Check difficult matches, books without covers and API failures.

## 3. Shared database

- [ ] Choose a database and hosting approach, checking costs and free-tier limits.
- [ ] Decide how members identify themselves and who can add, edit or remove books.
- [ ] Define the book records and access rules.
- [ ] Create separate local/development and production configuration without committing secrets.
- [ ] Import the cleaned book data.
- [ ] Decide how to migrate existing browser-saved additions and edits.
- [ ] Connect reading list actions to shared storage, with loading and error feedback.
- [ ] Handle conflicting edits and define a backup/recovery approach.
- [ ] Verify that changes persist and appear in a second browser, and unauthorised changes are blocked.

## 4. Evenly shaped picker cards with covers

Needs: book cover API.

- [ ] Agree the card proportions and layout for desktop, mobile and downloadable images.
- [ ] Add the cover, title and author while retaining access to descriptions and content warnings.
- [ ] Keep all three cards evenly sized with long titles and missing covers.
- [ ] Adapt the rolling animation and result reveal to the new layout.
- [ ] Check readability, responsive layouts and reduced-motion behaviour.

## 5. Download picker cards for Teams

Needs: picker card layout and cover integration.

- [ ] Decide whether to download individual cards, all three together, or both.
- [ ] Choose image dimensions and which book details to include.
- [ ] Implement image export, checking cross-origin restrictions on cover images.
- [ ] Exclude buttons and temporary animation states from the downloaded image.
- [ ] Add download controls, useful filenames and failure feedback.
- [ ] Verify downloaded images with long titles, missing covers and in a Teams post.

## 6. Reviews and past-read details

Needs: shared storage and member identification for shared reviews.

- [ ] Agree the rating scale, review fields and rules for submitting or editing a review.
- [ ] Define how review collection opens, closes and is marked complete.
- [ ] Store reviews against the correct book and member, with appropriate access rules.
- [ ] Build the review form with validation and save feedback.
- [ ] Add a detailed past-read view showing reviews and the club average.
- [ ] Define how averages handle edited reviews, no reviews and rounding.
- [ ] Verify review submission, edits, permissions and the displayed average.

## 7. Automatic homepage tile updates

Needs: review completion rules for review-driven updates; shared storage for cross-member updates.

- [ ] Agree what promotes a book to current read and moves it to past reads.
- [ ] Decide how to handle multiple current books, missing dates and incomplete review collection.
- [ ] Connect the current and previous read tiles to the agreed lifecycle rules.
- [ ] Refresh the previous read's rating when reviews change or collection finishes.
- [ ] Decide where meeting details are maintained and when they should change.
- [ ] Verify a full transition from selected book to current read to completed reviews and past read.

## 8. Monthly voting

Needs: shared storage and voter identification.

- [ ] Agree who can vote, whether three choices are required or a maximum, and whether votes can be changed.
- [ ] Decide how monthly ballots are created, opened and closed, and who can manage them.
- [ ] Store each month's candidates and votes with access rules.
- [ ] Build the candidate selection and voting confirmation screens.
- [ ] Enforce distinct choices and prevent duplicate or late submissions.
- [ ] Agree when results are visible and how ties are handled.
- [ ] Show results and decide whether selecting the winner updates the reading list automatically.
- [ ] Verify vote limits, changed votes, ballot closure and result counts.

## 9. Genre variety in the book picker

Needs: consistent genre categories from the data tidy-up.

- [ ] Agree what makes genres too similar, including primary and secondary genre overlap.
- [ ] Define how missing or ambiguous genres are handled.
- [ ] Check a candidate trio before revealing the results.
- [ ] Randomly select and re-roll a conflicting book, keeping the three books distinct.
- [ ] Repeat until the choices meet the variety rules.
- [ ] Bound retries and agree what happens when the available books cannot form a varied trio.
- [ ] Apply the rules to both full rolls and individual re-rolls without exposing rejected choices.
- [ ] Verify varied lists, similar-only lists, small lists and termination.
