"use client";
import { builder, Builder } from "@builder.io/react";
import ImageWithText from "./ImageWithText/ImageWithText";
import ReceptionDetail from "./ReceptionDetail/ReceptionDetail";
import LinksList from "./LinksList/LinksList";
import Hero from "./Hero/Hero";
import Timeline from "./Timeline/Timeline";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);


Builder.registerComponent(Hero, {
  name: "hero", // cómo aparece en Builder
  image: "https://martin-sarachaga.vercel.app/assets/icons/hero_ico.svg",
  friendlyName: "Portada",
  inputs: [
    {
      name: "text",
      friendlyName: "Título",
      type: "longText",
    },
    {
      name: "description",
      friendlyName: "Descripción",
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
  image: "https://martin-sarachaga.vercel.app/assets/icons/img_w_t_ico.svg",
  friendlyName: "Imagen con párrafos",
  inputs: [
    {
      name: "text",
      friendlyName: "Texto",
      type: "richText",
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

// ReceptionDetail
Builder.registerComponent(ReceptionDetail, {
  name: "ReceptionDetail",
  image: "https://martin-sarachaga.vercel.app/assets/icons/img_w_t_plus_ico.svg",
  friendlyName: "Imagen con destacado, párrafos y CTA",
  inputs: [
    {
      name: "highlighted",
      friendlyName: "Texto destacado",
      type: "string"
    },
    {
      name: "text",
      friendlyName: "Texto",
      type: "richText",
      defaultValue: "Descripcion de la imagen",
    },
    {
      name: "cta_txt",
      friendlyName: "Llamado a la acción",
      type: "string",     
    },
    {
      name: "cta_url",
      friendlyName: "Enlace",
      type: "url",
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
  image: "https://martin-sarachaga.vercel.app/assets/icons/links_list_ico.svg",
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
  image: "https://martin-sarachaga.vercel.app/assets/icons/timeline_ico.svg",
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

