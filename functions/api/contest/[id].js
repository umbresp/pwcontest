export async function onRequest(context) {
    let query = context.env.submissions.prepare(`SELECT entries.user_id, entries.filename, users.display_name FROM entries INNER JOIN users ON entries.user_id = users.user_id`)
    let result = await query.run()
    const entries = result["results"]
    query = context.env.submissions.prepare(`SELECT * FROM contests WHERE contests.id = ${context.params.id}`)
    result = await query.run()
    const resp = result["results"][0]
    resp["entries"] = entries
    return Response.json(resp)
}