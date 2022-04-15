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
    state: "warning"
  };
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      rules: [defaultValues]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rules"
  });

  const onSubmit = (data) => console.log("data", data);

  const formContent = {
    parameter: [
      { slug: "netArea", name: "Grundfläche", values: ["0 - 10000"] },
      {
        slug: "type",
        name: "Gebäudetyp",
        values: ["singlefamily, multifamily, nonresidential"]
      }
    ],
    operator: ["==", "!=", ">", "<"],
    state: ["warning", "error"]
  };

  const building = {
    type: "singlefamily",
    netArea: 232
  };

  const jsonlogic = [];

  watch().rules.map((item, index) => {
    jsonlogic.push({
      [item.operator]: [{ var: [item.parameter] }, item.value]
    });
  });

  return (
    <div>
      Form to Rule demo
      <hr></hr>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Building Product soft/hard matching</p>
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <select
                  {...register(`rules.${index}.parameter`, { required: true })}
                >
                  <option value="parameter">select parameter</option>
                  {formContent.parameter.map((d, i) => {
                    return (
                      <option key={i.toString()} value={d.slug}>
                        {d.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  {...register(`rules.${index}.operator`, { required: true })}
                >
                  <option value="operator">select operator</option>
                  {formContent.operator.map((d, i) => {
                    return (
                      <option key={i.toString()} value={d}>
                        {d}
                      </option>
                    );
                  })}
                </select>

                <input
                  {...register(`rules.${index}.value`, { required: true })}
                  placeholder="values comma seperated for multiple"
                />

                <select
                  {...register(`rules.${index}.state`, { required: true })}
                >
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
                    required: true
                  })}
                  placeholder="error message"
                />

                <input
                  {...register(`rules.${index}.success_message`, {
                    required: true
                  })}
                  placeholder="success message"
                />

                <button type="button" onClick={() => remove(index)}>
                  Delete
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
            append
          </button>

          <button
            type="button"
            onClick={() =>
              reset({
                rules: [defaultValues]
              })
            }
          >
            reset
          </button>
        </section>

        <input type="submit" />
      </form>
      <hr></hr>
      <details>
        <summary>form output</summary>
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
        <pre>{JSON.stringify(building, 0, 2)}</pre>
      </details>
      <hr></hr>
      <p>Testing against building data</p>
      <pre>iterate rules and print result</pre>
      {jsonlogic.map((rule, index) => {
        return (
          <li key={index}>
            <details>
              <summary>
                {watch().rules[index].parameter} <strong></strong>{" "}
                {jsonLogic.apply(rule, building)
                  ? "✅"
                  : watch().rules[index].state === "warning"
                  ? "⚠️"
                  : "❌"}
              </summary>
              <p>
                <strong>Message </strong>
                {jsonLogic.apply(rule, building)
                  ? watch().rules[index].success_message
                  : watch().rules[index].fault_message}
              </p>
              <pre>
                result:{" "}
                {rule && JSON.stringify(jsonLogic.apply(rule, building))}
              </pre>
              <pre>{JSON.stringify(rule)}</pre>
              <pre>{JSON.stringify(building)}</pre>
            </details>
          </li>
        );
      })}
    </div>
  );
}
