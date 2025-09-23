"use client";
import { builder, Builder } from "@builder.io/react";
import ImageWithText from "./ImageWithText/ImageWithText";
import LinksList from "./LinksList/LinksList";
import Hero from "./Hero/Hero";


builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(Hero, {
  name: "hero", // cómo aparece en Builder
  friendlyName: "Destacado",
  inputs: [
    {
      name: "line1",
      friendlyName: "Línea 1",
      type: "string",
    },
    {
      name: "line2",
      friendlyName: "Línea 2",
      type: "string",
    },
    {
      name: "cta_txt",
      friendlyName: "Llamado a la acción",
      type: "string",
      defaultValue: "Ver obras",      
    },
    {
      name: "cta_url",
      friendlyName: "Enlace",
      type: "url",
      defaultValue: "#",
    },
    {
      name: "photo",
      friendlyName: "Imagen",
      type: "file",
      allowedFileTypes: ["png", "jpg", "jpeg", "webp", "avif"],
    },    
  ]  
});

// ImageWithText
Builder.registerComponent(ImageWithText, {
  name: "ImageWithTexto",
  friendlyName: "Imagen con texto",
  inputs: [
    {
      name: "text",
      friendlyName: "Texto",
      type: "longText",
      defaultValue: "Descripcion de la imagen",
    },
    {
      name: "images",
      friendlyName: "Imágenes",
      type: "array",
      subFields: [
        {
          name: "photo",
          friendlyName: "Imagen",
          type: "file",
          allowedFileTypes: ["png", "jpg", "jpeg", "webp", "avif"],
        },
      ],
    },
  ],
});

// LinksList
Builder.registerComponent(LinksList, {
  name: "LinksList",
  friendlyName: "Lista de enlaces",
  inputs: [
    {
      name: "title",
      friendlyName: "Título",
      type: "string",
    },
    {
      name: "links",
      friendlyName: "Enlaces",
      type: "array",
      subFields: [
        {
          name: "title",
          friendlyName: "Título",
          type: "string"
        },        
        {
          name: "destination",
          friendlyName: "URL",
          type: "url"
        },        
        {
          name: "type",
          friendlyName: "Tipo",
          type: "selector",
          enum: [
            { label: "Interno", value: "internal" },  { label: "Externo", value: "external" }
          ],
          defaultValue: "internal"
        },
      ],
    },
    {
      name: "cta_txt",
      friendlyName: "Llamado a la acción",
      type: "string",
    },
    {
      name: "cta_url",
      friendlyName: "URL llamado a la acción",
      type: "url",
    }
  ],
});
