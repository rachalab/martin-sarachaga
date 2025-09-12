import { slugRedirect } from "@/middleware/slugRedirectBatch";
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  //Verifica que estos 2 slug aparezcan para poder dispara slugRedirect para Batch
  if (pathname.includes('/subasta-presencial/') && pathname.includes('/obras/')) {
    return slugRedirect(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/subasta-presencial/:subastaId/obras/:obraId*",
};