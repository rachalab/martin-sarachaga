"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./Counter/Counter";
import NavCategory from "./NavCategory/NavCategory";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(Counter, {
  name: "Counter",
});


// Registramos NavCategory
Builder.registerComponent(NavCategory, {
  name: "NavCategory",
  inputs: [
    {
      name: "categories",
      type: "list",
      subFields: [
        {
          name: "name",
          type: "string",
          defaultValue: "Nueva categoría",
        },
        {
          name: "images",
          type: "list",
          subFields: [
            {
              name: "url",
              type: "url",
              allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
            }
          ]
        },        
       /* {
          name: "images",
          type: "list",
          subFields: [
            {
              name: "image",
              type: "file",
              allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
            },
          ],
        },*/
      ],
    },
  ],
});


