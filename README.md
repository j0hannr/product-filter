# Product Filter Demo
Product filter Demo, to match Products with Buildings.

Uses [json-logic-js](https://github.com/jwadhams/json-logic-js) for storing logic in JSON format.

## Todo
- [ ] Basic Styling
- [ ] Include device Identifier
- [ ] How to store in Database
- [ ] Do Json logic in Backend and only return result without exposing logic

## Structure

Filters are Product specific (device identifier), can be add, edited and deleted. The Filters are defined by the system, usually are hard parameter such as `netArea` and `type`, but can be also softparameter, such as `centralheating`.

Filteres are then tested againstthe specific Building, resulting and an overall rating `true`, `warning` & `error` and specific messages for each filter.