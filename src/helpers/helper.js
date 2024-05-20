'use strict'
const { getJson } = require("serpapi");

class helpers {
    static async getflight({departure_id, arrival_id, outbound_date, return_date}) {
        try {
            return await getJson({
                engine: "google_flights",
                departure_id: departure_id,
                arrival_id: arrival_id,
                outbound_date: outbound_date,
                return_date: return_date,
                currency: "VND",
                hl: "en",
                api_key: process.env.KEY_FLIGHT
            }, (data) => {
                return data.best_flights;
            });
        }
        catch (err) {
            console.log(err)
        }
    }
    static async getRecommendPlan({ days, city, id, types, amenities_input, budget, type_transport, start_day, end_day, start_point }) {
        const fetch = (await import('node-fetch')).default;
        const url = 'http://127.0.0.1:3005/handle';
        const data = {
            days,
            city,
            id,
            types,
            amenities_input,
            budget,
            type_transport,
            start_day,
            end_day,
            start_point
        };
      
        try {
            const response = await fetch(url, {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            // Parse the JSON response
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
}

module.exports = helpers