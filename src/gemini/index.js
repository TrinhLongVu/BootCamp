const { getJson } = require("serpapi");


run = async () => {
    try {
        await getJson({
            engine: "google_flights",
            departure_id: "PEK",
            arrival_id: "AUS",
            outbound_date: "2024-05-24",
            return_date: "2024-05-30",
            currency: "VND",
            hl: "en",
            api_key: "0816bafdc079d972f5712def992c29b81ec73821e617c8fa9c03cec73ea8c8a0"
          }, (json) => {
            console.log(json);
          });
    }
    catch (err) {
        console.log(err)
    }
}
run()