import fetch from "node-fetch";

const baseurl = "https://api.nexmo.com/v2/applications";

async function getApplications(apikey, secret) {
    let buff = Buffer.from(`${apikey}:${secret}`, "utf-8");
    let basicAuth = buff.toString("base64");

    try {
        const response = await fetch(baseurl, { method: 'GET', headers: { "Authorization": "Basic " + basicAuth } });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getApplicationByID(apikey, secret, id) {
    let buff = Buffer.from(`${apikey}:${secret}`, "utf-8");
    let basicAuth = buff.toString("base64");

    try {
        const response = await fetch(baseurl + "/" + id, { method: 'GET', headers: { "Authorization": "Basic " + basicAuth } });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function updateApplicationByID(apikey, secret, id, body) {
    let buff = Buffer.from(`${apikey}:${secret}`, "utf-8");
    let basicAuth = buff.toString("base64");
    try {
        const response = await fetch(baseurl + "/" + id, { method: 'PUT', headers: { "Authorization": "Basic " + basicAuth, "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const json = await response.json();

        return json;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function createApplication(apikey, secret, body, privateKey) {
    let buff = Buffer.from(`${apikey}:${secret}`, "utf-8");
    let basicAuth = buff.toString("base64");

    try {
        const response = await fetch(baseurl, { method: 'POST', headers: { "Authorization": "Basic " + basicAuth, "Content-Type": "application/json" }, body: JSON.stringify(body) });
        const json = await response.json();

        console.log(json);
        return json;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function deleteApplicationByID(apikey, secret, id) {
    let buff = Buffer.from(`${apikey}:${secret}`, "utf-8");
    let basicAuth = buff.toString("base64");
    try {
        const response = await fetch(baseurl+"/"+id, { method: 'DELETE', headers: { "Authorization": "Basic " + basicAuth} });
        
        if (response.status !== 204) {
            throw Error(response.status);
        }
        return;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export { getApplications, getApplicationByID, updateApplicationByID, createApplication, deleteApplicationByID };