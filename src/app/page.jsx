import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../components/builder/builder";
import MainWrapper from "../components/structure/MainWrapper/MainWrapper";
import Footer from "../components/structure/Footer/Footer";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

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
    return <RenderBuilderContent content={content} model={builderModelName} />;
  }

  // ✅ En el sitio real, envolver con MainWrapper
  return (
    <MainWrapper>
      <RenderBuilderContent content={content} model={builderModelName} />
      <Footer />
    </MainWrapper>
  );
}