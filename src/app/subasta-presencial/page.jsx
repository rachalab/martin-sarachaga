import apiGetServer from "@/lib/apiGetServer";
import { redirect } from "next/navigation";

export default async function Page() {
  const data = await apiGetServer({
    url: "auctions/last",
  });

  if (!data?.subasta?.id) {
    redirect(`/404`);
  }

  redirect(`/subasta-presencial/${data.subasta.id}`);
}