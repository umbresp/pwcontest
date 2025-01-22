import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function User() {
    const { id } = useParams();

    const getCookie = (name: string) => {
        const cookies = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`));
       
        return cookies ? cookies.split("=")[1] : null;
    };

    const session = getCookie("session"); 

    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://pwcontest.pages.dev/api/user/${id}`, {
                headers: {
                    'session': session??"",
                },
            });
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, [id])

    return (<div>
        {data ? <p>{data.discord_id} @{data.discord_username} {data.display_name}</p>: ""}
    </div>)
}