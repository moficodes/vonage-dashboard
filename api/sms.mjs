import fetch from "node-fetch";

const baseUrl = "https://api.nexmo.com/v0.1/messages"

async function sendSMS(to, from, messageBody, token) {
    try {
        const body = {
            from: {
                type: "sms",
                number: from,
            },
            to: {
                type: "sms",
                number: to,
            },
            message: {
                content: {
                    type: "text",
                    text: messageBody,
                }
            }
        }
        const response = await fetch(baseUrl, {
            method: "POST", 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(body)
        })
        const json = await response.json();
        return json;
    } catch(error) {
        return error;
    }
}

export {sendSMS};