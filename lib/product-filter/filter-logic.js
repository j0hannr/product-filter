import jsonLogic from "json-logic-js";

export default function FilterLogic({ building, filter }) {
  // flatten building Parameter
  let buildingParameter = [];
  building.Parameter.map((item) => {
    building[item.name] = [item.value];
  });

  // iterate filter and write to new const
  const filterResults = filter.map((rule, index) => {
    return { result: jsonLogic.apply(rule, buildingParameter) ? "✅" : watch(`rules.${index}.state`) === "warning" ? "⚠️" : "❌" };
  });

  // format
  const format = [{ name: "Energiestandard", slug: "energiestandard", result: "", message: "" }];

  return filterResults
}
