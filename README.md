# Product Filter Demo
Product filter Demo, to match Products with Buildings.

Uses [json-logic-js](https://github.com/jwadhams/json-logic-js) for storing logic in JSON format.

## Todo
- [x] Basic Styling
- [ ] Include device Identifier
- [ ] How to store in Database
- [ ] Do Json logic in Backend and only return result without exposing logic
- [x] Automatically show Option field (when provided)
- [ ] Infor Pop with Description and Tips for the particular parameter
- [ ] Parameter and File Naming
- [ ] Components
  - [ ] Build filter
  - [ ] Apply Filter
- [ ] Integrate API Logic
  - [ ] Create
  - [ ] Match Product with Building 

## Filter
- [x] Energiestandard `energiestandard`
- [x] Grundfläche `netArea`
- [x] Gebäudetyp `type`
- [ ] Keller `basement`
- [ ] Etagen `levels`
- [ ] Dachbewohnt `roofInhabited`
- [ ] Dachtyp `roofType`
- [ ] Baujahr `yearConstruction`
- [ ] Denkmal `heritage`
- [ ] Radiatorentyp
- [ ] Zentralheizung

## Structure

Filters are Product specific (device identifier), can be add, edited and deleted. The Filters are defined by the system, usually are hard parameter such as `netArea` and `type`, but can be also softparameter, such as `centralheating`.

Filteres are then tested againstthe specific Building, resulting and an overall rating `true`, `warning` & `error` and specific messages for each filter.

## Files
Building Demo Data `./lib/product-filter/buildingdata-demo.json` <br>
Building Filter `./lib/product-filter/buildingfilter.json` <br>
Filter Logic `./lib/filter-logic.js`

## Testing
Testing with Playwright.

`npx playwright test --headed --debug`

`npx playwright codegen`

#### Testing with Playwright in a webserver
[Article](https://github.com/dferber90/nextjs-playwright-example/tree/completed-setup)
[Nextjs Setup](https://github.com/vercel/next.js/tree/canary/examples/with-playwright)
[Playwright Development Server](https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests)