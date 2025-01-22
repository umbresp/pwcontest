import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Contest() {
    const { id } = useParams();

    const getCookie = (name: string) => {
        const cookies = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`));
       
        return cookies ? cookies.split("=")[1] : null;
    };

    const session = getCookie("session"); 

    const [data, setData] = useState<{name: String, entries: any[]}>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://pwcontest.pages.dev/api/contest/${id}`, {
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
        {data ? data.name : ""}
        {data && data["entries"] ? data["entries"].map((element) => (<div>
            <p><a href={"https://pwcontest.pages.dev/user/" + element.user_id}>{element.display_name}</a></p>
            <img src={"https://pwcontest.pages.dev/media/" + element.filename} />
        </div>)) : ""}
    </div>)
}