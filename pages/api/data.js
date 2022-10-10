import * as urgentCareData from "./urgent-care-data.json";

export default function handler(req, res) {
    const data = Object.assign({}, urgentCareData);
    const locations = data.features.slice(0, 200);
    res.status(200).json(locations);
}