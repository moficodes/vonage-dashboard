import fetch from "node-fetch";

const baseurl = "https://rest.nexmo.com/account/get-balance";

async function getBalance(apikey, secret) {
    try {
        const response = await fetch(`${baseurl}?api_key=${apikey}&api_secret=${secret}`);
        const json = await response.json();
        return json;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export default getBalance;