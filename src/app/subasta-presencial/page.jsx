import apiGetServer from "@/lib/apiGetServer";
import { builder } from "@builder.io/sdk";
import { redirect } from "next/navigation";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default async function Page() {
  const data = await apiGetServer({
    url: "auctions/last",
  });

  if (!data?.subasta?.id) {
    const recepcionObras = await builder
      .get("page", { userAttributes: { urlPath: "/recepcion-de-obras" } })
      .toPromise();

    if (recepcionObras) {
      redirect("/recepcion-de-obras");
    }

    redirect("/subastas-presenciales");
  }

  redirect(`/subasta-presencial/${data.subasta.id}`);
}