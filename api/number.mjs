import fetch from "node-fetch";

const baseurl = "https://rest.nexmo.com";

async function getNumbersByApplicationID(apikey, secret, id) {
    try {
        const response = await fetch(`${baseurl}/account/numbers?api_key=${apikey}&api_secret=${secret}&application_id=${id}`);
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export {getNumbersByApplicationID};