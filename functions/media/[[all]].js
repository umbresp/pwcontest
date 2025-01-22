export async function onRequest(context) {
    const path = new URL(context.request.url).pathname.replace("/media/", "");
    const file = await context.env.media.get(path);
    if (!file) return new Response(null, { status: 404 });
    return new Response(file.body, {
        headers: { "Content-Type": file.httpMetadata.contentType },
    });
}