//All code required to interact with the API

const axios = require("axios");
//const API_TOKEN

axios.config( { header: ...} );


 
export function getAllCampaigns(
    let c = await axios.get("url")
    //check that c.status == OK (200)
    //throw some exception;
    return c.data;
);

export function getCampaignStats();
