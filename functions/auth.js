function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export async function onRequest(context) {
    const API_ENDPOINT = 'https://discord.com/api/v10'
    const CLIENT_ID = context.env.CLIENT_ID
    const CLIENT_SECRET = context.env.CLIENT_SECRET
    const REDIRECT_URI = 'https://pwcontest.pages.dev/auth'
    const IMAGE_BASE_URL = 'https://cdn.discordapp.com'

    const { searchParams } = new URL(context.request.url)
    let code = searchParams.get('code')
    
    const data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI
    }
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    let response = await fetch(API_ENDPOINT + '/oauth2/token', {
        method: "POST",
        headers: headers,
        body: new URLSearchParams(data).toString()
    })
    
    const { token_type, access_token } = await response.json()
    headers["authorization"] = `${token_type} ${access_token}`

    response = await fetch(API_ENDPOINT + '/users/@me', {
        method: "GET",
        headers: headers
    })

    const { id, username, avatar, global_name, accent_color, email } = await response.json()

    response = await fetch(API_ENDPOINT + '/users/@me/guilds?limit=1&after=683557579590467605', {
        method: "GET",
        headers: headers
    })
    const guildList = await response.json()
    console.log(guildList)
    let in_pw = false
    if (guildList[0].id == "683557579590467606") {
        in_pw = true
    }
    const user = {
        "id": id,
        "username": username,
        "avatar": `${IMAGE_BASE_URL}/avatars/${id}/${avatar}.png`,
        "color": accent_color.toString(16),
        "email": email,
        "global_name": global_name === null ? username : global_name,
        "in_pw": in_pw
    }
    const session = guidGenerator()
    await context.env.pwcontest.put(session, JSON.stringify(user))

    return Response.redirect(`https://pwcontest.pages.dev/?session=${session}`)
}