/*eslint-disable */
export default [
  
  {
    name : "name",
    title : "name",
    width : "20%",
  },
  {
    name : "langName",
    title : "langName",
    width : "2%",
  },
  {
    name : "type",
    title : "type",
    width : "2%",
  },
  {
    name : "sysTags",
    title : "sysTags",
    width : "10%",
    formatter(value){
      let result,tmp = ""
      let tmpArr = [];
      tmpArr = value

      for(let i = 0; i < tmpArr.length; i++){
        tmp += tmpArr[i] + ",";
        result = tmp.slice(0,-1);
      }
  
      return result;
    }
  },
];