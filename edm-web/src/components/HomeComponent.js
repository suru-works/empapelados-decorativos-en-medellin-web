import React from 'react';
import { baseUrl } from '../shared/baseUrl';



/*function fechear() {
    
    
    return (JSON.stringify(fetch(baseUrl + 'dishes')))
}*/
async function get() {
    let url = baseUrl + 'dishes';
    let response = await fetch(url);

    let dishes = await response.json(); // read response body and parse as JSON

    alert(dishes[0].name);
    return dishes[0].name;
}

function Home(props) {
    get();
    return (
        <div className="container">
            <p></p>
        </div>
    );
}

export default Home;   