"use strict";var q=Object.create;var D=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var U=Object.getOwnPropertyNames;var H=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty;var Q=(o,e)=>{for(var t in e)D(o,t,{get:e[t],enumerable:!0})},T=(o,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of U(e))!J.call(o,n)&&n!==t&&D(o,n,{get:()=>e[n],enumerable:!(s=W(e,n))||s.enumerable});return o};var v=(o,e,t)=>(t=o!=null?q(H(o)):{},T(e||!o||!o.__esModule?D(t,"default",{value:o,enumerable:!0}):t,o)),Y=o=>T(D({},"__esModule",{value:!0}),o);var oe={};Q(oe,{Bgc:()=>V,Colors:()=>p,Formatter:()=>h,Fragmenter:()=>S,Loggings:()=>j,LoggingsColors:()=>M,LoggingsConsole:()=>R,LoggingsPlugin:()=>_,LoggingsRegister:()=>B,Rgb:()=>g,StaticFormatter:()=>I,Timer:()=>C,Timers:()=>w,Uptimer:()=>Z,console_defaults:()=>N,inspector:()=>$,register_defaults:()=>A});module.exports=Y(oe);var k=1,f=!1;if(!f)try{document&&(k=3,f=!0)}catch{}if(!f)try{Deno&&(k=0,f=!0)}catch{}if(!f)try{Bun&&(k=2,f=!0)}catch{}if(!f)try{process&&(k=1,f=!0)}catch{}var y=k;var O=v(require("module"),1),K={},z=O.default.createRequire(K.url);function G(){switch(y){case 0:return o=>Deno.inspect(o,{colors:!0});case 1:{let{inspect:o}=z("util");return e=>o(e,{colors:!0})}case 2:return o=>globalThis.Bun.inspect(o,{colors:!0});case 3:return o=>inspect(o,{colors:!0});default:return o=>inspect(o,{colors:!0})}}var $=G();var V=(o,e,t)=>{let s=[o,e,t];for(let n of s){let i=s[n];i>255?s[n]=255:i<1&&(s[n]=1)}return`\x1B[48;2;${s[0]};${s[1]};${s[2]}m`},g=(o,e,t)=>{let s=[o,e,t];for(let n of s){let i=s[n];i>255?s[n]=255:i<1&&(s[n]=1)}return`\x1B[38;2;${s[0]};${s[1]};${s[2]}m`},X={red:g(255,0,0),green:g(0,255,0),lime:g(128,255,128),blue:g(0,0,255),yellow:g(255,255,0),cyan:g(0,255,255),magenta:g(255,0,255),black:g(0,0,0),white:g(255,255,255),gray:g(128,128,128),maroon:g(128,0,0),olive:g(128,128,0),navy:g(0,0,128),purple:g(128,0,128),teal:g(0,128,128),silver:g(192,192,192),indigo:g(75,0,130),gold:g(255,215,0),pink:g(255,192,203),orange:g(255,165,0),brown:g(165,42,42),peach:g(255,218,185),lavender:g(230,230,250),coral:g(255,127,80),turquoise:g(64,224,208),salmon:g(250,128,114),olivebrab:g(107,142,35),slate:g(112,128,144),lsgreen:g(32,178,170),dorange:g(255,140,0),khaki:g(240,230,140),mvred:g(199,21,133),dsalmon:g(233,150,122),lpink:g(255,182,193),dgray:g(105,105,105),gainsboro:g(220,220,220),nred:g(255,45,0),ngreen:g(57,255,20),nblue:g(0,0,255),nyellow:g(255,255,51),ncyan:g(0,255,255),nmagenta:g(255,0,255),npink:g(255,20,147),norange:g(255,165,0),npurple:g(128,0,255),nturquoise:g(0,255,255),nviolet:g(238,130,238),ncoral:g(255,127,80)},M={inverse:"\x1B[7m",none:"none",reset:"\x1B[0m",bold:"\x1B[1m",def:"\x1B[49m",normal:"\x1B[22m",blink:"\x1B[5m",nblink:"\x1B[25m",hidden:"\x1B[8m",visible:"\x1B[28m",over:"\x1B[53m",nover:"\x1B[55m",dtext:"\x1B[2m",italic:"\x1B[3m",icolor:"\x1B[7m",ncolor:"\x1B[27m",strike:"\x1B[9m",nstrike:"\x1B[29m",under:"\x1B[4m",dunder:"\x1B[21m",nunder:"\x1B[24m",cunder:"\x1B[4:3m",dounder:"\x1B[4:4m",daunder:"\x1B[4:5m",runder:"\x1B[59m",...X};function p(o,e,t){let s=Object.assign(M,t),n=s[o];return n=="none"?e:n?n+e+s.reset:e}function S(o,e="<*>"){let[t,s]=e.split("*"),n=[],i=/\[([^\]]*)\]\.(\w+)(-b)?/g;return{text:o.replace(i,(r,a,m,E)=>{let u=E==="-b",b=a.replace(/^\[|\]$/g,"");n.push({key:m,value:b,bold:u});let L=a.startsWith("[")?"[":"",P=a.endsWith("]")?"]":"";return`${L}${t}${m}${s}${P}`}).trim(),frags:n}}function h(...o){return I({},"{{{{*}}}}",...o)}function I(o,e,...t){let s="",n="";return t.forEach(i=>{if(typeof i=="string"){let l=S(i,e);l.frags.forEach(r=>{let a=r.value;r.bold&&(a=p("bold",r.value,o)),Object.keys(M).includes(r.key)&&(a=p(r.key,a,o)),l.text=l.text.replace(`${e.split("*")[0]}${r.key}${e.split("*")[1]}`,a)}),s+=l.text}else s+=$(i)}),t.forEach(i=>{if(typeof i=="string"){let l=/\[([^\]]+)\]\.(\w+)(-b)?/g,r=i.replace(l,(b,L)=>`"${L}"`),a=/\x1B[[(?);]{0,2}(;?\d)*./g,m=r.replace(a,""),E=/"(\d{1,})".*?"(\d{1,})"/g,u=m.replace(E,(b,L,P)=>`"${L}"${P}"`);n+=u}else typeof i=="number"?n+=` ${i.toString()}`:typeof i=="boolean"?n+=` ${i.toString()}`:typeof i=="object"?n+=` "${JSON.stringify(i,null,2)}"`:n+=` "${i}"`}),[s,n]}var w=(r=>(r.year="year",r.month="month",r.day="day",r.hours="hours",r.minutes="minutes",r.seconds="seconds",r.milliseconds="milliseconds",r))(w||{});function Z(o,e=!1){let t=o,s=Math.floor(t/86400),n=Math.floor(t/3600)%24,i=Math.floor(t/60)%60,l=Math.floor(t)%60,r=Math.floor(t%1*1e3);return e?`${s>0?s+"d ":""}${n>0?n+"h ":""}${i>0?i+"m ":""}${l?l+".":"0."}${r>0?r+"s":""}`:`${s>0?s+"d ":""}${n>0?n+"h ":""}${i>0?i+"m ":""}${l>0?l+"s ":"0s"}`}function C(o){let e=new Date,t={timestamp:Date.now(),year:String(e.getFullYear()),month:String(e.getMonth()+1).padStart(2,"0"),day:String(e.getDate()).padStart(2,"0"),hours:String(e.getHours()).padStart(2,"0"),minutes:String(e.getMinutes()).padStart(2,"0"),seconds:String(e.getSeconds()).padStart(2,"0"),milliseconds:String(e.getMilliseconds()).padStart(3,"0")};for(let s in w)if(Object.prototype.hasOwnProperty.call(w,s)){let n=s;o=o.replace(new RegExp(`{${w[n]}}`,"g"),t[w[n]])}return{format:o,timer:t}}function _(o){let e=()=>{};return{...o,identify:o.identify,defaults:o.defaults??{},onMessage:o.onMessage??e,onCreateInstance:o.onCreateInstance??e,onAddPlugin:o.onAddPlugin??e,onRemPlugin:o.onRemPlugin??e}}var N={format:"[{status}] {title} [{hours}:{minutes}:{seconds}].gray {message}",status:{trace:"ncoral",error:"nred",warn:"nyellow",info:"nblue",debug:"npurple"},console:!0,level:"info",color_fallback:"cyan",disable_colors:!1,title:"All",color:"cyan"},R={identify:"LoggingsConsole",defaults:N,onMessage(o,e,t){if(o.level=o.console_level?o.console_level:o.level,o.console&&e>=o.level){let s=h(o.format)[o.disable_colors?1:0];s=C(s).format,o.disable_colors?(s.includes("{title}")&&(s=s.replace(new RegExp("{title}","g"),o.title)),s.includes("{status}")&&(s=s.replace(new RegExp("{status}","g"),e)),s.includes("{message}")&&(s=s.replace(new RegExp("{message}","g"),h(...t)[1]))):(s.includes("{title}")&&(s=s.replace(new RegExp("{title}","g"),p(o.color,o.title))),s.includes("{status}")&&(s=s.replace(new RegExp("{status}","g"),p(o.status[e],p("bold",e)))),s.includes("{message}")&&(s=s.replace(new RegExp("{message}","g"),h(...t)[0]))),ee(e,s)}}};function ee(o,e){switch(y){case 0:{let s=new TextEncoder().encode(`${e}
`);["info","debug"].includes(o.toLowerCase())?Deno.stdout.write(s):Deno.stderr.write(s);break}case 1:{["info","debug"].includes(o.toLowerCase())?process.stdout.write(`${e}
`):process.stderr.write(`${e}
`);break}case 2:{["info","debug"].includes(o.toLowerCase())?Bun.write(Bun.stdout,`${e}
`):Bun.write(Bun.stderr,`${e}
`);break}case 3:{console[o.toLowerCase()](e);break}default:throw new Error("Unknown environment")}}var x=v(require("path"),1),d=v(require("fs"),1),A={register:!0,register_del:!0,register_limit:10,register_dir:"./logs",register_locale_file:"{register_dir}",register_filename:"{day}_{month}_{year}.{ext}",register_format:"[ {day}/{month}/{year}-{hours}:{minutes}:{seconds} ] [ _.{title}._ ] {message}"},B={identify:"LoggingsRegister",defaults:A,onMessage(o,e,t){if(o.level=o.register_level?o.register_level:o.level,o.register&&e>=o.level){let s=o.register_locale_file.replace(new RegExp("{register_dir}","g"),o.register_dir);s=s.replace(new RegExp("{title}","g"),o.title),s=s.replace(new RegExp("{status}","g"),e);let n=C(o.register_filename).format.replace(new RegExp("{status}","g"),e).replace(new RegExp("{ext}","g"),"log"),i=o.register_format;i=C(i).format,i.includes("{title}")&&(i=i.replace(new RegExp("{title}","g"),o.title)),i.includes("{status}")&&(i=i.replace(new RegExp("{status}","g"),e)),i.includes("{message}")&&(i=i.replace(new RegExp("{message}","g"),h(...t)[1]));let l=x.default.join(s,n),r=x.default.resolve(x.default.join(s));if(d.default.existsSync(r)||d.default.mkdirSync(r,{recursive:!0}),d.default.appendFileSync(l,i+`
`),o.register_del&&o.register_limit>0){let a=new RegExp(".log"),m=d.default.readdirSync(s).filter(u=>a.test(u)).sort((u,b)=>{let L=d.default.statSync(x.default.join(s,u)),P=d.default.statSync(x.default.join(s,b));return L.mtime.getTime()-P.mtime.getTime()});m.slice(0,m.length-o.register_limit).forEach(u=>{let b=x.default.join(s,u);d.default.unlinkSync(b)})}}}};var c=class o{static configs={};configs={};static plugins=[];plugins=[];static reset(){o.plugins.length=0}reset(){this.plugins.length=0}static add(...e){e.forEach(t=>{let s=_(t);s.defaults&&Object.assign(o.configs,s.defaults),o.plugins.forEach(n=>n.onAddPlugin(s)),o.plugins.push(s)})}add(...e){e.forEach(t=>{t.defaults&&Object.assign(this.configs,t.defaults),this.plugins.forEach(s=>s.onAddPlugin(t)),this.plugins.push(t)})}static get(e){return o.plugins.find(t=>t.identify===e)}get(e){return this.plugins.find(t=>t.identify===e)}static rem(e){o.plugins=o.plugins.filter(t=>{let s=t.identify===e;return s&&(o.plugins.forEach(n=>n.onRemPlugin(t)),t.defaults&&Object.keys(t.defaults).forEach(n=>delete o.configs[n])),!s})}rem(e){this.plugins=this.plugins.filter(t=>{let s=t.identify===e;return s&&(this.plugins.forEach(n=>n.onRemPlugin(t)),t.defaults&&Object.keys(t.defaults).forEach(n=>delete this.configs[n])),!s})}controller(e,t){this.plugins.forEach(s=>{s.onMessage({...o.configs,...this.configs},t,e)})}log(...e){this.controller(e,"info")}error(...e){this.controller(e,"error")}trace(...e){this.controller(e,"trace")}debug(...e){this.controller(e,"debug")}warn(...e){this.controller(e,"warn")}info(...e){this.controller(e,"info")}static controller(e,t){o.plugins.forEach(s=>{s.onMessage({...o.configs,...this.configs},t,e)})}static log(...e){o.controller(e,"info")}static error(...e){o.controller(e,"error")}static trace(...e){o.controller(e,"trace")}static debug(...e){o.controller(e,"debug")}static warn(...e){o.controller(e,"warn")}static info(...e){o.controller(e,"info")}};switch(y){case 0:case 1:case 2:c.add(R,B);break;case 3:c.add(R)}var j=class o extends c{static useConsole(e){switch(y){case 3:throw new Error("Brownser not have support for useConsole function!");case 0:{globalThis.loggings=e,globalThis.console={...globalThis.console,log:(...t)=>globalThis.loggings.log(...t),error:(...t)=>globalThis.loggings.error(...t),warn:(...t)=>globalThis.loggings.warn(...t),info:(...t)=>globalThis.loggings.info(...t),debug:(...t)=>globalThis.loggings.debug(...t)};break}case 2:case 1:{global.loggings=e,global.console={...global.console,log:(...t)=>global.loggings.log(...t),error:(...t)=>global.loggings.error(...t),warn:(...t)=>global.loggings.warn(...t),info:(...t)=>global.loggings.info(...t),debug:(...t)=>global.loggings.debug(...t)};break}}}constructor(e,t,s){super(),this.configs=o.getDefaults(),e&&(this.configs.title=e),t&&(this.configs.color=t),this.configs={...this.configs,...s},this.plugins=c.plugins,c.plugins.forEach(n=>n.onCreateInstance(this))}config(e){this.configs={...this.configs,...e}}static config(e){c.configs={...c.configs,...e}}static getDefaults(){return{...c.configs,...this.configs}}};0&&(module.exports={Bgc,Colors,Formatter,Fragmenter,Loggings,LoggingsColors,LoggingsConsole,LoggingsPlugin,LoggingsRegister,Rgb,StaticFormatter,Timer,Timers,Uptimer,console_defaults,inspector,register_defaults});
