/*eslint-disable */
export default [
  
  {
    name : "id",
    title : "#",
    width : "3%",
  },
    
  {
    name : "user.name",
    title : "사용자",
    width : "10%",
  },
    
  {
    name : "roles",
    title : "역할",
    width : "60%",
    formatter (value) {

      let testArr = '';
      let result = '';
      // value는 
      value.forEach(function(item){


        switch(item.id){
          case 3 : {result += '<span class="badge badge-admin">관리자</span> '} break;
          case 4 : {result += '<span class="badge badge-dev">개발자</span> '} break;
          case 5 : {result += '<span class="badge badge-repoter">보고자</span> '} break;

        }

        testArr += item.name + '&nbsp&nbsp&nbsp&nbsp&nbsp';
      })

      return result;
    }
  },
  
  {
    name : "status-slot",
    title : "",
    width : "30%",
  },

];