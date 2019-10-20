const cacheData = {};
export default function(key, val) {
  if(val) {
    cacheData[key] = val;
    return cacheData;
  }else  {
    return cacheData[key];
  }
};