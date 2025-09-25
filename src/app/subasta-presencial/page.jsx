import apiGetServer from "@/lib/apiGetServer";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const data = await apiGetServer({
    url: "auctions/last",
  });

  if (!data?.subasta?.id) {
    notFound();
  }

  redirect(`/subasta-presencial/${data.subasta.id}`);
}