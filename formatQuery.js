
module.exports = function(query) {
    let newQuery = {};
    for(let key in query) {      
       let splited = key.split("_");
       let newKey = splited[0];     
       switch(key) {
            case (newKey + '_from'): 
            newQuery[newKey] = {$gte: query[key], ...newQuery[newKey]};                             
                break;

            case (newKey + '_to'): 
            newQuery[newKey] = {$lte: query[key], ...newQuery[newKey]};                       
                break;

            default:
                newQuery[key] = query[key];
       }      
     };
     return newQuery
}