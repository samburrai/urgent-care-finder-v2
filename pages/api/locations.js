import * as urgentCareData from "./Urgent_Care_Facilities.json";

export default function handler(req, res) {
  console.log(req);
  let returnData;

  const data = Object.assign({}, urgentCareData);

  const { lid } = req.query;

  if (lid) {
    returnData = data.features.filter(location => location.properties.ID === lid)[0];
  } else {
    returnData = data.features.filter(location => location.properties.STATE === 'NC');    
  }
  
  res.status(200).json(returnData);
}