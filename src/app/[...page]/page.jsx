import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder/builder";
import MainWrapper from "../../components/structure/MainWrapper/MainWrapper";
import Heading from "../../components/structure/Heading/Heading";
import { notFound } from "next/navigation";
import Footer from "../../components/structure/Footer/Footer";
import { generatePageMetadata } from "@/lib/generatePageMetadata";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function generateMetadata({ params }) {

  const { page } = await params;

  const urlPath = "/" + ((page?.join("/")) || "");
  
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
  const searchParams = await props.searchParams;

  const isBuilder = searchParams["builder.space"] ? true : false;
  
  const urlPath = "/" + ((await props?.params)?.page?.join("/") || "");
  
  const builderModelName = "page";

  const content = await builder
    .get(builderModelName, { userAttributes: { urlPath } })
    .toPromise();

  // If no content is found, trigger a 404
  (content && builderModelName) ?? notFound();

  const contentFooter = await builder
    .get("footer", { userAttributes: { urlPath: "/footer" } })
    .toPromise();

  // Render for Builder editor
  if (isBuilder) {
    return (
      <>
        {content?.data?.title && <Heading data={{heading: content?.data?.title}} />}    
        <RenderBuilderContent content={content} model={builderModelName} />
        {contentFooter?.data && <Footer content={contentFooter?.data} model={"footer"} /> }      
      </>
    );
  }

  // ✅ En el sitio real, envolver con MainWrapper
  return (
    <MainWrapper>
      {content?.data?.title && <Heading data={{heading: content?.data?.title}} />}
      <RenderBuilderContent content={content} model={builderModelName} />
      {contentFooter?.data && <Footer content={contentFooter?.data} model={"footer"} /> }
    </MainWrapper>
  );
}