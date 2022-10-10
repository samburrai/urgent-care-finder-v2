import * as urgentCareData from "./urgent-care-data.json";

export default function handler(req, res) {
    res.status(200).json(urgentCareData);
}