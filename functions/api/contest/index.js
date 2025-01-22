export async function onRequest(context) {
    const query = context.env.submissions.prepare(`SELECT * FROM contests`)
    const result = await query.run()
    return Response.json(result["results"])
}