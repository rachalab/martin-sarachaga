"use client";
import { builder, Builder } from "@builder.io/react";
import ImageWithText from "./ImageWithText/ImageWithText";
import LinksList from "./LinksList/LinksList";
import Hero from "./Hero/Hero";
import Timeline from "./Timeline/Timeline";
import Test from "./Test/Test";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);


Builder.registerComponent(Test, {
  name: "Test", // cómo aparece en Builder
  friendlyName: "Test"
});


Builder.registerComponent(Hero, {
  name: "hero", // cómo aparece en Builder
  friendlyName: "Destacado",
  inputs: [
    {
      name: "text",
      friendlyName: "Texto",
      type: "longText",
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


Builder.registerComponent(Timeline, {
  name: "Timeline", // cómo aparece en Builder
  friendlyName: "Línea de tiempo",
  inputs: [
    {
      name: "subtitle",
      friendlyName: "Texto",
      type: "string"
    },
    {
      name: "years",
      friendlyName: "Años",
      type: "array",
      subFields: [
        {
          name: "date",
          friendlyName: "Año",
          type: "integer"
        },
        {
          name: "description",
          friendlyName: "Descripción",
          type: "longText"
        },
        {
          name: "photo",
          friendlyName: "Imagen",
          type: "file",
          allowedFileTypes: ["png", "jpg", "jpeg", "webp", "avif"],
        },
        {
          name: "alt",
          friendlyName: "Texto alternativo",
          type: "string"
        }
      ]
    }
  ]
});

