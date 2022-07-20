import Head from "next/head";
import React from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import jsonLogic from "json-logic-js"; // will be used in the backend only (for security) both encryption || decryption
import buildingDataRaw from "../lib/product-filter/buildingdata-demo.json";
import buildingFilter from "../lib/product-filter/buildingfilter.json";
import FilterLogic from "../lib/product-filter/filter-logic";

export default function IndexPage() {
  // form default values
  const defaultValues = {
    parameter: "netArea",
    operator: "!=",
    value: "2",
    state: "warning",
  };
  // init react hook form
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      rules: [defaultValues],
    },
  });
  // init react hook form field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rules",
  });
  // display data on submit
  const onSubmit = (data) => console.log("data", data);

  // from logic
  const formContent = buildingFilter;

  // flatten building Parameter
  let buildingData = [];
  buildingDataRaw.Parameter.map((item) => {
    buildingData[item.name] = [item.value];
  });

  // storing json Logic from form
  // this should be the database later on
  const jsonlogic = [];

  // write rule to json logic array
  watch().rules.map((item, index) => {
    jsonlogic.push({
      [item.operator]: [{ var: [item.parameter] }, item.value],
    });
  });

  // generate demo database output
  let databaseFilterOutput = [];
  databaseFilterOutput = watch().rules.map((form, index) => {
    return {
      ...form,
      form: formContent.parameter.find(x => x.slug === form.parameter),
      logic: jsonlogic[index]
    }
  })

  return (
    <>
      <Head>
        <title>Product Filter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="lg:flex flex-col md:flex-row max-h-screen overflow-hidden ">
          <div className="lg:w-1/2 p-8 h-full max-h-screen overflow-scroll">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-2xl text-gray-800 mb-4">Produkt kriterien</h3>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id} className="mt-4">
                      <select className="p-1 mr-2 mb-2 rounded bg-gray-100 text-sm h-6" {...register(`rules.${index}.parameter`, { required: true })}>
                        <option value="parameter">select parameter</option>
                        {formContent.parameter.map((d, i) => {
                          return (
                            <option key={i.toString()} value={d.slug}>
                              {d.name}
                            </option>
                          );
                        })}
                      </select>

                      <select className="p-1 mr-2 mb-2 rounded bg-gray-100 text-sm h-6" {...register(`rules.${index}.operator`, { required: true })}>
                        <option value="operator">select operator</option>
                        {formContent.operator.map((d, i) => {
                          return (
                            <option key={i.toString()} value={d}>
                              {d}
                            </option>
                          );
                        })}
                      </select>

                      {/* display options from values for this parameter */}
                      {/* <p>{JSON.stringify(watch(`rules.${index}.parameter`))}</p> */}
                      {/* <p>{JSON.stringify(formContent.parameter.find(x => x.slug === watch(`rules.${index}.parameter`))?.values)}</p> */}
                      {/* <p>{JSON.stringify(formContent.parameter.find(x => x.slug === watch(`rules.${index}.parameter`))?.values.length)}</p> */}

                      {/* if rules.${index}.value length > 1 the create option field else input field */}
                      {formContent.parameter.find(x => x.slug === watch(`rules.${index}.parameter`))?.values.length > 1 ? (
                        <select className="p-1 mr-2 mb-2 rounded bg-gray-100 text-sm h-6" {...register(`rules.${index}.value`, { required: true })}>
                          <option value="value">select value</option>
                          {formContent.parameter.find(x => x.slug === watch(`rules.${index}.parameter`))?.values.map((d, i) => {
                            return (
                              <option key={i.toString()} value={d}>
                                {d}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                          <input
                            className="p-1 mr-2 mb-2 rounded bg-gray-100 text-sm h-6"
                            type="text"
                            {...register(`rules.${index}.value`, { required: true })}
                          />
                        )}

                      {/* <input className="p-1 mr-2 mb-2 rounded bg-gray-100 text-sm h-6" {...register(`rules.${index}.value`, { required: true })} placeholder="values comma seperated for multiple" /> */}

                      <select className="p-1 mr-2 rounded bg-gray-100 text-sm h-6" {...register(`rules.${index}.state`, { required: true })}>
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
                        className="p-1 mr-2 mb-2 rounded bg-gray-100 text-sm h-6"
                        {...register(`rules.${index}.fault_message`, {
                          required: true,
                        })}
                        placeholder="error message"
                      />

                      <input
                        className="p-1 mr-2 mb-2 rounded bg-gray-100 text-sm h-6"
                        {...register(`rules.${index}.success_message`, {
                          required: true,
                        })}
                        placeholder="success message"
                      />

                      <button className="disabled:opacity-30 bg-neutral-100 px-2 py-1 rounded-lg text-sm" type="button" onClick={() => remove(index)}>
                        Löschen
                      </button>
                    </li>
                  );
                })}
              </ul>
              <section className="mb-4 mt-4">
                <button
                  className="disabled:opacity-30 bg-neutral-100 px-2 py-1 rounded-lg text-sm"
                  type="button"
                  onClick={() => {
                    append(defaultValues);
                  }}
                >
                  hinzufügen
                </button>{" "}
                <button
                  className="disabled:opacity-30 bg-neutral-100 px-2 py-1 rounded-lg text-sm"
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

              {/* <input type="submit" /> */}
            </form>
            <hr></hr>
            <div className="mt-4"></div>
            <details className="text-xs text-neutral-500 p-1">
              <summary>Form output</summary>
              <pre>{JSON.stringify(watch(), 0, 2)}</pre>
            </details>
            <details className="text-xs text-neutral-500 p-1">
              <summary>jsonlogic</summary>
              <pre>{JSON.stringify(jsonlogic, 0, 2)}</pre>
            </details>
            <details className="text-xs text-neutral-500 p-1">
              <summary>Building Data</summary>
              <pre>{JSON.stringify(buildingDataRaw, 0, 2)}</pre>
            </details>
            <details className="text-xs text-neutral-500 p-1">
              <summary>Database Output</summary>
              <pre>{JSON.stringify(databaseFilterOutput, 0, 2)}</pre>
            </details>
          </div>
          <div className="lg:w-1/2 bg-neutral-100 p-8 h-full max-h-screen ">
            <h3 className="text-2xl text-gray-800 mb-4">Testing against building data</h3>
            {jsonlogic.map((rule, index) => {
              return (
                <li key={index} className="list-none mb-4">
                  <details>
                    <summary>
                      {formContent.parameter.find((x) => x.slug === watch().rules[index].parameter)?.name} <strong></strong>{" "}
                      {jsonLogic.apply(rule, buildingData) ? "✅" : watch().rules[index].state === "warning" ? "⚠️" : "❌"}{" "}
                      <span className="text-gray-400">{jsonLogic.apply(rule, buildingData) ? watch().rules[index].success_message : watch().rules[index].fault_message}</span>
                    </summary>
                    <p>
                      <span className="text-gray-400">Text </span>
                      <span className="text-gray-700">{jsonLogic.apply(rule, buildingData) ? watch().rules[index].success_message : watch().rules[index].fault_message}</span>
                    </p>
                    <p>
                      <span className="text-gray-400">name in database </span>
                      <span className="text-gray-700">{watch().rules[index].parameter}</span>
                      <span className="text-gray-400"> result </span>
                      <span className="text-gray-700">{rule && JSON.stringify(jsonLogic.apply(rule, buildingData))}</span>
                    </p>
                    <p>
                      <span className="text-gray-400">building value </span>
                      <span className="text-gray-700">{buildingData[watch().rules[index].parameter]}</span>
                    </p>
                    <pre className="text-xs text-neutral-500 p-1">{JSON.stringify(rule)}</pre>
                    <pre className="text-xs text-neutral-500 p-1">{JSON.stringify(buildingData)}</pre>
                  </details>
                </li>
              );
            })}
            <details className="text-xs text-neutral-500 p-1">
              <summary>Logic Output</summary>
              <pre>{JSON.stringify(FilterLogic({ building: buildingDataRaw, filter: databaseFilterOutput}), 0, 2)}</pre>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
