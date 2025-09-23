"use client";

//import dynamic from "next/dynamic";
//import { useIsPreviewing } from "@builder.io/react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import "./builder-registry";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Importar BuilderComponent solo en cliente

/*
const BuilderComponent = dynamic(
  () => import("@builder.io/react").then(mod => mod.BuilderComponent),
  { ssr: false }
);
*/
export function RenderBuilderContent({ content, model }) {
  // Call the useIsPreviewing hook to determine if
  // the page is being previewed in Builder
  const isPreviewing = useIsPreviewing();
  // If "content" has a value or the page is being previewed in Builder,
  // render the BuilderComponent with the specified content and model props.
  if (content || isPreviewing) {
    return <BuilderComponent content={content} model={model} />;
  }
  // If the "content" is falsy and the page is
  // not being previewed in Builder, render the
  // DefaultErrorPage with a 404.
  return <DefaultErrorPage statusCode={404} />;
}