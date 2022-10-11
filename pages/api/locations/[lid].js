import * as urgentCareData from "../Urgent_Care_Facilities.json";

export default function handler(req, res) {
  const { lid } = req.query;
  const data = Object.assign({}, urgentCareData);
  const location = data.features.filter(location => location.properties.ID === lid)[0];    
  
  res.status(200).json(location);
}