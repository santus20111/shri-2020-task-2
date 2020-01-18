!function(e){var n={};function t(r){if(n[r])return n[r].exports;var l=n[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,t),l.l=!0,l.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var l in e)t.d(r,l,function(n){return e[n]}.bind(null,l));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,n,t){(function(n){let r=t(2),l=t(7);const o=t(9);let i=e=>{let n=u(o(e)),t=[];return n.forEach(e=>{t.push(...r(e)),t.push(...l(e))}),c(t)};n?n.lint=i:window&&(window.lint=i),e.exports=i;let c=e=>{let n=e.reduce((e,n)=>{let t=`${n.code}:${n.location.start.column}:${n.location.start.line}:${n.location.end.column}:${n.location.end.line}`;return e[t]||(e[t]=n),e},{}),t=[];for(let[e,r]of Object.entries(n))t.push(r);return t},u=(e,n=null)=>{if("Object"===e.type){let t=e.children.filter(e=>"Property"===e.type&&"block"===e.key.value).length>0,r=e.children.filter(e=>"Property"===e.type&&"elem"===e.key.value).length>0,l=null;t&&(l=e.children.filter(e=>"Property"===e.type&&"block"===e.key.value)[0].value.value);let o=null;r&&(o=e.children.filter(e=>"Property"===e.type&&"elem"===e.key.value)[0].value.value);let i=[],c=e.children.filter(e=>"Property"===e.type&&"mods"===e.key.value);c.length>0&&(i=c[0].value.children.map(e=>({key:e.key.value,value:e.value.value})));let a=[],s=e.children.filter(e=>"Property"===e.type&&"elemMods"===e.key.value);s.length>0&&(a=s[0].value.children.map(e=>({key:e.key.value,value:e.value.value})));let f={isBlock:t,isElem:r,blockName:l,elemName:o,children:[],mods:i,elemMods:a,parent:n,loc:e.loc},d=e.children.filter(e=>"Property"===e.type&&"content"===e.key.value);return d.length>0&&(f.children=u(d[0].value,f)),[f]}if("Array"===e.type)return e.children.map(e=>u(e,n)[0])}}).call(this,t(0))},function(e,n,t){let r=t(3),l=t(4),o=t(5),i=t(6);e.exports=e=>{let n=[];return n.push(...r(e)),n.push(...l(e)),n.push(...o(e)),n.push(...i(e)),n}},function(e,n){let t=e=>{let n=[],r=e=>({code:"WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",error:"Тексты в блоке warning-text должны быть одного размера",location:{start:{column:e.start.column,line:e.start.line},end:{column:e.end.column,line:e.end.line}}}),l=new Set;for(let o of e.children){if(e.isBlock&&"warning"===e.blockName&&o.isBlock&&"text"===o.blockName){let t=o.mods.filter(e=>"size"===e.key);0===t.length?n.push([r(e.loc)]):l.add(t[0].value)}n.push(...t(o,n))}return l.size>1&&n.push(r(e.loc)),n};e.exports=t},function(e,n){let t=e=>{let n=["s","m","l","xl","xxl"],r=[],l=e.children.filter(e=>e.isBlock&&"text"===e.blockName),o=null;l.length>0&&(o=l[0].mods.filter(e=>"size"===e.key)[0].value);for(let l of e.children){if(e.isBlock&&"warning"===e.blockName&&l.isBlock&&"button"===l.blockName&&null!==o){let e=l.mods.filter(e=>"size"===e.key)[0].value;n.indexOf(e)-n.indexOf(o)!=1&&r.push({code:"WARNING.INVALID_BUTTON_SIZE",error:"Размер блока button должен быть на 1 шаг больше эталонного",location:{start:{column:(i=l.loc).start.column,line:i.start.line},end:{column:i.end.column,line:i.end.line}}})}r.push(...t(l,r))}var i;return r};e.exports=t},function(e,n){let t=(e,n=[])=>{let r=[];if(e.isBlock&&"button"===e.blockName&&null!==e.parent&&e.parent.isBlock&&"warning"===e.parent.blockName)n.push(e);else if(e.isBlock&&"placeholder"===e.blockName)for(let e of n)r.push({code:"WARNING.INVALID_BUTTON_POSITION",error:"Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",location:{start:{column:(l=e.loc).start.column,line:l.start.line},end:{column:l.end.column,line:l.end.line}}});var l;for(let l of e.children)r.push(...t(l,n));return r};e.exports=t},function(e,n){let t=e=>{let n=["s","m","l"],r=[];for(let o of e.children){if(e.isBlock&&"warning"===e.blockName&&o.isBlock&&"placeholder"===o.blockName){let e=o.mods.filter(e=>"size"===e.key);e.length>0&&-1===n.indexOf(e[0].value)&&r.push({code:"WARNING.INVALID_PLACEHOLDER_SIZE",error:"Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l",location:{start:{column:(l=o.loc).start.column,line:l.start.line},end:{column:l.end.column,line:l.end.line}}})}r.push(...t(o,r))}var l;return r};e.exports=t},function(e,n,t){let r=t(8);e.exports=e=>{let n=[];return n.push(...r(e)),n}},function(e,n){let t=e=>{let n=[],r=["commercial","offer"],l=["payment","warning","product","history","cover","collect","articles","subscribtion","event"];if(e.isBlock&&"grid"===e.blockName){let t=0,i=0;e.children.forEach(e=>{if("grid"===e.blockName&&"fraction"===e.elemName){let n=+e.elemMods.filter(e=>"m-col"===e.key)[0].value;-1!==r.indexOf(e.children[0].blockName)?i+=n:-1!==l.indexOf(e.children[0].blockName)&&(t+=n)}}),i>t&&n.push({code:"GRID.TOO_MUCH_MARKETING_BLOCKS",error:"Маркетинговые блоки не должны занимать больше половины от всех колонок",location:{start:{column:(o=e.loc).start.column,line:o.start.line},end:{column:o.end.column,line:o.end.line}}})}var o;for(let r of e.children)n.push(...t(r));return n};e.exports=t},function(e,n,t){(function(n){var t;t=function(){"use strict";function e(e,n){return e(n={exports:{}},n.exports),n.exports}"undefined"!=typeof window?window:void 0!==n||"undefined"!=typeof self&&self;var t=new(e((function(e){e.exports&&(e.exports=function(){var e=3,n=4,t=12,r=13,l=16,o=17;function i(e,n){void 0===n&&(n=0);var t=e.charCodeAt(n);if(55296<=t&&t<=56319&&n<e.length-1){var r=t;return 56320<=(l=e.charCodeAt(n+1))&&l<=57343?1024*(r-55296)+(l-56320)+65536:r}if(56320<=t&&t<=57343&&n>=1){var l=t;return 55296<=(r=e.charCodeAt(n-1))&&r<=56319?1024*(r-55296)+(l-56320)+65536:l}return t}function c(i,c,u){var a=[i].concat(c).concat([u]),s=a[a.length-2],f=u,d=a.lastIndexOf(14);if(d>1&&a.slice(1,d).every((function(n){return n==e}))&&-1==[e,r,o].indexOf(i))return 2;var v=a.lastIndexOf(n);if(v>0&&a.slice(1,v).every((function(e){return e==n}))&&-1==[t,n].indexOf(s))return a.filter((function(e){return e==n})).length%2==1?3:4;if(0==s&&1==f)return 0;if(2==s||0==s||1==s)return 14==f&&c.every((function(n){return n==e}))?2:1;if(2==f||0==f||1==f)return 1;if(6==s&&(6==f||7==f||9==f||10==f))return 0;if(!(9!=s&&7!=s||7!=f&&8!=f))return 0;if((10==s||8==s)&&8==f)return 0;if(f==e||15==f)return 0;if(5==f)return 0;if(s==t)return 0;var h=-1!=a.indexOf(e)?a.lastIndexOf(e)-1:a.length-2;return-1!=[r,o].indexOf(a[h])&&a.slice(h+1,-1).every((function(n){return n==e}))&&14==f?0:15==s&&-1!=[l,o].indexOf(f)?0:-1!=c.indexOf(n)?2:s==n&&f==n?0:1}function u(i){return 1536<=i&&i<=1541||1757==i||1807==i||2274==i||3406==i||69821==i||70082<=i&&i<=70083||72250==i||72326<=i&&i<=72329||73030==i?t:13==i?0:10==i?1:0<=i&&i<=9||11<=i&&i<=12||14<=i&&i<=31||127<=i&&i<=159||173==i||1564==i||6158==i||8203==i||8206<=i&&i<=8207||8232==i||8233==i||8234<=i&&i<=8238||8288<=i&&i<=8292||8293==i||8294<=i&&i<=8303||55296<=i&&i<=57343||65279==i||65520<=i&&i<=65528||65529<=i&&i<=65531||113824<=i&&i<=113827||119155<=i&&i<=119162||917504==i||917505==i||917506<=i&&i<=917535||917632<=i&&i<=917759||918e3<=i&&i<=921599?2:768<=i&&i<=879||1155<=i&&i<=1159||1160<=i&&i<=1161||1425<=i&&i<=1469||1471==i||1473<=i&&i<=1474||1476<=i&&i<=1477||1479==i||1552<=i&&i<=1562||1611<=i&&i<=1631||1648==i||1750<=i&&i<=1756||1759<=i&&i<=1764||1767<=i&&i<=1768||1770<=i&&i<=1773||1809==i||1840<=i&&i<=1866||1958<=i&&i<=1968||2027<=i&&i<=2035||2070<=i&&i<=2073||2075<=i&&i<=2083||2085<=i&&i<=2087||2089<=i&&i<=2093||2137<=i&&i<=2139||2260<=i&&i<=2273||2275<=i&&i<=2306||2362==i||2364==i||2369<=i&&i<=2376||2381==i||2385<=i&&i<=2391||2402<=i&&i<=2403||2433==i||2492==i||2494==i||2497<=i&&i<=2500||2509==i||2519==i||2530<=i&&i<=2531||2561<=i&&i<=2562||2620==i||2625<=i&&i<=2626||2631<=i&&i<=2632||2635<=i&&i<=2637||2641==i||2672<=i&&i<=2673||2677==i||2689<=i&&i<=2690||2748==i||2753<=i&&i<=2757||2759<=i&&i<=2760||2765==i||2786<=i&&i<=2787||2810<=i&&i<=2815||2817==i||2876==i||2878==i||2879==i||2881<=i&&i<=2884||2893==i||2902==i||2903==i||2914<=i&&i<=2915||2946==i||3006==i||3008==i||3021==i||3031==i||3072==i||3134<=i&&i<=3136||3142<=i&&i<=3144||3146<=i&&i<=3149||3157<=i&&i<=3158||3170<=i&&i<=3171||3201==i||3260==i||3263==i||3266==i||3270==i||3276<=i&&i<=3277||3285<=i&&i<=3286||3298<=i&&i<=3299||3328<=i&&i<=3329||3387<=i&&i<=3388||3390==i||3393<=i&&i<=3396||3405==i||3415==i||3426<=i&&i<=3427||3530==i||3535==i||3538<=i&&i<=3540||3542==i||3551==i||3633==i||3636<=i&&i<=3642||3655<=i&&i<=3662||3761==i||3764<=i&&i<=3769||3771<=i&&i<=3772||3784<=i&&i<=3789||3864<=i&&i<=3865||3893==i||3895==i||3897==i||3953<=i&&i<=3966||3968<=i&&i<=3972||3974<=i&&i<=3975||3981<=i&&i<=3991||3993<=i&&i<=4028||4038==i||4141<=i&&i<=4144||4146<=i&&i<=4151||4153<=i&&i<=4154||4157<=i&&i<=4158||4184<=i&&i<=4185||4190<=i&&i<=4192||4209<=i&&i<=4212||4226==i||4229<=i&&i<=4230||4237==i||4253==i||4957<=i&&i<=4959||5906<=i&&i<=5908||5938<=i&&i<=5940||5970<=i&&i<=5971||6002<=i&&i<=6003||6068<=i&&i<=6069||6071<=i&&i<=6077||6086==i||6089<=i&&i<=6099||6109==i||6155<=i&&i<=6157||6277<=i&&i<=6278||6313==i||6432<=i&&i<=6434||6439<=i&&i<=6440||6450==i||6457<=i&&i<=6459||6679<=i&&i<=6680||6683==i||6742==i||6744<=i&&i<=6750||6752==i||6754==i||6757<=i&&i<=6764||6771<=i&&i<=6780||6783==i||6832<=i&&i<=6845||6846==i||6912<=i&&i<=6915||6964==i||6966<=i&&i<=6970||6972==i||6978==i||7019<=i&&i<=7027||7040<=i&&i<=7041||7074<=i&&i<=7077||7080<=i&&i<=7081||7083<=i&&i<=7085||7142==i||7144<=i&&i<=7145||7149==i||7151<=i&&i<=7153||7212<=i&&i<=7219||7222<=i&&i<=7223||7376<=i&&i<=7378||7380<=i&&i<=7392||7394<=i&&i<=7400||7405==i||7412==i||7416<=i&&i<=7417||7616<=i&&i<=7673||7675<=i&&i<=7679||8204==i||8400<=i&&i<=8412||8413<=i&&i<=8416||8417==i||8418<=i&&i<=8420||8421<=i&&i<=8432||11503<=i&&i<=11505||11647==i||11744<=i&&i<=11775||12330<=i&&i<=12333||12334<=i&&i<=12335||12441<=i&&i<=12442||42607==i||42608<=i&&i<=42610||42612<=i&&i<=42621||42654<=i&&i<=42655||42736<=i&&i<=42737||43010==i||43014==i||43019==i||43045<=i&&i<=43046||43204<=i&&i<=43205||43232<=i&&i<=43249||43302<=i&&i<=43309||43335<=i&&i<=43345||43392<=i&&i<=43394||43443==i||43446<=i&&i<=43449||43452==i||43493==i||43561<=i&&i<=43566||43569<=i&&i<=43570||43573<=i&&i<=43574||43587==i||43596==i||43644==i||43696==i||43698<=i&&i<=43700||43703<=i&&i<=43704||43710<=i&&i<=43711||43713==i||43756<=i&&i<=43757||43766==i||44005==i||44008==i||44013==i||64286==i||65024<=i&&i<=65039||65056<=i&&i<=65071||65438<=i&&i<=65439||66045==i||66272==i||66422<=i&&i<=66426||68097<=i&&i<=68099||68101<=i&&i<=68102||68108<=i&&i<=68111||68152<=i&&i<=68154||68159==i||68325<=i&&i<=68326||69633==i||69688<=i&&i<=69702||69759<=i&&i<=69761||69811<=i&&i<=69814||69817<=i&&i<=69818||69888<=i&&i<=69890||69927<=i&&i<=69931||69933<=i&&i<=69940||70003==i||70016<=i&&i<=70017||70070<=i&&i<=70078||70090<=i&&i<=70092||70191<=i&&i<=70193||70196==i||70198<=i&&i<=70199||70206==i||70367==i||70371<=i&&i<=70378||70400<=i&&i<=70401||70460==i||70462==i||70464==i||70487==i||70502<=i&&i<=70508||70512<=i&&i<=70516||70712<=i&&i<=70719||70722<=i&&i<=70724||70726==i||70832==i||70835<=i&&i<=70840||70842==i||70845==i||70847<=i&&i<=70848||70850<=i&&i<=70851||71087==i||71090<=i&&i<=71093||71100<=i&&i<=71101||71103<=i&&i<=71104||71132<=i&&i<=71133||71219<=i&&i<=71226||71229==i||71231<=i&&i<=71232||71339==i||71341==i||71344<=i&&i<=71349||71351==i||71453<=i&&i<=71455||71458<=i&&i<=71461||71463<=i&&i<=71467||72193<=i&&i<=72198||72201<=i&&i<=72202||72243<=i&&i<=72248||72251<=i&&i<=72254||72263==i||72273<=i&&i<=72278||72281<=i&&i<=72283||72330<=i&&i<=72342||72344<=i&&i<=72345||72752<=i&&i<=72758||72760<=i&&i<=72765||72767==i||72850<=i&&i<=72871||72874<=i&&i<=72880||72882<=i&&i<=72883||72885<=i&&i<=72886||73009<=i&&i<=73014||73018==i||73020<=i&&i<=73021||73023<=i&&i<=73029||73031==i||92912<=i&&i<=92916||92976<=i&&i<=92982||94095<=i&&i<=94098||113821<=i&&i<=113822||119141==i||119143<=i&&i<=119145||119150<=i&&i<=119154||119163<=i&&i<=119170||119173<=i&&i<=119179||119210<=i&&i<=119213||119362<=i&&i<=119364||121344<=i&&i<=121398||121403<=i&&i<=121452||121461==i||121476==i||121499<=i&&i<=121503||121505<=i&&i<=121519||122880<=i&&i<=122886||122888<=i&&i<=122904||122907<=i&&i<=122913||122915<=i&&i<=122916||122918<=i&&i<=122922||125136<=i&&i<=125142||125252<=i&&i<=125258||917536<=i&&i<=917631||917760<=i&&i<=917999?e:127462<=i&&i<=127487?n:2307==i||2363==i||2366<=i&&i<=2368||2377<=i&&i<=2380||2382<=i&&i<=2383||2434<=i&&i<=2435||2495<=i&&i<=2496||2503<=i&&i<=2504||2507<=i&&i<=2508||2563==i||2622<=i&&i<=2624||2691==i||2750<=i&&i<=2752||2761==i||2763<=i&&i<=2764||2818<=i&&i<=2819||2880==i||2887<=i&&i<=2888||2891<=i&&i<=2892||3007==i||3009<=i&&i<=3010||3014<=i&&i<=3016||3018<=i&&i<=3020||3073<=i&&i<=3075||3137<=i&&i<=3140||3202<=i&&i<=3203||3262==i||3264<=i&&i<=3265||3267<=i&&i<=3268||3271<=i&&i<=3272||3274<=i&&i<=3275||3330<=i&&i<=3331||3391<=i&&i<=3392||3398<=i&&i<=3400||3402<=i&&i<=3404||3458<=i&&i<=3459||3536<=i&&i<=3537||3544<=i&&i<=3550||3570<=i&&i<=3571||3635==i||3763==i||3902<=i&&i<=3903||3967==i||4145==i||4155<=i&&i<=4156||4182<=i&&i<=4183||4228==i||6070==i||6078<=i&&i<=6085||6087<=i&&i<=6088||6435<=i&&i<=6438||6441<=i&&i<=6443||6448<=i&&i<=6449||6451<=i&&i<=6456||6681<=i&&i<=6682||6741==i||6743==i||6765<=i&&i<=6770||6916==i||6965==i||6971==i||6973<=i&&i<=6977||6979<=i&&i<=6980||7042==i||7073==i||7078<=i&&i<=7079||7082==i||7143==i||7146<=i&&i<=7148||7150==i||7154<=i&&i<=7155||7204<=i&&i<=7211||7220<=i&&i<=7221||7393==i||7410<=i&&i<=7411||7415==i||43043<=i&&i<=43044||43047==i||43136<=i&&i<=43137||43188<=i&&i<=43203||43346<=i&&i<=43347||43395==i||43444<=i&&i<=43445||43450<=i&&i<=43451||43453<=i&&i<=43456||43567<=i&&i<=43568||43571<=i&&i<=43572||43597==i||43755==i||43758<=i&&i<=43759||43765==i||44003<=i&&i<=44004||44006<=i&&i<=44007||44009<=i&&i<=44010||44012==i||69632==i||69634==i||69762==i||69808<=i&&i<=69810||69815<=i&&i<=69816||69932==i||70018==i||70067<=i&&i<=70069||70079<=i&&i<=70080||70188<=i&&i<=70190||70194<=i&&i<=70195||70197==i||70368<=i&&i<=70370||70402<=i&&i<=70403||70463==i||70465<=i&&i<=70468||70471<=i&&i<=70472||70475<=i&&i<=70477||70498<=i&&i<=70499||70709<=i&&i<=70711||70720<=i&&i<=70721||70725==i||70833<=i&&i<=70834||70841==i||70843<=i&&i<=70844||70846==i||70849==i||71088<=i&&i<=71089||71096<=i&&i<=71099||71102==i||71216<=i&&i<=71218||71227<=i&&i<=71228||71230==i||71340==i||71342<=i&&i<=71343||71350==i||71456<=i&&i<=71457||71462==i||72199<=i&&i<=72200||72249==i||72279<=i&&i<=72280||72343==i||72751==i||72766==i||72873==i||72881==i||72884==i||94033<=i&&i<=94078||119142==i||119149==i?5:4352<=i&&i<=4447||43360<=i&&i<=43388?6:4448<=i&&i<=4519||55216<=i&&i<=55238?7:4520<=i&&i<=4607||55243<=i&&i<=55291?8:44032==i||44060==i||44088==i||44116==i||44144==i||44172==i||44200==i||44228==i||44256==i||44284==i||44312==i||44340==i||44368==i||44396==i||44424==i||44452==i||44480==i||44508==i||44536==i||44564==i||44592==i||44620==i||44648==i||44676==i||44704==i||44732==i||44760==i||44788==i||44816==i||44844==i||44872==i||44900==i||44928==i||44956==i||44984==i||45012==i||45040==i||45068==i||45096==i||45124==i||45152==i||45180==i||45208==i||45236==i||45264==i||45292==i||45320==i||45348==i||45376==i||45404==i||45432==i||45460==i||45488==i||45516==i||45544==i||45572==i||45600==i||45628==i||45656==i||45684==i||45712==i||45740==i||45768==i||45796==i||45824==i||45852==i||45880==i||45908==i||45936==i||45964==i||45992==i||46020==i||46048==i||46076==i||46104==i||46132==i||46160==i||46188==i||46216==i||46244==i||46272==i||46300==i||46328==i||46356==i||46384==i||46412==i||46440==i||46468==i||46496==i||46524==i||46552==i||46580==i||46608==i||46636==i||46664==i||46692==i||46720==i||46748==i||46776==i||46804==i||46832==i||46860==i||46888==i||46916==i||46944==i||46972==i||47e3==i||47028==i||47056==i||47084==i||47112==i||47140==i||47168==i||47196==i||47224==i||47252==i||47280==i||47308==i||47336==i||47364==i||47392==i||47420==i||47448==i||47476==i||47504==i||47532==i||47560==i||47588==i||47616==i||47644==i||47672==i||47700==i||47728==i||47756==i||47784==i||47812==i||47840==i||47868==i||47896==i||47924==i||47952==i||47980==i||48008==i||48036==i||48064==i||48092==i||48120==i||48148==i||48176==i||48204==i||48232==i||48260==i||48288==i||48316==i||48344==i||48372==i||48400==i||48428==i||48456==i||48484==i||48512==i||48540==i||48568==i||48596==i||48624==i||48652==i||48680==i||48708==i||48736==i||48764==i||48792==i||48820==i||48848==i||48876==i||48904==i||48932==i||48960==i||48988==i||49016==i||49044==i||49072==i||49100==i||49128==i||49156==i||49184==i||49212==i||49240==i||49268==i||49296==i||49324==i||49352==i||49380==i||49408==i||49436==i||49464==i||49492==i||49520==i||49548==i||49576==i||49604==i||49632==i||49660==i||49688==i||49716==i||49744==i||49772==i||49800==i||49828==i||49856==i||49884==i||49912==i||49940==i||49968==i||49996==i||50024==i||50052==i||50080==i||50108==i||50136==i||50164==i||50192==i||50220==i||50248==i||50276==i||50304==i||50332==i||50360==i||50388==i||50416==i||50444==i||50472==i||50500==i||50528==i||50556==i||50584==i||50612==i||50640==i||50668==i||50696==i||50724==i||50752==i||50780==i||50808==i||50836==i||50864==i||50892==i||50920==i||50948==i||50976==i||51004==i||51032==i||51060==i||51088==i||51116==i||51144==i||51172==i||51200==i||51228==i||51256==i||51284==i||51312==i||51340==i||51368==i||51396==i||51424==i||51452==i||51480==i||51508==i||51536==i||51564==i||51592==i||51620==i||51648==i||51676==i||51704==i||51732==i||51760==i||51788==i||51816==i||51844==i||51872==i||51900==i||51928==i||51956==i||51984==i||52012==i||52040==i||52068==i||52096==i||52124==i||52152==i||52180==i||52208==i||52236==i||52264==i||52292==i||52320==i||52348==i||52376==i||52404==i||52432==i||52460==i||52488==i||52516==i||52544==i||52572==i||52600==i||52628==i||52656==i||52684==i||52712==i||52740==i||52768==i||52796==i||52824==i||52852==i||52880==i||52908==i||52936==i||52964==i||52992==i||53020==i||53048==i||53076==i||53104==i||53132==i||53160==i||53188==i||53216==i||53244==i||53272==i||53300==i||53328==i||53356==i||53384==i||53412==i||53440==i||53468==i||53496==i||53524==i||53552==i||53580==i||53608==i||53636==i||53664==i||53692==i||53720==i||53748==i||53776==i||53804==i||53832==i||53860==i||53888==i||53916==i||53944==i||53972==i||54e3==i||54028==i||54056==i||54084==i||54112==i||54140==i||54168==i||54196==i||54224==i||54252==i||54280==i||54308==i||54336==i||54364==i||54392==i||54420==i||54448==i||54476==i||54504==i||54532==i||54560==i||54588==i||54616==i||54644==i||54672==i||54700==i||54728==i||54756==i||54784==i||54812==i||54840==i||54868==i||54896==i||54924==i||54952==i||54980==i||55008==i||55036==i||55064==i||55092==i||55120==i||55148==i||55176==i?9:44033<=i&&i<=44059||44061<=i&&i<=44087||44089<=i&&i<=44115||44117<=i&&i<=44143||44145<=i&&i<=44171||44173<=i&&i<=44199||44201<=i&&i<=44227||44229<=i&&i<=44255||44257<=i&&i<=44283||44285<=i&&i<=44311||44313<=i&&i<=44339||44341<=i&&i<=44367||44369<=i&&i<=44395||44397<=i&&i<=44423||44425<=i&&i<=44451||44453<=i&&i<=44479||44481<=i&&i<=44507||44509<=i&&i<=44535||44537<=i&&i<=44563||44565<=i&&i<=44591||44593<=i&&i<=44619||44621<=i&&i<=44647||44649<=i&&i<=44675||44677<=i&&i<=44703||44705<=i&&i<=44731||44733<=i&&i<=44759||44761<=i&&i<=44787||44789<=i&&i<=44815||44817<=i&&i<=44843||44845<=i&&i<=44871||44873<=i&&i<=44899||44901<=i&&i<=44927||44929<=i&&i<=44955||44957<=i&&i<=44983||44985<=i&&i<=45011||45013<=i&&i<=45039||45041<=i&&i<=45067||45069<=i&&i<=45095||45097<=i&&i<=45123||45125<=i&&i<=45151||45153<=i&&i<=45179||45181<=i&&i<=45207||45209<=i&&i<=45235||45237<=i&&i<=45263||45265<=i&&i<=45291||45293<=i&&i<=45319||45321<=i&&i<=45347||45349<=i&&i<=45375||45377<=i&&i<=45403||45405<=i&&i<=45431||45433<=i&&i<=45459||45461<=i&&i<=45487||45489<=i&&i<=45515||45517<=i&&i<=45543||45545<=i&&i<=45571||45573<=i&&i<=45599||45601<=i&&i<=45627||45629<=i&&i<=45655||45657<=i&&i<=45683||45685<=i&&i<=45711||45713<=i&&i<=45739||45741<=i&&i<=45767||45769<=i&&i<=45795||45797<=i&&i<=45823||45825<=i&&i<=45851||45853<=i&&i<=45879||45881<=i&&i<=45907||45909<=i&&i<=45935||45937<=i&&i<=45963||45965<=i&&i<=45991||45993<=i&&i<=46019||46021<=i&&i<=46047||46049<=i&&i<=46075||46077<=i&&i<=46103||46105<=i&&i<=46131||46133<=i&&i<=46159||46161<=i&&i<=46187||46189<=i&&i<=46215||46217<=i&&i<=46243||46245<=i&&i<=46271||46273<=i&&i<=46299||46301<=i&&i<=46327||46329<=i&&i<=46355||46357<=i&&i<=46383||46385<=i&&i<=46411||46413<=i&&i<=46439||46441<=i&&i<=46467||46469<=i&&i<=46495||46497<=i&&i<=46523||46525<=i&&i<=46551||46553<=i&&i<=46579||46581<=i&&i<=46607||46609<=i&&i<=46635||46637<=i&&i<=46663||46665<=i&&i<=46691||46693<=i&&i<=46719||46721<=i&&i<=46747||46749<=i&&i<=46775||46777<=i&&i<=46803||46805<=i&&i<=46831||46833<=i&&i<=46859||46861<=i&&i<=46887||46889<=i&&i<=46915||46917<=i&&i<=46943||46945<=i&&i<=46971||46973<=i&&i<=46999||47001<=i&&i<=47027||47029<=i&&i<=47055||47057<=i&&i<=47083||47085<=i&&i<=47111||47113<=i&&i<=47139||47141<=i&&i<=47167||47169<=i&&i<=47195||47197<=i&&i<=47223||47225<=i&&i<=47251||47253<=i&&i<=47279||47281<=i&&i<=47307||47309<=i&&i<=47335||47337<=i&&i<=47363||47365<=i&&i<=47391||47393<=i&&i<=47419||47421<=i&&i<=47447||47449<=i&&i<=47475||47477<=i&&i<=47503||47505<=i&&i<=47531||47533<=i&&i<=47559||47561<=i&&i<=47587||47589<=i&&i<=47615||47617<=i&&i<=47643||47645<=i&&i<=47671||47673<=i&&i<=47699||47701<=i&&i<=47727||47729<=i&&i<=47755||47757<=i&&i<=47783||47785<=i&&i<=47811||47813<=i&&i<=47839||47841<=i&&i<=47867||47869<=i&&i<=47895||47897<=i&&i<=47923||47925<=i&&i<=47951||47953<=i&&i<=47979||47981<=i&&i<=48007||48009<=i&&i<=48035||48037<=i&&i<=48063||48065<=i&&i<=48091||48093<=i&&i<=48119||48121<=i&&i<=48147||48149<=i&&i<=48175||48177<=i&&i<=48203||48205<=i&&i<=48231||48233<=i&&i<=48259||48261<=i&&i<=48287||48289<=i&&i<=48315||48317<=i&&i<=48343||48345<=i&&i<=48371||48373<=i&&i<=48399||48401<=i&&i<=48427||48429<=i&&i<=48455||48457<=i&&i<=48483||48485<=i&&i<=48511||48513<=i&&i<=48539||48541<=i&&i<=48567||48569<=i&&i<=48595||48597<=i&&i<=48623||48625<=i&&i<=48651||48653<=i&&i<=48679||48681<=i&&i<=48707||48709<=i&&i<=48735||48737<=i&&i<=48763||48765<=i&&i<=48791||48793<=i&&i<=48819||48821<=i&&i<=48847||48849<=i&&i<=48875||48877<=i&&i<=48903||48905<=i&&i<=48931||48933<=i&&i<=48959||48961<=i&&i<=48987||48989<=i&&i<=49015||49017<=i&&i<=49043||49045<=i&&i<=49071||49073<=i&&i<=49099||49101<=i&&i<=49127||49129<=i&&i<=49155||49157<=i&&i<=49183||49185<=i&&i<=49211||49213<=i&&i<=49239||49241<=i&&i<=49267||49269<=i&&i<=49295||49297<=i&&i<=49323||49325<=i&&i<=49351||49353<=i&&i<=49379||49381<=i&&i<=49407||49409<=i&&i<=49435||49437<=i&&i<=49463||49465<=i&&i<=49491||49493<=i&&i<=49519||49521<=i&&i<=49547||49549<=i&&i<=49575||49577<=i&&i<=49603||49605<=i&&i<=49631||49633<=i&&i<=49659||49661<=i&&i<=49687||49689<=i&&i<=49715||49717<=i&&i<=49743||49745<=i&&i<=49771||49773<=i&&i<=49799||49801<=i&&i<=49827||49829<=i&&i<=49855||49857<=i&&i<=49883||49885<=i&&i<=49911||49913<=i&&i<=49939||49941<=i&&i<=49967||49969<=i&&i<=49995||49997<=i&&i<=50023||50025<=i&&i<=50051||50053<=i&&i<=50079||50081<=i&&i<=50107||50109<=i&&i<=50135||50137<=i&&i<=50163||50165<=i&&i<=50191||50193<=i&&i<=50219||50221<=i&&i<=50247||50249<=i&&i<=50275||50277<=i&&i<=50303||50305<=i&&i<=50331||50333<=i&&i<=50359||50361<=i&&i<=50387||50389<=i&&i<=50415||50417<=i&&i<=50443||50445<=i&&i<=50471||50473<=i&&i<=50499||50501<=i&&i<=50527||50529<=i&&i<=50555||50557<=i&&i<=50583||50585<=i&&i<=50611||50613<=i&&i<=50639||50641<=i&&i<=50667||50669<=i&&i<=50695||50697<=i&&i<=50723||50725<=i&&i<=50751||50753<=i&&i<=50779||50781<=i&&i<=50807||50809<=i&&i<=50835||50837<=i&&i<=50863||50865<=i&&i<=50891||50893<=i&&i<=50919||50921<=i&&i<=50947||50949<=i&&i<=50975||50977<=i&&i<=51003||51005<=i&&i<=51031||51033<=i&&i<=51059||51061<=i&&i<=51087||51089<=i&&i<=51115||51117<=i&&i<=51143||51145<=i&&i<=51171||51173<=i&&i<=51199||51201<=i&&i<=51227||51229<=i&&i<=51255||51257<=i&&i<=51283||51285<=i&&i<=51311||51313<=i&&i<=51339||51341<=i&&i<=51367||51369<=i&&i<=51395||51397<=i&&i<=51423||51425<=i&&i<=51451||51453<=i&&i<=51479||51481<=i&&i<=51507||51509<=i&&i<=51535||51537<=i&&i<=51563||51565<=i&&i<=51591||51593<=i&&i<=51619||51621<=i&&i<=51647||51649<=i&&i<=51675||51677<=i&&i<=51703||51705<=i&&i<=51731||51733<=i&&i<=51759||51761<=i&&i<=51787||51789<=i&&i<=51815||51817<=i&&i<=51843||51845<=i&&i<=51871||51873<=i&&i<=51899||51901<=i&&i<=51927||51929<=i&&i<=51955||51957<=i&&i<=51983||51985<=i&&i<=52011||52013<=i&&i<=52039||52041<=i&&i<=52067||52069<=i&&i<=52095||52097<=i&&i<=52123||52125<=i&&i<=52151||52153<=i&&i<=52179||52181<=i&&i<=52207||52209<=i&&i<=52235||52237<=i&&i<=52263||52265<=i&&i<=52291||52293<=i&&i<=52319||52321<=i&&i<=52347||52349<=i&&i<=52375||52377<=i&&i<=52403||52405<=i&&i<=52431||52433<=i&&i<=52459||52461<=i&&i<=52487||52489<=i&&i<=52515||52517<=i&&i<=52543||52545<=i&&i<=52571||52573<=i&&i<=52599||52601<=i&&i<=52627||52629<=i&&i<=52655||52657<=i&&i<=52683||52685<=i&&i<=52711||52713<=i&&i<=52739||52741<=i&&i<=52767||52769<=i&&i<=52795||52797<=i&&i<=52823||52825<=i&&i<=52851||52853<=i&&i<=52879||52881<=i&&i<=52907||52909<=i&&i<=52935||52937<=i&&i<=52963||52965<=i&&i<=52991||52993<=i&&i<=53019||53021<=i&&i<=53047||53049<=i&&i<=53075||53077<=i&&i<=53103||53105<=i&&i<=53131||53133<=i&&i<=53159||53161<=i&&i<=53187||53189<=i&&i<=53215||53217<=i&&i<=53243||53245<=i&&i<=53271||53273<=i&&i<=53299||53301<=i&&i<=53327||53329<=i&&i<=53355||53357<=i&&i<=53383||53385<=i&&i<=53411||53413<=i&&i<=53439||53441<=i&&i<=53467||53469<=i&&i<=53495||53497<=i&&i<=53523||53525<=i&&i<=53551||53553<=i&&i<=53579||53581<=i&&i<=53607||53609<=i&&i<=53635||53637<=i&&i<=53663||53665<=i&&i<=53691||53693<=i&&i<=53719||53721<=i&&i<=53747||53749<=i&&i<=53775||53777<=i&&i<=53803||53805<=i&&i<=53831||53833<=i&&i<=53859||53861<=i&&i<=53887||53889<=i&&i<=53915||53917<=i&&i<=53943||53945<=i&&i<=53971||53973<=i&&i<=53999||54001<=i&&i<=54027||54029<=i&&i<=54055||54057<=i&&i<=54083||54085<=i&&i<=54111||54113<=i&&i<=54139||54141<=i&&i<=54167||54169<=i&&i<=54195||54197<=i&&i<=54223||54225<=i&&i<=54251||54253<=i&&i<=54279||54281<=i&&i<=54307||54309<=i&&i<=54335||54337<=i&&i<=54363||54365<=i&&i<=54391||54393<=i&&i<=54419||54421<=i&&i<=54447||54449<=i&&i<=54475||54477<=i&&i<=54503||54505<=i&&i<=54531||54533<=i&&i<=54559||54561<=i&&i<=54587||54589<=i&&i<=54615||54617<=i&&i<=54643||54645<=i&&i<=54671||54673<=i&&i<=54699||54701<=i&&i<=54727||54729<=i&&i<=54755||54757<=i&&i<=54783||54785<=i&&i<=54811||54813<=i&&i<=54839||54841<=i&&i<=54867||54869<=i&&i<=54895||54897<=i&&i<=54923||54925<=i&&i<=54951||54953<=i&&i<=54979||54981<=i&&i<=55007||55009<=i&&i<=55035||55037<=i&&i<=55063||55065<=i&&i<=55091||55093<=i&&i<=55119||55121<=i&&i<=55147||55149<=i&&i<=55175||55177<=i&&i<=55203?10:9757==i||9977==i||9994<=i&&i<=9997||127877==i||127938<=i&&i<=127940||127943==i||127946<=i&&i<=127948||128066<=i&&i<=128067||128070<=i&&i<=128080||128110==i||128112<=i&&i<=128120||128124==i||128129<=i&&i<=128131||128133<=i&&i<=128135||128170==i||128372<=i&&i<=128373||128378==i||128400==i||128405<=i&&i<=128406||128581<=i&&i<=128583||128587<=i&&i<=128591||128675==i||128692<=i&&i<=128694||128704==i||128716==i||129304<=i&&i<=129308||129310<=i&&i<=129311||129318==i||129328<=i&&i<=129337||129341<=i&&i<=129342||129489<=i&&i<=129501?r:127995<=i&&i<=127999?14:8205==i?15:9792==i||9794==i||9877<=i&&i<=9878||9992==i||10084==i||127752==i||127806==i||127859==i||127891==i||127908==i||127912==i||127979==i||127981==i||128139==i||128187<=i&&i<=128188||128295==i||128300==i||128488==i||128640==i||128658==i?l:128102<=i&&i<=128105?o:11}return this.nextBreak=function(e,n){if(void 0===n&&(n=0),n<0)return 0;if(n>=e.length-1)return e.length;for(var t,r,l=u(i(e,n)),o=[],a=n+1;a<e.length;a++)if(r=a-1,!(55296<=(t=e).charCodeAt(r)&&t.charCodeAt(r)<=56319&&56320<=t.charCodeAt(r+1)&&t.charCodeAt(r+1)<=57343)){var s=u(i(e,a));if(c(l,o,s))return a;o.push(s)}return e.length},this.splitGraphemes=function(e){for(var n,t=[],r=0;(n=this.nextBreak(e,r))<e.length;)t.push(e.slice(r,n)),r=n;return r<e.length&&t.push(e.slice(r)),t},this.iterateGraphemes=function(e){var n=0,t={next:function(){var t,r;return(r=this.nextBreak(e,n))<e.length?(t=e.slice(n,r),n=r,{value:t,done:!1}):n<e.length?(t=e.slice(n),n=e.length,{value:t,done:!1}):{value:void 0,done:!0}}.bind(this)};return"undefined"!=typeof Symbol&&Symbol.iterator&&(t[Symbol.iterator]=function(){return t}),t},this.countGraphemes=function(e){for(var n,t=0,r=0;(n=this.nextBreak(e,r))<e.length;)r=n,t++;return r<e.length&&t++,t},this})}))),r=function(e,n,r){for(var l=t.iterateGraphemes(e.substring(n)),o="",i=0;i<r-n;i++){var c=l.next();if(o+=c.value,c.done)break}return o},l=function(e,n,t,r,l,o,i){return{start:{line:e,column:n,offset:t},end:{line:r,column:l,offset:o},source:i||null}},o=e((function(e,n){e.exports=function(){var e,n="",t=function(t,r){if("string"!=typeof t)throw new TypeError("expected a string");if(1===r)return t;if(2===r)return t+t;var l=t.length*r;if(e!==t||void 0===e)e=t,n="";else if(n.length>=l)return n.substr(0,l);for(;l>n.length&&r>1;)1&r&&(n+=t),r>>=1,t+=t;return n=(n+=t).substr(0,l)},r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e};function l(e,n,r,l){var o=function(e,n,t){if(null==e||null==n)return e;var r=String(e),l="number"==typeof n?n:parseInt(n,10);if(isNaN(l)||!isFinite(l))return r;var o=r.length;if(o>=l)return r;var i=null==t?"":String(t);""===i&&(i=" ");for(var c=l-o;i.length<c;)i+=i;return(i.length>c?i.substr(0,c):i)+r}(String(n),r," "),i=t(" ",l.tabSize);return o+" | "+e.replace(/\t/g,i)}function o(e,n,t,r,o){return e.slice(n,t).map((function(e,t){return l(e,n+t+1,r,o)})).join("\n")}var i={extraLines:2,tabSize:4};return function(e,n,c,u){u=r({},i,u);var a=e.split(/\r\n?|\n|\f/),s=Math.max(1,n-u.extraLines)-1,f=Math.min(n+u.extraLines,a.length),d=String(f).length,v=o(a,s,n,d,u),h=l(a[n-1].substring(0,c-1),n,d,u);return[v,t(" ",h.length)+"^",o(a,n,f,d,u)].filter(Boolean).join("\n")}}()})),i=(new Error).stack,c=function(e,n,t,r,l){throw function(e){var n=Object.create(SyntaxError.prototype);return Object.assign(n,e,{name:"SyntaxError"}),Object.defineProperty(n,"stack",{get:function(){return i?i.replace(/^(.+\n){1,3}/,String(n)+"\n"):""}}),n}({message:r?e+"\n"+o(n,r,l):e,rawMessage:e,source:t,line:r,column:l})},u=function(){return"Unexpected end of input"},a=function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return"Unexpected token <"+e+"> at "+t.filter(Boolean).join(":")},s=function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return"Unexpected symbol <"+e+"> at "+t.filter(Boolean).join(":")},f=0,d=1,v=2,h=3,p=4,m=5,y=6,b=7,k=8,g=9,x=10,O={"{":f,"}":d,"[":v,"]":h,":":p,",":m},w={true:k,false:g,null:x},N=0,A=1,S=2,B={'"':0,"\\":1,"/":2,b:3,f:4,n:5,r:6,t:7,u:8},I=0,j=1,_=2,P=3,E=4,C=5,L=6,M=7;function T(e){return e>="1"&&e<="9"}function G(e){return e>="0"&&e<="9"}function z(e){return G(e)||e>="a"&&e<="f"||e>="A"&&e<="F"}function U(e){return"e"===e||"E"===e}function R(e,n,t,r){var l=e.charAt(n);if("\r"===l)n++,t++,r=1,"\n"===e.charAt(n)&&n++;else if("\n"===l)n++,t++,r=1;else{if("\t"!==l&&" "!==l)return null;n++,r++}return{index:n,line:t,column:r}}function D(e,n,t,r){var l=e.charAt(n);return l in O?{type:O[l],line:t,column:r+1,index:n+1,value:null}:null}function $(e,n,t,r){for(var l in w)if(w.hasOwnProperty(l)&&e.substr(n,l.length)===l)return{type:w[l],line:t,column:r+l.length,index:n+l.length,value:l};return null}function W(e,n,t,r){for(var l=n,o=N;n<e.length;){var i=e.charAt(n);switch(o){case N:if('"'!==i)return null;n++,o=A;break;case A:if("\\"===i)n++,o=S;else{if('"'===i)return n++,{type:y,line:t,column:r+n-l,index:n,value:e.slice(l,n)};n++}break;case S:if(!(i in B))return null;if(n++,"u"===i)for(var c=0;c<4;c++){var u=e.charAt(n);if(!u||!z(u))return null;n++}o=A}}}function F(e,n,t,r){var l=n,o=n,i=I;e:for(;n<e.length;){var c=e.charAt(n);switch(i){case I:if("-"===c)i=j;else if("0"===c)o=n+1,i=_;else{if(!T(c))return null;o=n+1,i=P}break;case j:if("0"===c)o=n+1,i=_;else{if(!T(c))return null;o=n+1,i=P}break;case _:if("."===c)i=E;else{if(!U(c))break e;i=L}break;case P:if(G(c))o=n+1;else if("."===c)i=E;else{if(!U(c))break e;i=L}break;case E:if(!G(c))break e;o=n+1,i=C;break;case C:if(G(c))o=n+1;else{if(!U(c))break e;i=L}break;case L:if("+"===c||"-"===c)i=M;else{if(!G(c))break e;o=n+1,i=M}break;case M:if(!G(c))break e;o=n+1}n++}return o>0?{type:b,line:t,column:r+o-l,index:o,value:e.slice(l,o)}:null}var H=0,V=1,Z=2,K=3,Q=0,X=1,q=2,J=0,Y=1,ee=2,ne=3,te={loc:!0,source:null};function re(e,n,t){var r=n.length>0?n[n.length-1].loc.end:{line:1,column:1};c(u(),e,t.source,r.line,r.column)}function le(e){for(var n=0,t=0;t<4;t++)n=16*n+parseInt(e[t],16);return String.fromCharCode(n)}var oe={b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},ie=['"',"\\","/"];function ce(e){for(var n="",t=0;t<e.length;t++){var r=e.charAt(t);if("\\"===r){t++;var l=e.charAt(t);if("u"===l)n+=le(e.substr(t+1,4)),t+=4;else if(-1!==ie.indexOf(l))n+=l;else{if(!(l in oe))break;n+=oe[l]}}else n+=r}return n}function ue(e,n,t,o){for(var i=void 0,u={type:"Object",children:[]},s=H;t<n.length;){var v=n[t];switch(s){case H:if(v.type!==f)return null;i=v,s=V,t++;break;case V:if(v.type===d)return o.loc&&(u.loc=l(i.loc.start.line,i.loc.start.column,i.loc.start.offset,v.loc.end.line,v.loc.end.column,v.loc.end.offset,o.source)),{value:u,index:t+1};var h=ae(e,n,t,o);u.children.push(h.value),s=Z,t=h.index;break;case Z:if(v.type===d)return o.loc&&(u.loc=l(i.loc.start.line,i.loc.start.column,i.loc.start.offset,v.loc.end.line,v.loc.end.column,v.loc.end.offset,o.source)),{value:u,index:t+1};v.type===m?(s=K,t++):c(a(r(e,v.loc.start.offset,v.loc.end.offset),o.source,v.loc.start.line,v.loc.start.column),e,o.source,v.loc.start.line,v.loc.start.column);break;case K:var p=ae(e,n,t,o);p?(t=p.index,u.children.push(p.value),s=Z):c(a(r(e,v.loc.start.offset,v.loc.end.offset),o.source,v.loc.start.line,v.loc.start.column),e,o.source,v.loc.start.line,v.loc.start.column)}}re(e,n,o)}function ae(e,n,t,o){for(var i=void 0,u={type:"Property",key:null,value:null},s=Q;t<n.length;){var f=n[t];switch(s){case Q:if(f.type!==y)return null;var d={type:"Identifier",value:ce(e.slice(f.loc.start.offset+1,f.loc.end.offset-1)),raw:f.value};o.loc&&(d.loc=f.loc),i=f,u.key=d,s=X,t++;break;case X:f.type===p?(s=q,t++):c(a(r(e,f.loc.start.offset,f.loc.end.offset),o.source,f.loc.start.line,f.loc.start.column),e,o.source,f.loc.start.line,f.loc.start.column);break;case q:var v=de(e,n,t,o);return u.value=v.value,o.loc&&(u.loc=l(i.loc.start.line,i.loc.start.column,i.loc.start.offset,v.value.loc.end.line,v.value.loc.end.column,v.value.loc.end.offset,o.source)),{value:u,index:v.index}}}}function se(e,n,t,o){for(var i=void 0,u={type:"Array",children:[]},s=J,f=void 0;t<n.length;)switch(f=n[t],s){case J:if(f.type!==v)return null;i=f,s=Y,t++;break;case Y:if(f.type===h)return o.loc&&(u.loc=l(i.loc.start.line,i.loc.start.column,i.loc.start.offset,f.loc.end.line,f.loc.end.column,f.loc.end.offset,o.source)),{value:u,index:t+1};var d=de(e,n,t,o);t=d.index,u.children.push(d.value),s=ee;break;case ee:if(f.type===h)return o.loc&&(u.loc=l(i.loc.start.line,i.loc.start.column,i.loc.start.offset,f.loc.end.line,f.loc.end.column,f.loc.end.offset,o.source)),{value:u,index:t+1};f.type===m?(s=ne,t++):c(a(r(e,f.loc.start.offset,f.loc.end.offset),o.source,f.loc.start.line,f.loc.start.column),e,o.source,f.loc.start.line,f.loc.start.column);break;case ne:var p=de(e,n,t,o);t=p.index,u.children.push(p.value),s=ee}re(e,n,o)}function fe(e,n,t,r){var l=n[t],o=null;switch(l.type){case y:o=ce(e.slice(l.loc.start.offset+1,l.loc.end.offset-1));break;case b:o=Number(l.value);break;case k:o=!0;break;case g:o=!1;break;case x:o=null;break;default:return null}var i={type:"Literal",value:o,raw:l.value};return r.loc&&(i.loc=l.loc),{value:i,index:t+1}}function de(e,n,t,l){var o=n[t],i=fe.apply(void 0,arguments)||ue.apply(void 0,arguments)||se.apply(void 0,arguments);if(i)return i;c(a(r(e,o.loc.start.offset,o.loc.end.offset),l.source,o.loc.start.line,o.loc.start.column),e,l.source,o.loc.start.line,o.loc.start.column)}return function(e,n){var t=function(e,n){for(var t=1,o=1,i=0,u=[];i<e.length;){var a=[e,i,t,o],f=R.apply(void 0,a);if(f)i=f.index,t=f.line,o=f.column;else{var d=D.apply(void 0,a)||$.apply(void 0,a)||W.apply(void 0,a)||F.apply(void 0,a);if(d){var v={type:d.type,value:d.value,loc:l(t,o,i,d.line,d.column,d.index,n.source)};u.push(v),i=d.index,t=d.line,o=d.column}else c(s(r(e,i,i+1),n.source,t,o),e,n.source,t,o)}}return u}(e,n=Object.assign({},te,n));0===t.length&&re(e,t,n);var o=de(e,t,0,n);if(o.index===t.length)return o.value;var i=t[o.index];c(a(r(e,i.loc.start.offset,i.loc.end.offset),n.source,i.loc.start.line,i.loc.start.column),e,n.source,i.loc.start.line,i.loc.start.column)}},e.exports=t()}).call(this,t(0))}]);
//# sourceMappingURL=linter.js.map