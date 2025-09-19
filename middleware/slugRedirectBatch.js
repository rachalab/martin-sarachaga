import { NextResponse } from "next/server";
import apiGetServer from "@/lib/apiGetServer"; // 👈 lo importamos

export async function slugRedirect(req) {
  const url = req.nextUrl.clone();
  const parts = url.pathname.split("/").filter(Boolean);

  if (parts.length < 3) return NextResponse.next();

  const subastaId = parts[1];
  const obraId = parts[3];
  const batchId = obraId.split("-")[0];
  
  //Base Url
  const url_base = parts[0] + "/" + parts[1] + "/" + parts[2];

  // usamos apiGetServer en vez de fetch
  const data = await apiGetServer({
    url: `batch/${batchId}`,
  });

  if (!data?.lote?.id) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  if (data?.subasta?.id !== parseInt(subastaId)) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  const expectedObraId = `${batchId}-${data.lote.slug}`;

  if (obraId !== expectedObraId) {
    url.pathname = `${url_base}/${expectedObraId}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}