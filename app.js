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
