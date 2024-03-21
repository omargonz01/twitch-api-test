require('dotenv').config();
const axios = require('axios');

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_SECRET;

const getOAuthToken = async () => {
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            }
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching OAuth token:', error.message);
    }
};

const getTwitchData = async (token) => {
    try {
        const response = await axios.get('https://api.twitch.tv/helix/streams', {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error fetching Twitch data:', error.message);
    }
};

getOAuthToken().then(token => getTwitchData(token));

const rasa = require('rasajs');

// Initialize the URL of Rasa
rasa.baseUrl('http://localhost:5005');

// Send a message to Rasa and log the response
rasa.sendMessage('hi', res => {
    console.log(res);
});

const getTwitchData2 = async (token) => {
    try {
        const response = await axios.get('https://api.twitch.tv/helix/streams', {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${token}`
            }
        });

        // Send a message to Rasa with the Twitch data
        rasa.sendMessage(response.data, res => {
            console.log(res);
        });

    } catch (error) {
        console.error('Error fetching Twitch data:', error.message);
    }
};