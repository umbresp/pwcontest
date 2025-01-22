export async function onRequest(context) {
    const query = context.env.submissions.prepare(`SELECT * FROM users`)
    const result = await query.run()
    return Response.json(result["results"])
}