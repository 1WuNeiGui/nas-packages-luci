var G=Object.defineProperty;var _=Object.getOwnPropertySymbols;var U=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var B=(p,l,i)=>l in p?G(p,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):p[l]=i,V=(p,l)=>{for(var i in l||(l={}))U.call(l,i)&&B(p,i,l[i]);if(_)for(var i of _(l))H.call(l,i)&&B(p,i,l[i]);return p};var E=(p,l,i)=>new Promise((d,u)=>{var w=c=>{try{y(i.next(c))}catch(f){u(f)}},P=c=>{try{y(i.throw(c))}catch(f){u(f)}},y=c=>c.done?d(c.value):Promise.resolve(c.value).then(w,P);y((i=i.apply(p,l)).next())});import{d as J,s as z,j as K,v as Q,o as C,c as M,a as h,x as g,z as k,y as L,F as W,m as O,l as X,A as Y,B as N,C as j,T as $}from"./index.js";var Z=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},q={exports:{}};(function(p){(function(l){const i="(0?\\d+|0x[a-f0-9]+)",d={fourOctet:new RegExp(`^${i}\\.${i}\\.${i}\\.${i}$`,"i"),threeOctet:new RegExp(`^${i}\\.${i}\\.${i}$`,"i"),twoOctet:new RegExp(`^${i}\\.${i}$`,"i"),longValue:new RegExp(`^${i}$`,"i")},u=new RegExp("^0[0-7]+$","i"),w=new RegExp("^0x[a-f0-9]+$","i"),P="%[0-9a-z]{1,}",y="(?:[0-9a-f]+::?)+",c={zoneIndex:new RegExp(P,"i"),native:new RegExp(`^(::)?(${y})?([0-9a-f]+)?(::)?(${P})?$`,"i"),deprecatedTransitional:new RegExp(`^(?:::)(${i}\\.${i}\\.${i}\\.${i}(${P})?)$`,"i"),transitional:new RegExp(`^((?:${y})|(?:::)(?:${y})?)${i}\\.${i}\\.${i}\\.${i}(${P})?$`,"i")};function f(t,e){if(t.indexOf("::")!==t.lastIndexOf("::"))return null;let r=0,n=-1,o=(t.match(c.zoneIndex)||[])[0],s,I;for(o&&(o=o.substring(1),t=t.replace(/%.+$/,""));(n=t.indexOf(":",n+1))>=0;)r++;if(t.substr(0,2)==="::"&&r--,t.substr(-2,2)==="::"&&r--,r>e)return null;for(I=e-r,s=":";I--;)s+="0:";return t=t.replace("::",s),t[0]===":"&&(t=t.slice(1)),t[t.length-1]===":"&&(t=t.slice(0,-1)),e=function(){const S=t.split(":"),A=[];for(let F=0;F<S.length;F++)A.push(parseInt(S[F],16));return A}(),{parts:e,zoneId:o}}function v(t,e,r,n){if(t.length!==e.length)throw new Error("ipaddr: cannot match CIDR for objects with different lengths");let o=0,s;for(;n>0;){if(s=r-n,s<0&&(s=0),t[o]>>s!==e[o]>>s)return!1;n-=r,o+=1}return!0}function m(t){if(w.test(t))return parseInt(t,16);if(t[0]==="0"&&!isNaN(parseInt(t[1],10))){if(u.test(t))return parseInt(t,8);throw new Error(`ipaddr: cannot parse ${t} as octal`)}return parseInt(t,10)}function R(t,e){for(;t.length<e;)t=`0${t}`;return t}const a={};a.IPv4=function(){function t(e){if(e.length!==4)throw new Error("ipaddr: ipv4 octet count should be 4");let r,n;for(r=0;r<e.length;r++)if(n=e[r],!(0<=n&&n<=255))throw new Error("ipaddr: ipv4 octet should fit in 8 bits");this.octets=e}return t.prototype.SpecialRanges={unspecified:[[new t([0,0,0,0]),8]],broadcast:[[new t([255,255,255,255]),32]],multicast:[[new t([224,0,0,0]),4]],linkLocal:[[new t([169,254,0,0]),16]],loopback:[[new t([127,0,0,0]),8]],carrierGradeNat:[[new t([100,64,0,0]),10]],private:[[new t([10,0,0,0]),8],[new t([172,16,0,0]),12],[new t([192,168,0,0]),16]],reserved:[[new t([192,0,0,0]),24],[new t([192,0,2,0]),24],[new t([192,88,99,0]),24],[new t([198,51,100,0]),24],[new t([203,0,113,0]),24],[new t([240,0,0,0]),4]]},t.prototype.kind=function(){return"ipv4"},t.prototype.match=function(e,r){let n;if(r===void 0&&(n=e,e=n[0],r=n[1]),e.kind()!=="ipv4")throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");return v(this.octets,e.octets,8,r)},t.prototype.prefixLengthFromSubnetMask=function(){let e=0,r=!1;const n={0:8,128:7,192:6,224:5,240:4,248:3,252:2,254:1,255:0};let o,s,I;for(o=3;o>=0;o-=1)if(s=this.octets[o],s in n){if(I=n[s],r&&I!==0)return null;I!==8&&(r=!0),e+=I}else return null;return 32-e},t.prototype.range=function(){return a.subnetMatch(this,this.SpecialRanges)},t.prototype.toByteArray=function(){return this.octets.slice(0)},t.prototype.toIPv4MappedAddress=function(){return a.IPv6.parse(`::ffff:${this.toString()}`)},t.prototype.toNormalizedString=function(){return this.toString()},t.prototype.toString=function(){return this.octets.join(".")},t}(),a.IPv4.broadcastAddressFromCIDR=function(t){try{const e=this.parseCIDR(t),r=e[0].toByteArray(),n=this.subnetMaskFromPrefixLength(e[1]).toByteArray(),o=[];let s=0;for(;s<4;)o.push(parseInt(r[s],10)|parseInt(n[s],10)^255),s++;return new this(o)}catch(e){throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},a.IPv4.isIPv4=function(t){return this.parser(t)!==null},a.IPv4.isValid=function(t){try{return new this(this.parser(t)),!0}catch(e){return!1}},a.IPv4.isValidFourPartDecimal=function(t){return!!(a.IPv4.isValid(t)&&t.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/))},a.IPv4.networkAddressFromCIDR=function(t){let e,r,n,o,s;try{for(e=this.parseCIDR(t),n=e[0].toByteArray(),s=this.subnetMaskFromPrefixLength(e[1]).toByteArray(),o=[],r=0;r<4;)o.push(parseInt(n[r],10)&parseInt(s[r],10)),r++;return new this(o)}catch(I){throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},a.IPv4.parse=function(t){const e=this.parser(t);if(e===null)throw new Error("ipaddr: string is not formatted like an IPv4 Address");return new this(e)},a.IPv4.parseCIDR=function(t){let e;if(e=t.match(/^(.+)\/(\d+)$/)){const r=parseInt(e[2]);if(r>=0&&r<=32){const n=[this.parse(e[1]),r];return Object.defineProperty(n,"toString",{value:function(){return this.join("/")}}),n}}throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")},a.IPv4.parser=function(t){let e,r,n;if(e=t.match(d.fourOctet))return function(){const o=e.slice(1,6),s=[];for(let I=0;I<o.length;I++)r=o[I],s.push(m(r));return s}();if(e=t.match(d.longValue)){if(n=m(e[1]),n>4294967295||n<0)throw new Error("ipaddr: address outside defined range");return function(){const o=[];let s;for(s=0;s<=24;s+=8)o.push(n>>s&255);return o}().reverse()}else return(e=t.match(d.twoOctet))?function(){const o=e.slice(1,4),s=[];if(n=m(o[1]),n>16777215||n<0)throw new Error("ipaddr: address outside defined range");return s.push(m(o[0])),s.push(n>>16&255),s.push(n>>8&255),s.push(n&255),s}():(e=t.match(d.threeOctet))?function(){const o=e.slice(1,5),s=[];if(n=m(o[2]),n>65535||n<0)throw new Error("ipaddr: address outside defined range");return s.push(m(o[0])),s.push(m(o[1])),s.push(n>>8&255),s.push(n&255),s}():null},a.IPv4.subnetMaskFromPrefixLength=function(t){if(t=parseInt(t),t<0||t>32)throw new Error("ipaddr: invalid IPv4 prefix length");const e=[0,0,0,0];let r=0;const n=Math.floor(t/8);for(;r<n;)e[r]=255,r++;return n<4&&(e[n]=Math.pow(2,t%8)-1<<8-t%8),new this(e)},a.IPv6=function(){function t(e,r){let n,o;if(e.length===16)for(this.parts=[],n=0;n<=14;n+=2)this.parts.push(e[n]<<8|e[n+1]);else if(e.length===8)this.parts=e;else throw new Error("ipaddr: ipv6 part count should be 8 or 16");for(n=0;n<this.parts.length;n++)if(o=this.parts[n],!(0<=o&&o<=65535))throw new Error("ipaddr: ipv6 part should fit in 16 bits");r&&(this.zoneId=r)}return t.prototype.SpecialRanges={unspecified:[new t([0,0,0,0,0,0,0,0]),128],linkLocal:[new t([65152,0,0,0,0,0,0,0]),10],multicast:[new t([65280,0,0,0,0,0,0,0]),8],loopback:[new t([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new t([64512,0,0,0,0,0,0,0]),7],ipv4Mapped:[new t([0,0,0,0,0,65535,0,0]),96],rfc6145:[new t([0,0,0,0,65535,0,0,0]),96],rfc6052:[new t([100,65435,0,0,0,0,0,0]),96],"6to4":[new t([8194,0,0,0,0,0,0,0]),16],teredo:[new t([8193,0,0,0,0,0,0,0]),32],reserved:[[new t([8193,3512,0,0,0,0,0,0]),32]]},t.prototype.isIPv4MappedAddress=function(){return this.range()==="ipv4Mapped"},t.prototype.kind=function(){return"ipv6"},t.prototype.match=function(e,r){let n;if(r===void 0&&(n=e,e=n[0],r=n[1]),e.kind()!=="ipv6")throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");return v(this.parts,e.parts,16,r)},t.prototype.prefixLengthFromSubnetMask=function(){let e=0,r=!1;const n={0:16,32768:15,49152:14,57344:13,61440:12,63488:11,64512:10,65024:9,65280:8,65408:7,65472:6,65504:5,65520:4,65528:3,65532:2,65534:1,65535:0};let o,s;for(let I=7;I>=0;I-=1)if(o=this.parts[I],o in n){if(s=n[o],r&&s!==0)return null;s!==16&&(r=!0),e+=s}else return null;return 128-e},t.prototype.range=function(){return a.subnetMatch(this,this.SpecialRanges)},t.prototype.toByteArray=function(){let e;const r=[],n=this.parts;for(let o=0;o<n.length;o++)e=n[o],r.push(e>>8),r.push(e&255);return r},t.prototype.toFixedLengthString=function(){const e=function(){const n=[];for(let o=0;o<this.parts.length;o++)n.push(R(this.parts[o].toString(16),4));return n}.call(this).join(":");let r="";return this.zoneId&&(r=`%${this.zoneId}`),e+r},t.prototype.toIPv4Address=function(){if(!this.isIPv4MappedAddress())throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");const e=this.parts.slice(-2),r=e[0],n=e[1];return new a.IPv4([r>>8,r&255,n>>8,n&255])},t.prototype.toNormalizedString=function(){const e=function(){const n=[];for(let o=0;o<this.parts.length;o++)n.push(this.parts[o].toString(16));return n}.call(this).join(":");let r="";return this.zoneId&&(r=`%${this.zoneId}`),e+r},t.prototype.toRFC5952String=function(){const e=/((^|:)(0(:|$)){2,})/g,r=this.toNormalizedString();let n=0,o=-1,s;for(;s=e.exec(r);)s[0].length>o&&(n=s.index,o=s[0].length);return o<0?r:`${r.substring(0,n)}::${r.substring(n+o)}`},t.prototype.toString=function(){return this.toNormalizedString().replace(/((^|:)(0(:|$))+)/,"::")},t}(),a.IPv6.broadcastAddressFromCIDR=function(t){try{const e=this.parseCIDR(t),r=e[0].toByteArray(),n=this.subnetMaskFromPrefixLength(e[1]).toByteArray(),o=[];let s=0;for(;s<16;)o.push(parseInt(r[s],10)|parseInt(n[s],10)^255),s++;return new this(o)}catch(e){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${e})`)}},a.IPv6.isIPv6=function(t){return this.parser(t)!==null},a.IPv6.isValid=function(t){if(typeof t=="string"&&t.indexOf(":")===-1)return!1;try{const e=this.parser(t);return new this(e.parts,e.zoneId),!0}catch(e){return!1}},a.IPv6.networkAddressFromCIDR=function(t){let e,r,n,o,s;try{for(e=this.parseCIDR(t),n=e[0].toByteArray(),s=this.subnetMaskFromPrefixLength(e[1]).toByteArray(),o=[],r=0;r<16;)o.push(parseInt(n[r],10)&parseInt(s[r],10)),r++;return new this(o)}catch(I){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${I})`)}},a.IPv6.parse=function(t){const e=this.parser(t);if(e.parts===null)throw new Error("ipaddr: string is not formatted like an IPv6 Address");return new this(e.parts,e.zoneId)},a.IPv6.parseCIDR=function(t){let e,r,n;if((r=t.match(/^(.+)\/(\d+)$/))&&(e=parseInt(r[2]),e>=0&&e<=128))return n=[this.parse(r[1]),e],Object.defineProperty(n,"toString",{value:function(){return this.join("/")}}),n;throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")},a.IPv6.parser=function(t){let e,r,n,o,s,I;if(n=t.match(c.deprecatedTransitional))return this.parser(`::ffff:${n[1]}`);if(c.native.test(t))return f(t,8);if((n=t.match(c.transitional))&&(I=n[6]||"",e=f(n[1].slice(0,-1)+I,6),e.parts)){for(s=[parseInt(n[2]),parseInt(n[3]),parseInt(n[4]),parseInt(n[5])],r=0;r<s.length;r++)if(o=s[r],!(0<=o&&o<=255))return null;return e.parts.push(s[0]<<8|s[1]),e.parts.push(s[2]<<8|s[3]),{parts:e.parts,zoneId:e.zoneId}}return null},a.IPv6.subnetMaskFromPrefixLength=function(t){if(t=parseInt(t),t<0||t>128)throw new Error("ipaddr: invalid IPv6 prefix length");const e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];let r=0;const n=Math.floor(t/8);for(;r<n;)e[r]=255,r++;return n<16&&(e[n]=Math.pow(2,t%8)-1<<8-t%8),new this(e)},a.fromByteArray=function(t){const e=t.length;if(e===4)return new a.IPv4(t);if(e===16)return new a.IPv6(t);throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address")},a.isValid=function(t){return a.IPv6.isValid(t)||a.IPv4.isValid(t)},a.parse=function(t){if(a.IPv6.isValid(t))return a.IPv6.parse(t);if(a.IPv4.isValid(t))return a.IPv4.parse(t);throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")},a.parseCIDR=function(t){try{return a.IPv6.parseCIDR(t)}catch(e){try{return a.IPv4.parseCIDR(t)}catch(r){throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")}}},a.process=function(t){const e=this.parse(t);return e.kind()==="ipv6"&&e.isIPv4MappedAddress()?e.toIPv4Address():e},a.subnetMatch=function(t,e,r){let n,o,s,I;r==null&&(r="unicast");for(o in e)if(Object.prototype.hasOwnProperty.call(e,o)){for(s=e[o],s[0]&&!(s[0]instanceof Array)&&(s=[s]),n=0;n<s.length;n++)if(I=s[n],t.kind()===I[0].kind()&&t.match.apply(t,I))return o}return r},p.exports?p.exports=a:l.ipaddr=a})(Z)})(q);var D=q.exports;const tt=p=>D.isValid(p),b=p=>{const l=D.IPv4.parse(p).toByteArray();return l[0]<<24|l[1]<<16|l[2]<<8|l[3]},T=p=>D.fromByteArray([p>>24&255,p>>16&255,p>>8&255,p&255]).toString(),et=p=>{if(!D.IPv4.isIPv4(p))return!1;let l=0,i=b(p);for(let d=31;d>=0&&(i&1<<d)!=0;d--)l=l+(1<<d);return(~l&i)==0},nt=(p,l,i,d)=>{let u=b(p)&b(l),w=b(i),P=b(d),c=~b(l);return w<P&&w>u+1&&P<u+c},rt=(p,l)=>{let i=b(l),d=b(p)&i,u=~i,w;return u>=105?(w=d|u-5,d=d|100):u>=3?(w=d|u-1,d=d|2):(d=d|1,w=d),[T(d),T(w)]};var x={isValidMask:et,isValidIP:tt,isValidMaskRange:nt,calcMaskRange:rt};const st=["onSubmit"],ot=h("div",{class:"label-name"},[h("span",null,"\u5185\u7F51\u5730\u5740")],-1),it={class:"label-value"},at=h("div",{class:"label-name"},[h("span",null,"\u5B50\u7F51\u63A9\u7801")],-1),ut={class:"label-value"},lt=h("div",{class:"label-name"},[h("span",null,"\u4FEE\u6539DHCP\u670D\u52A1")],-1),dt={class:"label-value"},ct={class:"label-flex"},pt=N("\u5173\u95ED"),ft=N("\u542F\u7528"),ht=h("div",{class:"label-name"},[h("span",null,"IP\u6C60\u8D77\u59CB\u5730\u5740")],-1),It={class:"label-value"},vt=h("div",{class:"label-name"},[h("span",null,"IP\u6C60\u7ED3\u675F\u5730\u5740")],-1),wt={class:"label-value"},mt={class:"label-btns"},Pt=["disabled"],yt={key:1,class:"label-msg"},xt=J({__name:"index",setup(p){return E(this,null,function*(){let l,i;const d=z(""),u=K({lanIp:"",netMask:"255.255.255.0",enableDhcp:!1,dhcpStart:"",dhcpEnd:""}),w=z(!1),P=()=>E(this,null,function*(){w.value=!0;const c=yield j.Guide.GetLan.GET();if(c.data){const{result:f}=c.data;f&&(u.lanIp=f.lanIp,u.netMask=f.netMask,u.enableDhcp=f.enableDhcp||!1,u.dhcpStart=f.dhcpStart,u.dhcpEnd=f.dhcpEnd,f.lanIp,location.hostname)}w.value=!1});[l,i]=Q(()=>P()),yield l,i();const y=()=>E(this,null,function*(){const c=V({},u);if(!x.isValidIP(c.lanIp)){$.Error("IPv4\u5730\u5740\u683C\u5F0F\u9519\u8BEF");return}if(!x.isValidMask(c.netMask)){$.Error("IPv4\u5B50\u7F51\u63A9\u7801\u683C\u5F0F\u9519\u8BEF");return}if(c.enableDhcp&&!x.isValidIP(c.dhcpStart)||!x.isValidIP(c.dhcpEnd)||!x.isValidMaskRange(c.lanIp,c.netMask,c.dhcpStart,c.dhcpEnd)){$.Error("DHCP\u7684IP\u6C60\u683C\u5F0F\u9519\u8BEF\u6216\u8D85\u51FA\u5B50\u7F51\u8303\u56F4");return}const f=$.Loading("\u6B63\u5728\u914D\u7F6E,\u8BF7\u7A0D\u7B49\u2026");let v=!1;try{const m=yield j.Guide.LanIp.POST(c);if(m.data){const{result:R,success:a,error:t}=m.data;if(t){d.value=t;return}if((a||0)==0){v=!0;return}}}catch(m){d.value=m}v&&(d.value=`\u66F4\u65B0\u6210\u529F,\u8BF7\u8FDB\u5165 ${c.lanIp} \u8DEF\u7531\u5668\u5730\u5740`),f.Close()});return(c,f)=>(C(),M("form",{class:"form-container",onSubmit:Y(y,["prevent"])},[ot,h("div",it,[g(h("input",{type:"text",placeholder:"192.168.100.1","onUpdate:modelValue":f[0]||(f[0]=v=>u.lanIp=v),required:""},null,512),[[k,u.lanIp,void 0,{trim:!0}]])]),at,h("div",ut,[g(h("input",{type:"text",placeholder:"255.255.255.0","onUpdate:modelValue":f[1]||(f[1]=v=>u.netMask=v),required:""},null,512),[[k,u.netMask,void 0,{trim:!0}]])]),lt,h("div",dt,[h("div",ct,[h("label",null,[g(h("input",{type:"radio",value:!1,"onUpdate:modelValue":f[2]||(f[2]=v=>u.enableDhcp=v)},null,512),[[L,u.enableDhcp]]),pt]),h("label",null,[g(h("input",{type:"radio",value:!0,"onUpdate:modelValue":f[3]||(f[3]=v=>u.enableDhcp=v)},null,512),[[L,u.enableDhcp]]),ft])])]),u.enableDhcp?(C(),M(W,{key:0},[ht,h("div",It,[g(h("input",{type:"text",placeholder:"192.168.100.100","onUpdate:modelValue":f[4]||(f[4]=v=>u.dhcpStart=v),required:""},null,512),[[k,u.dhcpStart,void 0,{trim:!0}]])]),vt,h("div",wt,[g(h("input",{type:"text",placeholder:"192.168.100.100","onUpdate:modelValue":f[5]||(f[5]=v=>u.dhcpEnd=v),required:""},null,512),[[k,u.dhcpEnd,void 0,{trim:!0}]])])],64)):O("",!0),h("div",mt,[h("button",{class:"sumbit",disabled:w.value},"\u4FDD\u5B58",8,Pt)]),d.value?(C(),M("div",yt,[h("span",null,X(d.value),1)])):O("",!0)],40,st))})}});export{xt as default};
