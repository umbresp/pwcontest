export async function onRequest(context) {
    const query = context.env.submissions.prepare(`SELECT * FROM users WHERE user_id = ${context.params.id}`)
    const result = await query.run()
    return Response.json(result["results"][0])
}