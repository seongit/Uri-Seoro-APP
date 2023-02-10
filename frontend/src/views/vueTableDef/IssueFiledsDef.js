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
    return value == 1 ? '<span class="badge badge-status-open ">진행중</span> ' : '<span class="badge badge-status-closed ">완료</span>' ;
    }
  },
  {
    name : "priority.id",
    title : "우선순위",
    width : "5%",
    formatter (value) {
      let test = ''
      if(value == 2){
        test = '<span class="badge badge-status-open ">보통</span> '
      }else if(value == 4){
        test = '<span class="badge badge-status-closed ">긴급</span>'
      }

      return value = test
    }
  },
  {
    name : "subject",
    title : "제목",
    width : "10%",
  },
  {
    name : "updated_on",
    title : "변경일시",
    width : "10%",
  },
  {
    name : "test-slot",
    title : "상태변경",
    width : "10%",
  },
    
  
];