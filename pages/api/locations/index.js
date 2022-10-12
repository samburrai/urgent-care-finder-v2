import * as urgentCareData from "../Urgent_Care_Facilities.json";

export default function handler(req, res) {
  const data = Object.assign({}, urgentCareData);
  const locations = data.features
    .filter(location => location.properties.STATE === 'NC')
    .map(location => {
      location.properties.NAME = location.properties.NAME.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
      location.properties.ADDRESS = location.properties.ADDRESS.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
      location.properties.CITY = location.properties.CITY.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
      return location;
    });    
  
  res.status(200).json(locations);
}