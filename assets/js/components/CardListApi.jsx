import React, {useEffect, useState} from 'react';
import axios from "axios";

function CardListAPi() {
    return (
    const [cardInfo, setCardInfo] = useState([]);

    useEffect(() => {
            axios.get("http://127.0.0.1:8000/api/cards/?format=json").then((res) => {
                CardListAPi(res.data);
            });
        }, []);
    )
}

export default CardListAPi;