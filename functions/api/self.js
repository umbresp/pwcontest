export async function onRequest(context) {
    const session = context.request.headers.get('session')
    const user = await context.env.pwcontest.get(session)
    return new Response(user)
}