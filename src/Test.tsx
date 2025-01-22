import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Test() {
    const [searchParams, setSearchParams] = useSearchParams();

    const setCookie = (name: string, value: string, days: number) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
       
        document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    };

    const getCookie = (name: string) => {
        const cookies = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`));
       
        return cookies ? cookies.split("=")[1] : null;
    };

    const session = searchParams.get('session') || getCookie("session"); 
    
    if (searchParams.get('session')) {
        if (!getCookie("session")) {
            setCookie("session", searchParams.get('session')!, 7);
        }
        setSearchParams([])
    }

    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://pwcontest.pages.dev/api/self', {
                headers: {
                    'session': session??"",
                },
            });
            const result = await response.json();
            setData(result);
        }
        if (session) fetchData();
    }, [session])

    return (
        <div>
            {session && data ? <div><p>Hello, {data['global_name']}!</p>
            <img src={data['avatar']} />
            <p>You are {data['in_pw'] ? "" : "NOT"} in PW.</p></div>
             : <a href="https://discord.com/oauth2/authorize?client_id=1176368330081316915&response_type=code&redirect_uri=https%3A%2F%2Fpwcontest.pages.dev%2Fauth&scope=identify+guilds+email">Log in with Discord</a>}
        </div>
    );
}