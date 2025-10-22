import { headers } from "next/headers";

export async function generatePageMetadata({
  title = "Martín Saráchaga Subastas",
  description = "Martín Saráchaga Subastas",
  url = "",
  images = [],
} = {}) {

  // Obtener dominio actual desde los headers del request
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const baseUrl = `${protocol}://${host}`;

  // Si no hay imágenes, usar por defecto
  const defaultImage = {
    url: "/assets/images/sarachaga_meta_thumb.jpg",
    width: 1200,
    height: 630,
    alt: "Martín Saráchaga Subastas",
  };
  const imageList =
  images?.length > 0
  ? images.map((img) => ({
    url: encodeURI(img?.src || img?.url) || "/assets/images/sarachaga_meta_thumb.jpg",
    width: img?.width || 1200,
    height: img?.height || 630,
    alt: img?.alt || title,
  }))
  : [defaultImage];

  // Armar URL completa si es relativa
  const absoluteUrl = url
    ? url.startsWith("http")
      ? url
      : `${baseUrl}${url}`
    : baseUrl;

  return {
    metadataBase: new URL(baseUrl),
    title: title,
    description: description,
    openGraph: {
      title: `${title}`,
      description: description,
      url: absoluteUrl,
      type: "website",
      images: imageList,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}`,
      description: description,
      images: imageList.map((img) => img.url),
    },
  };
}