(this.webpackJsonpsample=this.webpackJsonpsample||[]).push([[0],{12:function(e,t,s){},14:function(e,t,s){"use strict";s.r(t);var a=s(1),i=s.n(a),c=s(6),n=s.n(c),l=s(7),r=s(5),o=(s(12),s(0));var d=function(){var e=Object(a.useState)(""),t=Object(r.a)(e,2),s=t[0],i=t[1],c=Object(a.useState)((function(){var e=localStorage.getItem("Storage");return JSON.parse(e)||""})),n=Object(r.a)(c,2),d=n[0],j=n[1],u=d&&d.findIndex((function(e){return 1==e.statusRemove}));u>-1&&d&&d.splice(u,1);var m=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date).getDay()],b=new Date,v=b.getHours(),h=v>=12?"PM":"AM",f=v%12,x=b.getDate()+"."+(b.getMonth()+1)+"."+b.getFullYear(),O=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][b.getDay()],p=(0===f&&(f=12),f+":"+b.getMinutes()+":"+b.getSeconds()+" "+h)+" "+O+" "+x;return Object(a.useEffect)((function(){localStorage.setItem("Storage",JSON.stringify(d))}),[d]),Object(o.jsxs)("div",{className:"app",children:[Object(o.jsx)("div",{className:"appUpdateLogoContainer",children:Object(o.jsx)("a",{href:"https://todo-list-react-web.netlify.app",children:Object(o.jsx)("i",{class:"fas fa-sync-alt",title:"Update"})})}),Object(o.jsxs)("div",{className:"headings",children:[Object(o.jsx)("div",{className:"mainHeading",children:Object(o.jsx)("h1",{className:"gradient-text",children:"ToDo List"})}),Object(o.jsx)("div",{className:"subHeading",children:Object(o.jsxs)("h2",{className:"gradient-text2",children:["Hey, it's ",m]})})]}),Object(o.jsx)("form",{onSubmit:function(e){e.preventDefault(),s&&(j([].concat(Object(l.a)(d),[{id:Date.now(),text:s,toDoTime:p,statusErase:!1,statusDone:!1,statusDrop:!1,statusRetrieve:!1,statusRemove:!1}])),i(""))},children:Object(o.jsxs)("div",{className:"toDoInput",children:[Object(o.jsx)("div",{className:"left",children:Object(o.jsx)("input",{value:s,onChange:function(e){i(e.target.value)},type:"text",placeholder:" Plan Something . . ."})}),Object(o.jsx)("div",{className:"right erase",children:Object(o.jsx)("i",{onClick:function(){i("")},className:"fas fa-eraser",title:"Clear"})}),Object(o.jsx)("div",{className:"rightEnd  add",children:Object(o.jsx)("button",{style:{border:"none",outline:"none",backgroundColor:"#fff"},type:"submit",children:Object(o.jsx)("i",{className:"fas fa-plus",title:"Add"})})})]})}),Object(o.jsxs)("div",{className:"container done",children:[Object(o.jsx)("h3",{children:"Done"}),d&&d.map((function(e){if(e.statusDone&&!e.statusRemove)return Object(o.jsxs)("div",{className:"toDo",children:[Object(o.jsx)("div",{className:"left"}),Object(o.jsx)("div",{className:"top",children:Object(o.jsx)("p",{className:"textCross",children:e.text})}),Object(o.jsx)("div",{className:"bottom",children:Object(o.jsx)("p",{children:e.toDoTime})}),Object(o.jsx)("div",{className:"right bin",children:Object(o.jsx)("i",{onClick:function(t){window.confirm("Deleting ToDo permanently !")&&(t.target.value=!0),j(d.filter((function(s){return s.id===e.id&&(s.statusRemove=t.target.value),s})))},value:e.statusRemove,className:"fas fa-trash-alt",title:"Remove"})})]},e.id)}))]}),Object(o.jsxs)("div",{className:"container onGoing",children:[Object(o.jsx)("h3",{children:"On Going"}),d&&d.map((function(e){return e.statusDone||e.statusDrop?e.statusRetrieve&&!e.statusDone?Object(o.jsxs)("div",{className:"toDo",children:[Object(o.jsx)("div",{className:"left tick",children:Object(o.jsx)("i",{onClick:function(t){t.target.value=!0,j(d.filter((function(s){return s.id===e.id&&(s.statusDone=t.target.value),s})))},value:e.statusDone,className:"fas fa-check",title:"Done"})}),Object(o.jsx)("div",{className:"top",children:Object(o.jsx)("p",{children:e.text})}),Object(o.jsx)("div",{className:"bottom",children:Object(o.jsx)("p",{children:e.toDoTime})}),Object(o.jsx)("div",{className:"right close",children:Object(o.jsx)("i",{onClick:function(t){t.target.value=!0,j(d.filter((function(s){return s.id===e.id&&(s.statusDrop=t.target.value,e.statusRetrieve=!t.target.value),s})))},value:e.statusDrop,className:"fas fa-times",title:"Drop"})})]},e.id):void 0:Object(o.jsxs)("div",{className:"toDo",children:[Object(o.jsx)("div",{className:"left tick",children:Object(o.jsx)("i",{onClick:function(t){t.target.value=!0,j(d.filter((function(s){return s.id===e.id&&(s.statusDone=t.target.value),s})))},value:e.statusDone,className:"fas fa-check",title:"Done"})}),Object(o.jsx)("div",{className:"top",children:Object(o.jsx)("p",{children:e.text})}),Object(o.jsx)("div",{className:"bottom",children:Object(o.jsx)("p",{children:e.toDoTime})}),Object(o.jsx)("div",{className:"right close",children:Object(o.jsx)("i",{onClick:function(t){t.target.value=!0,j(d.filter((function(s){return s.id===e.id&&(s.statusDrop=t.target.value),s})))},value:e.statusDrop,className:"fas fa-times",title:"Drop"})})]},e.id)}))]}),Object(o.jsxs)("div",{className:"container dropped",children:[Object(o.jsx)("h3",{children:"Dropped"}),d&&d.map((function(e){if(e.statusDrop&&!e.statusRetrieve&&!e.statusRemove)return Object(o.jsxs)("div",{className:"toDo",children:[Object(o.jsx)("div",{className:"left recycle",children:Object(o.jsx)("i",{onClick:function(t){window.confirm("Retrieving dropped ToDo")&&(t.target.value=!0),j(d.filter((function(s){return s.id===e.id&&(s.statusRetrieve=t.target.value),s})))},value:e.statusRetrieve,className:"fas fa-redo-alt",title:"Retrieve"})}),Object(o.jsx)("div",{className:"top",children:Object(o.jsx)("p",{className:"textCross",children:e.text})}),Object(o.jsx)("div",{className:"bottom",children:Object(o.jsx)("p",{children:e.toDoTime})}),Object(o.jsx)("div",{className:"right bin",children:Object(o.jsx)("i",{onClick:function(t){window.confirm("Deleting ToDo permanently !")&&(t.target.value=!0),j(d.filter((function(s){return s.id===e.id&&(s.statusRemove=t.target.value),s})))},value:e.statusRemove,className:"fas fa-trash-alt",title:"Remove"})})]},e.id)}))]})]})};n.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(d,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.b7b77321.chunk.js.map