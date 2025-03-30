var W=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var Y=(t,...e)=>{let[n,s,o]=e.map(l=>Math.min(255,Math.max(0,l)));return`\x1B[${t?"48":"38"};2;${n};${s};${o}m`},x=(t,e,n)=>(s=!1)=>Y(s,t,e,n);function w(t){let e=new Date,n={timestamp:Date.now(),year:String(e.getFullYear()),month:String(e.getMonth()+1).padStart(2,"0"),day:String(e.getDate()).padStart(2,"0"),hours:String(e.getHours()).padStart(2,"0"),minutes:String(e.getMinutes()).padStart(2,"0"),seconds:String(e.getSeconds()).padStart(2,"0"),milliseconds:String(e.getMilliseconds()).padStart(3,"0")};return{format:Object.entries(n).reduce((o,[r])=>{let l=new RegExp(`{${r}}`,"g");return o.replace(l,String(n[r]))},t),timer:n}}function P(t){switch(t){case"debug":return 4;case"info":return 3;case"warn":return 2;case"error":return 1;default:return 1}}var v=(o=>(o[o.Node=0]="Node",o[o.Bun=1]="Bun",o[o.Deno=2]="Deno",o[o.Browser=3]="Browser",o))(v||{}),b=0;switch(!0){case typeof Bun<"u":{b=1;break}case typeof Deno<"u":{b=2;break}case typeof process<"u":{b=0;break}default:b=3}var C=(t,e=!1)=>inspect(t,{colors:!e});switch(b){case 0:{switch(!0){case typeof __filename>"u":{import("node:util").then(({inspect:t})=>{C=(e,n=!1)=>t(e,{colors:!n})});break}default:{let t=W("node:util");C=(e,n=!1)=>t(e,{colors:!n});break}}break}case 1:{C=(t,e=!1)=>Bun.inspect(t,{colors:!e});break}case 2:{C=(t,e=!1)=>Deno.inspect(t,{colors:!e});break}}var T=C;var G={slate5:"#f8fafc",slate10:"#f1f5f9",slate20:"#e2e8f0",slate30:"#cbd5e1",slate40:"#94a3b8",slate50:"#64748b",slate60:"#475569",slate70:"#334155",slate80:"#1e293b",slate90:"#0f172a",slate95:"#020617",gray5:"#f9fafb",gray10:"#f3f4f6",gray20:"#e5e7eb",gray30:"#d1d5db",gray40:"#9ca3af",gray50:"#6b7280",gray60:"#4b5563",gray70:"#374151",gray80:"#1f2937",gray90:"#111827",gray95:"#030712",zinc5:"#fafafa",zinc10:"#f4f4f5",zinc20:"#e4e4e7",zinc30:"#d4d4d8",zinc40:"#a1a1aa",zinc50:"#71717a",zinc60:"#52525b",zinc70:"#3f3f46",zinc80:"#27272a",zinc90:"#18181b",zinc95:"#09090b",neutral5:"#fafafa",neutral10:"#f5f5f5",neutral20:"#e5e5e5",neutral30:"#d4d4d4",neutral40:"#a3a3a3",neutral50:"#737373",neutral60:"#525252",neutral70:"#404040",neutral80:"#262626",neutral90:"#171717",neutral95:"#0a0a0a",stone5:"#fafaf9",stone10:"#f5f5f4",stone20:"#e7e5e4",stone30:"#d6d3d1",stone40:"#a8a29e",stone50:"#78716c",stone60:"#57534e",stone70:"#44403c",stone80:"#292524",stone90:"#1c1917",stone95:"#0c0a09",red5:"#fef2f2",red10:"#fee2e2",red20:"#fecaca",red30:"#fca5a5",red40:"#f87171",red50:"#ef4444",red60:"#dc2626",red70:"#b91c1c",red80:"#991b1b",red90:"#7f1d1d",red95:"#450a0a",orange5:"#fff7ed",orange10:"#ffedd5",orange20:"#fed7aa",orange30:"#fdba74",orange40:"#fb923c",orange50:"#f97316",orange60:"#ea580c",orange70:"#c2410c",orange80:"#9a3412",orange90:"#7c2d12",orange95:"#431407",amber5:"#fffbeb",amber10:"#fef3c7",amber20:"#fde68a",amber30:"#fcd34d",amber40:"#fbbf24",amber50:"#f59e0b",amber60:"#d97706",amber70:"#b45309",amber80:"#92400e",amber90:"#78350f",amber95:"#451a03",yellow5:"#fefce8",yellow10:"#fef9c3",yellow20:"#fef08a",yellow30:"#fde047",yellow40:"#facc15",yellow50:"#eab308",yellow60:"#ca8a04",yellow70:"#a16207",yellow80:"#854d0e",yellow90:"#713f12",yellow95:"#422006",lime5:"#f7fee7",lime10:"#ecfccb",lime20:"#d9f99d",lime30:"#bef264",lime40:"#a3e635",lime50:"#84cc16",lime60:"#65a30d",lime70:"#4d7c0f",lime80:"#3f6212",lime90:"#365314",lime95:"#1a2e05",green5:"#f0fdf4",green10:"#dcfce7",green20:"#bbf7d0",green30:"#86efac",green40:"#4ade80",green50:"#22c55e",green60:"#16a34a",green70:"#15803d",green80:"#166534",green90:"#14532d",green95:"#052e16",emerald5:"#ecfdf5",emerald10:"#d1fae5",emerald20:"#a7f3d0",emerald30:"#6ee7b7",emerald40:"#34d399",emerald50:"#10b981",emerald60:"#059669",emerald70:"#047857",emerald80:"#065f46",emerald90:"#064e3b",emerald95:"#022c22",teal5:"#f0fdfa",teal10:"#ccfbf1",teal20:"#99f6e4",teal30:"#5eead4",teal40:"#2dd4bf",teal50:"#14b8a6",teal60:"#0d9488",teal70:"#0f766e",teal80:"#115e59",teal90:"#134e4a",teal95:"#042f2e",cyan5:"#ecfeff",cyan10:"#cffafe",cyan20:"#a5f3fc",cyan30:"#67e8f9",cyan40:"#22d3ee",cyan50:"#06b6d4",cyan60:"#0891b2",cyan70:"#0e7490",cyan80:"#155e75",cyan90:"#164e63",cyan95:"#083344",sky5:"#f0f9ff",sky10:"#e0f2fe",sky20:"#bae6fd",sky30:"#7dd3fc",sky40:"#38bdf8",sky50:"#0ea5e9",sky60:"#0284c7",sky70:"#0369a1",sky80:"#075985",sky90:"#0c4a6e",sky95:"#082f49",blue5:"#eff6ff",blue10:"#dbeafe",blue20:"#bfdbfe",blue30:"#93c5fd",blue40:"#60a5fa",blue50:"#3b82f6",blue60:"#2563eb",blue70:"#1d4ed8",blue80:"#1e40af",blue90:"#1e3a8a",blue95:"#172554",indigo5:"#eef2ff",indigo10:"#e0e7ff",indigo20:"#c7d2fe",indigo30:"#a5b4fc",indigo40:"#818cf8",indigo50:"#6366f1",indigo60:"#4f46e5",indigo70:"#4338ca",indigo80:"#3730a3",indigo90:"#312e81",indigo95:"#1e1b4b",violet5:"#f5f3ff",violet10:"#ede9fe",violet20:"#ddd6fe",violet30:"#c4b5fd",violet40:"#a78bfa",violet50:"#8b5cf6",violet60:"#7c3aed",violet70:"#6d28d9",violet80:"#5b21b6",violet90:"#4c1d95",violet95:"#2e1065",purple5:"#faf5ff",purple10:"#f3e8ff",purple20:"#e9d5ff",purple30:"#d8b4fe",purple40:"#c084fc",purple50:"#a855f7",purple60:"#9333ea",purple70:"#7e22ce",purple80:"#6b21a8",purple90:"#581c87",purple95:"#3b0764",fuchsia5:"#fdf4ff",fuchsia10:"#fae8ff",fuchsia20:"#f5d0fe",fuchsia30:"#f0abfc",fuchsia40:"#e879f9",fuchsia50:"#d946ef",fuchsia60:"#c026d3",fuchsia70:"#a21caf",fuchsia80:"#86198f",fuchsia90:"#701a75",fuchsia95:"#4a044e",pink5:"#fdf2f8",pink10:"#fce7f3",pink20:"#fbcfe8",pink30:"#f9a8d4",pink40:"#f472b6",pink50:"#ec4899",pink60:"#db2777",pink70:"#be185d",pink80:"#9d174d",pink90:"#831843",pink95:"#500724",rose5:"#fff1f2",rose10:"#ffe4e6",rose20:"#fecdd3",rose30:"#fda4af",rose40:"#fb7185",rose50:"#f43f5e",rose60:"#e11d48",rose70:"#be123c",rose80:"#9f1239",rose90:"#881337",rose95:"#4c0519"},m={reset:"\x1B[0m",bold:"\x1B[1m",italic:"\x1B[3m",underline:"\x1B[4m",blink:"\x1B[5m",reverse:"\x1B[7m",hidden:"\x1B[8m",strikethrough:"\x1B[9m",none:"\x1B[22m"},B={red:"#ff0000",green:"#00ff00",lime:"#80ff80",blue:"#0000ff",yellow:"#ffff00",cyan:"#00ffff",magenta:"#ff00ff",black:"#000000",white:"#ffffff",gray:"#808080",maroon:"#800000",olive:"#808000",navy:"#000080",purple:"#800080",teal:"#008080",silver:"#c0c0c0",indigo:"#4b0082",gold:"#ffd700",pink:"#ffc0cb",orange:"#ffa500",brown:"#a52a2a",peach:"#ffdab9",lavender:"#e6e6fa",coral:"#ff7f50",turquoise:"#40e0d0",salmon:"#fa8072",olivebrab:"#6b8e23",slate:"#708090",lsgreen:"#20b2aa",dorange:"#ff8c00",khaki:"#f0e68c",mvred:"#c71585",dsalmon:"#e9967a",lpink:"#ffb6c1",dgray:"#696969",gainsboro:"#dcdcdc"},D={...B,...m,...G},M={...B,...G},F=t=>{let e=null;if(typeof t=="number")return t;if(typeof t=="string"&&/^#[0-9A-Fa-f]{6}$/i.test(t)){let n=t;if(n=n.replace(/^#/,""),n.length===3&&(n=n.split("").map(s=>s+s).join("")),n.length===6)return parseInt(n,16)}return!e&&Object.keys(M).includes(t)&&(e=M[t]),e||(e=M.white),parseInt(e.replace("#",""),16)},I=(t,e=!1)=>{if(typeof t=="number"){let n=t>>24&255,s=t>>16&255,o=t>>8&255;return x(n,s,o)(e)}if(t.startsWith("#")){let n=t;if(n=n.replace(/^#/,""),n.length===3&&(n=n.split("").map(s=>s+s).join("")),n.length===6){let s=parseInt(n,16);return x(s>>16&255,s>>8&255,s&255)(e)}}if(D[t]){let n=D[t];return I(n,e)}if(t.includes("-")){let n=t.replace("-","");return I(n.slice(0,n.length-1),e)}return/^\x1b\[/.test(t)?t:m.reset};function u(t,e,n={}){let s=n[t];switch(!0){case typeof s>"u":{let o=I(t);return o?o+e+m.reset:e}case s=="none":return e;default:return I(s)+e+m.reset}}var se=u;var L=(t,e)=>(n,s)=>{let o=new RegExp(t);return typeof s=="string"?s.replace(o,(...r)=>e(n,...r)):T(s,n)},ae=t=>E[2](!1,t),E=[(t,e)=>{let n=/\[([^\[\]]+)\]\.(\w+)(-b)?/g,s=[],l=(a=>{let c=a;for(;;){let g=n.exec(c);if(!g)break;let[_,i,f,d]=g,p=d==="-b";s.push({key:f,value:i,bold:p});let h=`<${f}>`;c=c.replace(_,h),n.lastIndex=0}return c})(e);return s.reverse().forEach(a=>{let c=`<${a.key}>`,g=a.value;a.bold&&(g=t?g:m.bold+g),g=t?g:u(a.key,g),l=l.replace(c,g)}),l},L("\\[([^\\[\\]]+)\\]gb\\((.*?)\\)",(t,e,n,s)=>{if(t)return n;let o=(i,f,d)=>{let p=i>>16&255,h=i>>8&255,S=i&255,j=f>>16&255,z=f>>8&255,$=f&255,H=Math.round(p+(j-p)*d),q=Math.round(h+(z-h)*d),U=Math.round(S+($-S)*d);return x(H,q,U)()},r=s.split(","),l=(r.length==1?[r[0],r[0]]:r).map(i=>i.trim()).map(i=>F(i)),a=n.length,c=l.length-1,g=Math.ceil(a/c),_="";for(let i=0;i<a;i++){let f=Math.floor(i/g),d=(i-f*g)/g,p=l[f],h=l[Math.min(f+1,l.length-1)],S=o(p,h,d);_+=S+n[i]}return _+m.reset}),L("\\*(.*?)\\*",(t,e,n)=>t?n:u("bold",n)),L("~(.*?)~",(t,e,n)=>t?n:u("strikethrough",n)),L("-(.*?)-",(t,e,n)=>t?n:u("italic",n)),L("_(.*?)_",(t,e,n)=>t?n:u("underline",n)),L("!(.*?)!",(t,e,n)=>t?n:u("blink",n)),L("#(.*?)#",(t,e,n)=>t?n:u("reverse",n))],k=(t,e=[],n=!1)=>{let s=typeof t=="string"?[t]:[...t],o=!1,r=[...E,...e];do o=!1,r.forEach(l=>{s=s.map(a=>{let c=l(n,a);return c!==a&&(o=!0),c})});while(o);return s.join(" ")};var A={level:"info",title:"Loggings",formatKits:E,plugins:[]};var J={format:"[{status}] [{hours}:{minutes}:{seconds}].gray {message}",status:{error:"red50",debug:"purple50",info:"blue40",warn:"yellow40",trace:"yellow95"},color:"green",fallback:"white",disable_colors:!1,console:!0,colors:{}},O=(t={})=>({ident:"loggings-console",default:J,onInit:t.onInit,onPreMessage:(e,n,s)=>{let o=P(e.console_level??e.level),r=P(e.level);if(!(!e.console||o<r))return t.onPreMessage?t.onPreMessage(e,n,s):s},onMessage(e,n,s){e.level=e.console_level?e.console_level:e.level,t.onMessage&&t.onMessage(e,n,s);let o=k(e.format,e.formatKits,e.disable_colors);o=w(o).format;let r=e.disable_colors;return o.includes("{title}")&&(o=o.replace(new RegExp("{title}","g"),r?e.title:u(e.color,e.title,e.colors))),o.includes("{status}")&&(o=o.replace(new RegExp("{status}","g"),r?n:u(e.status[n],u("bold",n),e.colors))),o.includes("{message}")&&(o=o.replace(new RegExp("{message}","g"),k(s,e.formatKits,e.disable_colors))),o},onSend(e,n,s){t.onSend&&t.onSend(e,n,s);let o=`${s}
`;switch(b){case 2:{let r=new TextEncoder().encode(o);return["info","debug"].includes(n.toLowerCase())?Deno.stderr.info(r):Deno.stdout.error(r)}case 0:return["info","debug"].includes(n.toLowerCase())?process.stderr.write(o):process.stdout.write(o);case 1:return["info","debug"].includes(n.toLowerCase())?Bun.write(Bun.stderr,o):Bun.write(Bun.stdout,o);case 3:{console[n.toLowerCase()](s);break}default:throw new Error("Unknown environment")}}});import y from"fs";import N from"path";var Q={register:!0,register_del:!0,register_limit:10,register_dir:"./logs",register_locale_file:"{register_dir}",register_filename:"{day}_{month}_{year}.{ext}",register_format:"[ {day}/{month}/{year}-{hours}:{minutes}:{seconds} ] [ _.{title}._ ] {message}"},K=(t={})=>({ident:"loggings-register",default:Q,onInit:t.onInit,onPreMessage:(e,n,s)=>{let o=P(e.register_level??e.level),r=P(e.level);if(!(!e.register||o<r))return t.onPreMessage?t.onPreMessage(e,n,s):s},onMessage(e,n,s){t.onMessage&&t.onMessage(e,n,s);let o=e.register_format;return o=w(o).format,o.includes("{title}")&&(o=o.replace(new RegExp("{title}","g"),e.title)),o.includes("{status}")&&(o=o.replace(new RegExp("{status}","g"),n)),o.includes("{message}")&&(o=o.replace(new RegExp("{message}","g"),k(s,e.formatKits,!0))),o},onSend(e,n,s){t.onSend&&t.onSend(e,n,s);let o=e.register_locale_file.replace(new RegExp("{register_dir}","g"),e.register_dir);o=o.replace(new RegExp("{title}","g"),e.title),o=o.replace(new RegExp("{status}","g"),n);let r=w(e.register_filename).format.replace(new RegExp("{status}","g"),n).replace(new RegExp("{ext}","g"),"log"),l=N.join(o,r),a=N.resolve(e.register_dir);if(y.existsSync(a)||y.mkdirSync(a,{recursive:!0}),y.appendFileSync(l,s+`
`),e.register_del&&e.register_limit>0){let c=new RegExp(".log"),g=y.readdirSync(o).filter(i=>c.test(i)).sort((i,f)=>{let d=y.statSync(N.join(o,i)),p=y.statSync(N.join(o,f));return d.mtime.getTime()-p.mtime.getTime()});g.slice(0,g.length-e.register_limit).forEach(i=>{let f=N.join(o,i);y.unlinkSync(f)})}}});import{Console as V}from"console";var X=[O,K],R=class t extends V{static configs=A;configs;get allconfigs(){return Object.assign({...t.allconfigs,...this.configs})}static get allconfigs(){return Object.assign(t.configs,...t.pluginLoader(this.plugins).map(e=>e.default))}static plugins=X;plugins;constructor(e,n="blue",s={}){super(process.stdout,process.stderr);let o=typeof e=="object";this.plugins=[...o?e?.plugins??[]:[],...s?.plugins??[]],this.configs={color:n,...s,...typeof e=="string"?{title:e}:e},t.pluginLoader(this.plugins).forEach(r=>{r.onInit&&r.onInit(this.allconfigs)})}static pluginLoader(e,n=!1){let s={};return n||t.plugins.forEach(o=>{let r=typeof o=="function"?o():o;s[r.ident]=r}),e.forEach(o=>{let r=typeof o=="function"?o():o;s[r.ident]=r}),Object.values(s)}config(e={}){return e?.plugins&&(this.plugins.length=0,this.plugins=e?.plugins??[]),this.configs={...this.configs,...e},t.pluginLoader(this.plugins,!0).forEach(n=>{n.onInit&&n.onInit(this.allconfigs)}),this}static config(e={}){return e?.plugins&&(t.plugins.length=0,t.plugins=e?.plugins??[]),this.configs={...t.configs,...e},t.pluginLoader(t.plugins,!0).forEach(n=>{n.onInit&&n.onInit(this.allconfigs)}),this}static useConsole(e){global.__INTERNAL_LOGGINGS_INSTANCE__=e,global.console={...global.console,log:(...n)=>global.__INTERNAL_LOGGINGS_INSTANCE__.controller(n,"info"),error:(...n)=>global.__INTERNAL_LOGGINGS_INSTANCE__.controller(n,"error"),warn:(...n)=>global.__INTERNAL_LOGGINGS_INSTANCE__.controller(n,"warn"),info:(...n)=>global.__INTERNAL_LOGGINGS_INSTANCE__.controller(n,"info"),debug:(...n)=>global.__INTERNAL_LOGGINGS_INSTANCE__.controller(n,"debug"),trace:(...n)=>global.__INTERNAL_LOGGINGS_INSTANCE__.controller(n,"trace")}}controller(e,n){t.pluginLoader(this.plugins).forEach(s=>{try{let o=s.onPreMessage?s.onPreMessage(this.allconfigs,n,e):e;if(o&&s.onMessage){let r=s.onMessage(this.allconfigs,n,o);s.onSend&&s.onSend(this.allconfigs,n,r)}}catch(o){if(s.onError)s.onError(this.allconfigs,o);else throw o}})}log(...e){return this.controller(e,"info"),this}debug(...e){return this.controller(e,"debug"),this}error(...e){return this.controller(e,"error"),this}trace(...e){return this.controller(e,"trace"),this}info(...e){return this.controller(e,"info"),this}warn(...e){return this.controller(e,"warn"),this}},Ne=R;export{se as Colors,O as ConsolePlugin,J as ConsolePluginDefault,E as LOGGINGS_FORMATKITS,R as Loggings,m as LoggingsAnsiSpecials,B as LoggingsCommonPallet,X as LoggingsDefaultPlugins,k as LoggingsFormatKitController,L as LoggingsFormatParser,ae as LoggingsGrandient,P as LoggingsLevelToNumber,D as LoggingsPallet,G as LoggingsTailwindColors,K as RegisterPlugin,Q as RegisterPluginDefault,v as Runtime,u as colorpik,Ne as default,x as rgb,b as runtime,I as termcolor,w as timer,F as toHexadecimal};
