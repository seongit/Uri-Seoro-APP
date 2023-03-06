"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[231],{5551:function(t,s,a){a.d(s,{Z:function(){return o}});var i=function(){var t=this,s=t._self._c;return s("div",[s("nav",{staticClass:"navbar navbar-light"},[s("div",{staticClass:"container"},[s("div",{staticClass:"custom-form"},[s("h1",[t._v(t._s(t.getPageTitle))])]),s("div",{attrs:{id:"menu-item"}},[s("ul",{staticClass:"nav navbar-nav"},[s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link selected",attrs:{"active-class":"active",exact:"",to:{name:"projects"}}},[t._v(" 프로젝트 ")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{"active-class":"active",exact:"",to:{name:"issues"}}},[t._v(" 일감 ")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{"active-class":"active",exact:"",to:{name:"projectEdit"}}},[t._v(" 설정 ")])],1)])])])])])},r=[],e={computed:{getPageTitle(){return this.$route.params.id?"프로젝트명":"Redmine"}}},n=e,l=a(1001),c=(0,l.Z)(n,i,r,!1,null,null,null),o=c.exports},5910:function(t,s,a){a.d(s,{Z:function(){return u}});var i=function(){var t=this,s=t._self._c;return s("div",[s("fieldset",{staticClass:"form-group"},[s("div",{staticClass:"custom-form border-radius"},[s("div",{staticClass:"custom-form-area"},[t._m(0),s("div",{staticClass:"row"},[t._m(1),s("div",{staticClass:"col-sm-10 description-area"},[s("div",{staticClass:"form-control border-radius"},[s("editor")],1)])]),t._m(2),t._m(3),t._m(4)])])]),s("div",{staticClass:"bottomBtn-area"},[s("div",{staticClass:"bottomBtn"},[s("div",[s("button",{staticClass:"btn btn-nomal",attrs:{type:"button"},on:{click:t.projectsListPage}},[t._v("확인")]),s("button",{staticClass:"btn",attrs:{type:"button"},on:{click:t.projectsListPage}},[t._v("취소")])])])])])},r=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-1"},[s("label",{attrs:{for:""}},[t._v("이름 * ")])]),s("div",{staticClass:"col-sm-4"},[s("input",{staticClass:"form-control border-radius",attrs:{type:"text"}})])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"col-sm-1"},[s("label",{attrs:{for:""}},[t._v("설명 ")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-1"},[s("label",{attrs:{for:""}},[t._v("식별자 * ")])]),s("div",{staticClass:"col-sm-4"},[s("input",{staticClass:"form-control border-radius",attrs:{type:"text"}}),s("span",[t._v(" 1에서 100글자 소문자(a-z),숫자,대쉬(-)와 밑줄(_)만 가능합니다. 식별자는 저장후에는 수정할 수 없습니다. ")])])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-1"},[s("label",{attrs:{for:""}},[t._v("공개")])]),s("div",{staticClass:"col-sm-4"},[s("input",{attrs:{type:"checkbox"}})])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-1"},[s("label",{attrs:{for:""}},[t._v("모듈")])]),s("div",{staticClass:"col-sm-4"},[s("input",{attrs:{type:"checkbox"}}),t._v(" 일감관리 ")])])}],e=(a(7658),a(1047)),n={components:{editor:e.Z},methods:{projectsListPage(){this.$router.push({path:"/admin/projects"})}}},l=n,c=a(1001),o=(0,c.Z)(l,i,r,!1,null,"1901f980",null),u=o.exports},3502:function(t,s,a){a.d(s,{Z:function(){return c}});var i=function(){var t=this,s=t._self._c;return s("div",[s("div",{staticClass:"row tabs"},[s("ul",{staticClass:"col-md-6"},[s("li",[s("router-link",{staticClass:"selected",attrs:{to:{name:""}}},[t._v(" 프로젝트 설정 ")])],1),s("li",[s("router-link",{attrs:{to:{name:"projectMembers"}}},[t._v(" 구성원 ")])],1)])])])},r=[],e=a(1001),n={},l=(0,e.Z)(n,i,r,!1,null,null,null),c=l.exports},1047:function(t,s,a){a.d(s,{Z:function(){return u}});var i=function(){var t=this,s=t._self._c;return s("div",[s("editor",{attrs:{options:t.editorOptions,height:"500px",initialEditType:"wysiwyg",previewStyle:"vertical"}})],1)},r=[],e=a(5677),n={components:{editor:e.M},data(){return{editorOptions:{hideModeSwitch:!0}}}},l=n,c=a(1001),o=(0,c.Z)(l,i,r,!1,null,null,null),u=o.exports},6231:function(t,s,a){a.r(s),a.d(s,{default:function(){return d}});var i=function(){var t=this,s=t._self._c;return s("div",[s("the-main-menu"),s("div",{staticClass:"container page"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-11 top-bar"},[s("the-sub-menu")],1)]),s("the-project-form")],1)],1)},r=[],e=a(5551),n=a(5910),l=a(3502),c={components:{TheMainMenu:e.Z,TheProjectForm:n.Z,TheSubMenu:l.Z}},o=c,u=a(1001),v=(0,u.Z)(o,i,r,!1,null,"a4ebfa7e",null),d=v.exports}}]);
//# sourceMappingURL=231.64a44222.js.map