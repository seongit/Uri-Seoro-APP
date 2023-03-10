/*eslint-disable */
export default [
  
  {
    name : "id",
    title : "#",
    width : "3%",
  },
  {
    name : "project.name",
    title : "프로젝트명",
    width : "10%",
  },
  {
    name : "tracker.name",
    title : "유형",
    width : "5%",
  },
  {
    name : "status.id",
    title : "상태",
    width : "5%",
    titleClass: "center aligned",
    dataClass: "center aligned",
    formatter (value) { 

      let result = '';
      switch(value){
        case 1 : {result = '<span class="badge badge-status-open">신규</span> '} break;
        case 2 : {result = '<span class="badge badge-priority-mid ">진행</span> '}break;
        case 5 : {result = '<span class="badge badge-status-closed ">완료</span>'} break;
      }

    return result
    }
  },
  {
    name : "priority.id",
    title : "우선순위",
    width : "5%",
    formatter (value) {
      
      let result = ''

      switch(value){
        case 1 : {result = '<span class="badge badge-priority-low">낮음</span> '} break;
        case 2 : {result = '<span class="badge badge-priority-mid ">보통</span> '}break;
        case 3 : {result = '<span class="badge badge-priority-high ">높음</span>'} break;
        case 4 : {result = '<span class="badge badge-priority-top ">긴급</span>'} break;
      }

      return value = result
    }
  },
  {
    name : "subject",
    title : "제목",
    width : "10%",
    formatter (value) {
      let result = ''
      if(value.length > 10){
       return result = value.substr(0,10) + "..."
      }
      return result = value
    }
  },
  {
    name : "updated_on",
    title : "변경일시",
    width : "10%",
    formatter (value) {
     
      let result = "";

       result = value.replace(/\-/g,"/")
      
      return result;
    }
  },
  {
    name : "test-slot",
    title : "상태변경",
    width : "10%",
  },
    
  
];