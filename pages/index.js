import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import jsonLogic from "json-logic-js";

/**
 *
 * GitHub: https://github.com/jwadhams/json-logic-js
 * Playground: https://jsonlogic.com/play.html
 * Operators: https://jsonlogic.com/operations.html#logic-and-boolean-operations
 *
 */

export default function IndexPage() {
  const defaultValues = {
    parameter: "netArea",
    operator: "!=",
    value: "2",
    state: "warning",
  };
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      rules: [defaultValues],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rules",
  });

  const onSubmit = (data) => console.log("data", data);

  const formContent = {
    parameter: [
      { slug: "netArea", name: "Grundfläche", values: ["0 - 10000"] },
      {
        slug: "type",
        name: "Gebäudetyp",
        values: ["singlefamily, multifamily, nonresidential"],
      },
    ],
    operator: ["==", "!=", ">", "<"],
    state: ["warning", "error"],
  };

  const buildingData = {
    type: "singlefamily",
    netArea: 232,
  };

  const jsonlogic = [];

  watch().rules.map((item, index) => {
    jsonlogic.push({
      [item.operator]: [{ var: [item.parameter] }, item.value],
    });
  });

  return (
    <div>
      <h1>Product Filter Demo</h1>
      <hr></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Produkt kriterien</h3>
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <select {...register(`rules.${index}.parameter`, { required: true })}>
                  <option value="parameter">select parameter</option>
                  {formContent.parameter.map((d, i) => {
                    return (
                      <option key={i.toString()} value={d.slug}>
                        {d.name}
                      </option>
                    );
                  })}
                </select>

                <select {...register(`rules.${index}.operator`, { required: true })}>
                  <option value="operator">select operator</option>
                  {formContent.operator.map((d, i) => {
                    return (
                      <option key={i.toString()} value={d}>
                        {d}
                      </option>
                    );
                  })}
                </select>

                <input {...register(`rules.${index}.value`, { required: true })} placeholder="values comma seperated for multiple" />

                <select {...register(`rules.${index}.state`, { required: true })}>
                  <option value="operator">select operator</option>
                  {formContent.state.map((d, i) => {
                    return (
                      <option key={i.toString()} value={d}>
                        {d}
                      </option>
                    );
                  })}
                </select>

                <input
                  {...register(`rules.${index}.fault_message`, {
                    required: true,
                  })}
                  placeholder="error message"
                />

                <input
                  {...register(`rules.${index}.success_message`, {
                    required: true,
                  })}
                  placeholder="success message"
                />

                <button type="button" onClick={() => remove(index)}>
                  Löschen
                </button>
              </li>
            );
          })}
        </ul>
        <section>
          <button
            type="button"
            onClick={() => {
              append(defaultValues);
            }}
          >
            hinzufügen
          </button>

          <button
            type="button"
            onClick={() =>
              reset({
                rules: [defaultValues],
              })
            }
          >
            zurücksetzen
          </button>
        </section>

        <input type="submit" />
      </form>
      <hr></hr>
      <details>
        <summary>Form output</summary>
        <pre>{JSON.stringify(watch(), 0, 2)}</pre>
      </details>
      <hr></hr>
      <details>
        <summary>Converted to jsonlogic</summary>
        <pre>{JSON.stringify(jsonlogic, 0, 2)}</pre>
      </details>
      <hr></hr>
      <details>
        <summary>Building Data</summary>
        <pre>{JSON.stringify(buildingData, 0, 2)}</pre>
      </details>
      <hr></hr>
      <h3>Testing against building data</h3>
      <pre>iterate rules and print result</pre>
      {jsonlogic.map((rule, index) => {
        return (
          <li key={index}>
            <details>
              <summary>
                {formContent.parameter.find((x) => x.slug === watch().rules[index].parameter).name} <strong></strong>{" "}
                {jsonLogic.apply(rule, buildingData) ? "✅" : watch().rules[index].state === "warning" ? "⚠️" : "❌"}{' '}
                <i>{jsonLogic.apply(rule, buildingData) ? watch().rules[index].success_message : watch().rules[index].fault_message}</i>
              </summary>
              <p>
                <strong>Message </strong>
                {jsonLogic.apply(rule, buildingData) ? watch().rules[index].success_message : watch().rules[index].fault_message}
              </p>
              <p>
                <strong>name in database</strong> {watch().rules[index].parameter}
                <strong>result </strong>
                {rule && JSON.stringify(jsonLogic.apply(rule, buildingData))}
              </p>
              <pre>{JSON.stringify(rule)}</pre>
              <pre>{JSON.stringify(buildingData)}</pre>
            </details>
            <hr></hr>
          </li>
        );
      })}
    </div>
  );
}
