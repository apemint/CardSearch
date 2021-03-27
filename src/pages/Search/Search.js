import React, { useState, useEffect } from "react";
import axios from 'axios';
import CardDetails from '../../components/CardDetails/CardDetails'


function Search() {

    // set state to display cards
    const [cards, setCards] = useState([]);

    // set state to render loading screen, default false ie not showing
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState('Chandra');

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios
        .get(`https://api.magicthegathering.io/v1/cards?name=${search}`)
        .then(res => {
            setCards(res.data.cards);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }


    //basically when component is first mounted, make api call for all cards, then set our cards to all cards
    useEffect(() => {
        //set loading to true while making api call
        setLoading(true);
        //api call
        axios
            .get(`https://api.magicthegathering.io/v1/cards`)
            .then(res => {
                //set card variable to all cards returned
                setCards(res.data.cards);
                //end loading screen
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, []); //only when component mounts






    //if loading is true, render loading
    if (loading) {
        return (
            <p>Loading...</p>
        )
    }





    //else render this
    return (
        <div>
            {/* search form */}
            <h1>Search</h1>
            <input
                value={search}
                type="text"
                placeholder="Search"
                onChange={handleInputChange}
                name="card"
            />
            <button onClick={handleFormSubmit} type="button">Search</button>

            <h1>Cards</h1>
            {/* takes cards variable with all the returned cards and maps them  */}
            {cards.map((card) => (
                // need a unique key when listing/mapping, call carddetails component, ...card spread card object details
                <CardDetails
                    key={card.id}
                    {...card} />
            ))
            }

        </div>
    )
}
export default Search;
