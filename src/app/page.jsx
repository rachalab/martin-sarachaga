import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../components/builder/builder";
import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import Footer from "../components/structure/Footer/Footer";
import { generatePageMetadata } from "@/lib/generatePageMetadata";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function generateMetadata({ params }) {
  const urlPath = "/" + ((await params?.page?.join("/")) || "");
  
  const content = await builder
    .get("page", { userAttributes: { urlPath } })
    .toPromise();

  return generatePageMetadata({
    title: content?.data?.title + ' — Martín Saráchaga Subastas' || "Martín Saráchaga Subastas",
    description: content?.data?.description || "Martín Saráchaga Subastas",
    url: urlPath
  });
}

export default async function Page(props) {
  const builderModelName = "page";

  const searchParams = await props.searchParams;

  const isBuilder = searchParams["builder.space"] ? true : false;

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + ((await props?.params)?.page?.join("/") || ""),
      },
    })
    // Convert the result to a promise
    .toPromise();

  if (isBuilder) {
    // 🚫 No envolver con MainWrapper (evita conflictos en editor)
    return (
      <>
        <RenderBuilderContent content={content} model={builderModelName} />
        <Footer />
      </>
    );
  }

  // ✅ En el sitio real, envolver con MainWrapper
  return (
    <MainWrapper>
      <RenderBuilderContent content={content} model={builderModelName} />
      <Footer />
    </MainWrapper>
  );
}