import * as urgentCareData from "../Urgent_Care_Facilities.json";

export default function handler(req, res) {
  const data = Object.assign({}, urgentCareData);
  const locations = data.features.filter(location => location.properties.STATE === 'NC');    
  
  res.status(200).json(locations);
}