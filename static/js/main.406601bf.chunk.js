(this["webpackJsonpreact-game-of-life"]=this["webpackJsonpreact-game-of-life"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(13)},,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(4),i=n.n(o),c=(n(10),n(1)),u=(n(11),n(2)),l=[[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]],f=Math.floor((window.innerHeight-50)/20),m=Math.floor(window.innerWidth/20),s=function(){return Array(f).fill(Array(m).fill(!1))};var d=function(){var e=Object(a.useState)((function(){return s()})),t=Object(c.a)(e,2),n=t[0],o=t[1],i=Object(a.useState)(!1),d=Object(c.a)(i,2),b=d[0],p=d[1],h=Object(a.useRef)(b);return h.current=b,r.a.createElement(r.a.Fragment,null,r.a.createElement("header",null,r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life",title:"Wikipedia page of Conway's game of life"},"Conway's Game of Life"),r.a.createElement("button",{className:"run-button",onClick:function(){p(!b),b||(h.current=!0,function e(){h.current&&(o((function(e){return Object(u.a)(e,(function(t){for(var n=function(n){for(var a=function(a){var r=0;l.forEach((function(t){var o=Object(c.a)(t,2),i=o[0],u=o[1],l=n+i,s=a+u;l>=0&&l<f&&s>=0&&s<m&&e[l][s]&&r++})),r<2||r>3?t[n][a]=!1:e[n][a]||3!==r||(t[n][a]=!0)},r=0;r<m;r++)a(r)},a=0;a<f;a++)n(a)}))})),setTimeout(e,100))}())}},b?"Stop":"Start"," simulation"),r.a.createElement("button",{onClick:function(){o(s())}},"Clear grid"),r.a.createElement("button",{onClick:function(){for(var e=[],t=0;t<f;t++)e.push(Array.from(Array(m),(function(){return Math.random()>.7?1:0})));o(e)}},"Random")),r.a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(".concat(m,", 20px)")}},n.map((function(e,t){return e.map((function(e,a){return r.a.createElement("div",{key:"".concat(t,"-").concat(a),className:"cell",style:{width:20,height:20,backgroundColor:n[t][a]?"black":void 0,border:"solid 1px #aaa",boxSizing:"border-box",cursor:"pointer"},onClick:function(){o(Object(u.a)(n,(function(e){e[t][a]=!n[t][a]})))}})}))}))))};i.a.render(r.a.createElement(d,null),document.getElementById("root"))}],[[5,1,2]]]);
//# sourceMappingURL=main.406601bf.chunk.js.map