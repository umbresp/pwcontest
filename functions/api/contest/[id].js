export async function onRequest(context) {
    const query = context.env.submissions.prepare(`SELECT art${context.params.id}.user_id, art${context.params.id}.filename, users.display_name FROM art${context.params.id} INNER JOIN users ON art${context.params.id}.user_id = users.user_id`)
    const result = await query.run()
    return Response.json(result["results"])
}