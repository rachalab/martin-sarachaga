export default async function apiGetServer({ url }) {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    let url2 = apiUrl + url;

  try {  
    const res = await fetch( url2, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json"
      },
    });

    return await res.json();

  }catch (error) {
    console.error("Error:", error);

    return  {ok: false, error: error.message };
  }
}