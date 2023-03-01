/*eslint-disable */
export default [
  
  // {
  //   name : "id",
  //   title : "#",
  //   width : "3%",
  // },
  {
    name : "name",
    title : "프로젝트",
    width : "20%",
  },
  {
    name : "is_public",
    title : "공개",
    width : "10%",
    formatter (value) {

      // <font-awesome-icon icon="fa-solid fa-check"></font-awesome-icon> 를 리턴하게 되면 해당 컴포넌트 그 자제가 문자열로 들어가기 때문에 정상적으로 화면단에 표시가 되지 않음
      // 따라서 svg 형식으로 리턴
      if(value == true) {
        return '<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>'
      }
      
      return ;
    }
  },
  {
    name : "created_on",
    title : "등록일시",
    width : "20%",
    formatter (value) {
     
      let result = "";

       result = value.replace(/\-/g,"/")
      
      return result;
    }
  },
  {
    name : "status-slot",
    title : "상태관리",
    width : "10%",
  },
  
];