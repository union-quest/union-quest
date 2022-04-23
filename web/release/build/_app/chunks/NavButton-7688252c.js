import{Y as L,E as Y,Z,D as K,_ as X,$,S as ee,i as te,s as ne,F as ae,e as ie,c as se,a as re,d as Q,b as o,f as le,Q as oe,H as ue,I as ye,J as pe,p as de,n as ce,a0 as me}from"./vendor-ce3c3463.js";import{b as S,f as fe,c as be,d as Te,l as ge,n as N}from"./notifications-998beaef.js";import{b as C}from"./paths-28a87002.js";const he="kovan",ve="42",ke={DAI:{address:"0xe96FE7538e5d11bbe313481Ab2aAc2171c3815fa",abi:[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"mint",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"sender",type:"address"},{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"}]},MarketRegistry:{address:"0xbcB4Ed6cC2dfa99FEF06015D88dd4b0aC9E6ED31",abi:[{inputs:[{internalType:"address",name:"_manager",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{inputs:[{internalType:"address",name:"token",type:"address"}],name:"tokens",outputs:[{internalType:"address",name:"",type:"address"},{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"}]},UnionQuestCore:{address:"0xeC40Ae2f4785A200D6F43A296202FB7D265F9dC2",abi:[{inputs:[{internalType:"address",name:"_marketRegistry",type:"address"},{internalType:"address",name:"_unionToken",type:"address"},{internalType:"address",name:"_underlyingToken",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"_index",type:"uint256"},{components:[{internalType:"string",name:"name",type:"string"},{internalType:"string",name:"description",type:"string"},{internalType:"uint256",name:"buyPrice",type:"uint256"},{internalType:"uint256",name:"sellPrice",type:"uint256"}],indexed:!1,internalType:"struct UnionQuestCore.ItemType",name:"_itemType",type:"tuple"}],name:"AddItemType",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"_x",type:"uint256"},{indexed:!1,internalType:"uint256",name:"_y",type:"uint256"},{components:[{internalType:"string",name:"name",type:"string"},{internalType:"string",name:"description",type:"string"},{internalType:"contract UnionQuestVillage",name:"member",type:"address"}],indexed:!1,internalType:"struct UnionQuestCore.Village",name:"_village",type:"tuple"}],name:"AddVillage",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"account",type:"address"},{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!1,internalType:"bool",name:"approved",type:"bool"}],name:"ApprovalForAll",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"_address",type:"address"},{components:[{internalType:"uint256",name:"x",type:"uint256"},{internalType:"uint256",name:"y",type:"uint256"},{internalType:"uint256",name:"arrivalTime",type:"uint256"}],indexed:!1,internalType:"struct UnionQuestCore.Player",name:"_player",type:"tuple"}],name:"BeginMove",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"_address",type:"address"},{components:[{internalType:"uint256",name:"x",type:"uint256"},{internalType:"uint256",name:"y",type:"uint256"},{internalType:"uint256",name:"arrivalTime",type:"uint256"}],indexed:!1,internalType:"struct UnionQuestCore.Player",name:"_player",type:"tuple"}],name:"ResolveMove",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:!0,internalType:"bytes32",name:"previousAdminRole",type:"bytes32"},{indexed:!0,internalType:"bytes32",name:"newAdminRole",type:"bytes32"}],name:"RoleAdminChanged",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:!0,internalType:"address",name:"account",type:"address"},{indexed:!0,internalType:"address",name:"sender",type:"address"}],name:"RoleGranted",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"bytes32",name:"role",type:"bytes32"},{indexed:!0,internalType:"address",name:"account",type:"address"},{indexed:!0,internalType:"address",name:"sender",type:"address"}],name:"RoleRevoked",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"address",name:"_address",type:"address"},{components:[{internalType:"uint256",name:"x",type:"uint256"},{internalType:"uint256",name:"y",type:"uint256"},{internalType:"uint256",name:"arrivalTime",type:"uint256"}],indexed:!1,internalType:"struct UnionQuestCore.Player",name:"_player",type:"tuple"}],name:"Start",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256[]",name:"ids",type:"uint256[]"},{indexed:!1,internalType:"uint256[]",name:"values",type:"uint256[]"}],name:"TransferBatch",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"operator",type:"address"},{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"id",type:"uint256"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"TransferSingle",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"string",name:"value",type:"string"},{indexed:!0,internalType:"uint256",name:"id",type:"uint256"}],name:"URI",type:"event"},{inputs:[],name:"DEFAULT_ADMIN_ROLE",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{components:[{internalType:"string",name:"name",type:"string"},{internalType:"string",name:"description",type:"string"},{internalType:"uint256",name:"buyPrice",type:"uint256"},{internalType:"uint256",name:"sellPrice",type:"uint256"}],internalType:"struct UnionQuestCore.ItemType[]",name:"_itemTypes",type:"tuple[]"}],name:"addItemTypes",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"uint256",name:"id",type:"uint256"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address[]",name:"accounts",type:"address[]"},{internalType:"uint256[]",name:"ids",type:"uint256[]"}],name:"balanceOfBatch",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"x",type:"uint256"},{internalType:"uint256",name:"y",type:"uint256"}],name:"beginMove",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"uint256",name:"id",type:"uint256"},{internalType:"uint256",name:"value",type:"uint256"}],name:"burn",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"uint256[]",name:"ids",type:"uint256[]"},{internalType:"uint256[]",name:"values",type:"uint256[]"}],name:"burnBatch",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"id",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"bytes",name:"data",type:"bytes"}],name:"buyItem",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"x",type:"uint256"},{internalType:"uint256",name:"y",type:"uint256"},{internalType:"string",name:"name",type:"string"},{internalType:"string",name:"description",type:"string"}],name:"createVillage",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"fight",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"}],name:"getRoleAdmin",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"grantRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"hasRole",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"address",name:"operator",type:"address"}],name:"isApprovedForAll",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"renounceRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"resolveMove",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes32",name:"role",type:"bytes32"},{internalType:"address",name:"account",type:"address"}],name:"revokeRole",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256[]",name:"ids",type:"uint256[]"},{internalType:"uint256[]",name:"amounts",type:"uint256[]"},{internalType:"bytes",name:"data",type:"bytes"}],name:"safeBatchTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"id",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"bytes",name:"data",type:"bytes"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"operator",type:"address"},{internalType:"bool",name:"approved",type:"bool"}],name:"setApprovalForAll",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"start",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceId",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"uri",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"}]},UserManager:{address:"0x7FEF01ADEFc2Ce6597E98a4D6B1E0Cd30533356f",abi:[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"staker",type:"address"},{indexed:!0,internalType:"address",name:"borrower",type:"address"},{indexed:!1,internalType:"uint256",name:"trustAmount",type:"uint256"}],name:"LogUpdateTrust",type:"event"},{inputs:[{internalType:"uint256",name:"amount",type:"uint256"}],name:"stake",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"updateTrust",outputs:[],stateMutability:"nonpayable",type:"function"}]}};var xe={name:he,chainId:ve,contracts:ke};const V=L(xe,n=>{}),W=typeof performance!="undefined";let A=W?(Date.now()-performance.now())/1e3:Date.now()/1e3;function I(){return W?Math.floor(performance.now()/1e3)+A:Math.floor(Date.now()/1e3)+A}let j=!1;function E(n){const e=I(),t=n-e;Math.abs(t)>S&&(A+=t),j=!0}function O(){return j}const we=L(I(),function(e){const t=setInterval(()=>{e(I())},1e3);return function(){clearInterval(t)}});typeof window!="undefined"&&(window.time={now:I,startTime:A,correctTime:E,isCorrected:O,time:we});const g=Y("chainTempo");function Me(n,e){for(let t=n.length-1;t>=0;t--)if(n[t]===e){n.splice(t,1);return}g.log("NOT FOUND")}class _e{constructor(e){this.maxTimeout=e,this.blockListeners=[],this.currentProvider=void 0,this.lastUpdate=0,this.chainInfo={lastBlockNumber:void 0,stale:!0}}subscribe(e){return e(this.chainInfo),this.blockListeners.push(e),Me.bind(null,this.blockListeners,e)}check(){const e=Date.now()/1e3;e-this.lastUpdate>this.maxTimeout-1&&(g.info(`timed out... ${e}  - ${this.lastUpdate} = ${e-this.lastUpdate} > ${this.maxTimeout-1}`),this.onBlock(void 0)),this.timeout=setTimeout(this.check.bind(this),this.maxTimeout*1e3)}startOrUpdateProvider(e){this.currentProvider!==e&&(this.currentProvider&&(g.info("stop listening for block event"),this.currentProvider.off("block",this.callback)),this.callback=this.onBlock.bind(this),this.currentProvider=e,this.currentProvider&&(g.info("listening for block event"),this.currentProvider.on("block",this.callback))),this.timeout||(this.timeout=setTimeout(this.check.bind(this),this.maxTimeout*1e3))}onBlock(e){e?(this.chainInfo.lastBlockNumber=e,this.chainInfo.stale=!1):this.chainInfo.stale=!0,this.lastUpdate=Date.now()/1e3,this.triggerListeners()}triggerListeners(){this.triggerTimeout&&clearTimeout(this.triggerTimeout),this.triggerTimeout=setTimeout(this.callListeners.bind(this),0)}callListeners(){g.info(`onBlock ${this.chainInfo.lastBlockNumber}`);for(const e of this.blockListeners)e(this.chainInfo)}}const q=new _e(S*6),G=Z({chainConfigs:K(V),builtin:{autoProbe:!0},transactions:{autoDelete:!1,finality:fe},flow:{autoUnlock:!0},autoSelectPrevious:!0,localStoragePrefix:C&&C.startsWith("/ipfs/")||C.startsWith("/ipns/")?C.slice(6):void 0,options:["builtin",new X({nodeUrl:void 0,chainId:be,infuraId:"bc0bdd4eaac640278cdebc3aa91fabe4"})],fallbackNode:Te,checkGenesis:ge}),{wallet:h,transactions:P,builtin:Re,chain:H,balance:Ee,flow:Oe,fallback:Ce}=G;function Ae(n){N.queue({id:n.hash,delay:0,title:"Transaction Error",text:"The Transaction failed",type:"error",onAcknowledge:()=>P.acknowledge(n.hash,"failure")})}function Ie(n){N.queue({id:n.hash,delay:3,title:"Transaction Cancelled",text:"The Transaction Has Been Replaced",type:"info",onAcknowledge:()=>P.acknowledge(n.hash,"cancelled")})}P.subscribe(n=>{for(const e of n.concat())e.confirmations>0&&!e.acknowledged&&(e.status==="failure"?Ae(e):e.status==="cancelled"?Ie(e):P.acknowledge(e.hash,e.status))});H.subscribe(async n=>{var e;if(q.startOrUpdateProvider(h.provider),!O()&&(n.state==="Connected"||n.state==="Ready")){const t=await((e=h.provider)==null?void 0:e.getBlock("latest"));t&&E(t.timestamp)}});Ce.subscribe(async n=>{var e;if(!O()&&(n.state==="Connected"||n.state==="Ready")){const t=await((e=h.provider)==null?void 0:e.getBlock("latest"));t&&E(t.timestamp)}});let z;h.subscribe(async n=>{z!==n.address&&(z=n.address,$({address:n.address}))});typeof window!="undefined"&&(window.walletStores=G);q.startOrUpdateProvider(h.provider);V.subscribe(async n=>{await H.updateContracts(n)});function Pe(n){let e,t,u,r,b,T;const m=n[23].default,l=ae(m,n,n[22],null);return{c(){e=ie("a"),l&&l.c(),this.h()},l(i){e=se(i,"A",{"aria-label":!0,title:!0,href:!0,rel:!0,target:!0,disabled:!0,class:!0});var s=re(e);l&&l.l(s),s.forEach(Q),this.h()},h(){o(e,"aria-label",n[2]),o(e,"title",n[2]),o(e,"href",n[0]),o(e,"rel",t=n[1]===!0?"noopener":""),o(e,"target",u=n[1]===!0?"_blank":""),o(e,"disabled",n[3]),o(e,"class",n[4])},m(i,s){le(i,e,s),l&&l.m(e,null),r=!0,b||(T=oe(e,"click",n[24]),b=!0)},p(i,[s]){l&&l.p&&(!r||s&4194304)&&ue(l,m,i,i[22],r?pe(m,i[22],s,null):ye(i[22]),null),(!r||s&4)&&o(e,"aria-label",i[2]),(!r||s&4)&&o(e,"title",i[2]),(!r||s&1)&&o(e,"href",i[0]),(!r||s&2&&t!==(t=i[1]===!0?"noopener":""))&&o(e,"rel",t),(!r||s&2&&u!==(u=i[1]===!0?"_blank":""))&&o(e,"target",u),(!r||s&8)&&o(e,"disabled",i[3]),(!r||s&16)&&o(e,"class",i[4])},i(i){r||(de(l,i),r=!0)},o(i){ce(l,i),r=!1},d(i){i&&Q(e),l&&l.d(i),b=!1,T()}}}function Ue(n,e,t){let u,r,{$$slots:b={},$$scope:T}=e,{class:m=""}=e,{href:l=void 0}=e,{blank:i=!1}=e,{label:s}=e,{big:U=!1}=e,{active:D=!1}=e,{disabled:B=!1}=e,{waitOnDisabled:F=!1}=e,{secondary:v=!1}=e,{tertiary:k=!1}=e,{danger:x=!1}=e,{white:w=!1}=e,{customPadding:M=""}=e,_,f,y,p,d,c,R;function J(a){me.call(this,n,a)}return n.$$set=a=>{"class"in a&&t(5,m=a.class),"href"in a&&t(0,l=a.href),"blank"in a&&t(1,i=a.blank),"label"in a&&t(2,s=a.label),"big"in a&&t(6,U=a.big),"active"in a&&t(7,D=a.active),"disabled"in a&&t(3,B=a.disabled),"waitOnDisabled"in a&&t(8,F=a.waitOnDisabled),"secondary"in a&&t(9,v=a.secondary),"tertiary"in a&&t(10,k=a.tertiary),"danger"in a&&t(11,x=a.danger),"white"in a&&t(12,w=a.white),"customPadding"in a&&t(13,M=a.customPadding),"$$scope"in a&&t(22,T=a.$$scope)},n.$$.update=()=>{n.$$.dirty&7680&&t(21,u=!v&&!k&&!x&&!w),n.$$.dirty&8256&&(t(14,_=`${M||"px-4 py-2"} text-sm border-2 space-x-1 rounded-md sm:leading-5`),U&&t(14,_=`${M||"px-8 py-3 md:px-10 md:py-4"} border-4 leading-6 space-x-3 rounded-lg md:text-lg `)),n.$$.dirty&3088128&&(t(16,y="hover:-translate-y-px "),t(17,p="focus:-translate-y-px "),t(18,d="active:-translate-y-px "),t(19,c="-translate-y-px "),t(20,R="opacity-50 "+(F?"cursor-wait ":"")),u?(t(15,f=" text-white bg-yellow-600"),t(16,y+=" hover:bg-yellow-500"),t(17,p+=" focus-not-active:bg-yellow-500"),t(18,d+=" active:bg-yellow-600 active:border-yellow-500"),t(19,c+=" bg-yellow-600 border-yellow-500")):v?(t(15,f="text-pink-600 bg-gray-100 dark:text-pink-500 dark:bg-gray-900"),t(16,y+=" hover:bg-gray-50 dark:hover:bg-gray-800"),t(17,p+=" focus-not-active:bg-gray-50 dark:focus-not-active:bg-gray-800"),t(18,d+=" active:bg-gray-100 active:border-gray-50 dark:active:bg-gray-900 dark:active:border-gray-800 "),t(19,c+=" bg-gray-100 border-gray-50 dark:bg-gray-900 dark:border-gray-800")):k?(t(15,f="text-gray-500 dark:text-gray-400"),t(16,y+=" hover:text-gray-600 hover:bg-gray-50 dark:hover:text-gray-300 dark:hover:bg-gray-900"),t(17,p+=" focus-not-active:text-gray-600 focus-not-active:bg-gray-50 dark:focus-not-active:text-gray-300 dark:focus-not-active:bg-gray-900"),t(18,d+=" active:text-gray-600 active:bg-white active:border-gray-50 dark:active:text-gray-300 dark:active:bg-black dark:active:border-gray-900"),t(19,c+=" bg-transparent text-gray-600 border-gray-50 dark:text-gray-300 dark:border-gray-900")):x?(t(15,f="text-red-700 bg-red-100"),t(16,y+=" hover:bg-red-50"),t(17,p+=" focus-not-active:bg-red-50"),t(18,d+=" active:bg-red-100"),t(19,c+=" bg-red-100")):w&&(t(15,f="text-pink-600 bg-white"),t(16,y+=" hover:text-pink-500"),t(17,p+=" focus-not-active:text-pink-500"),t(18,d+=" active:text-pink-600"),t(19,c+=" text-pink-600"))),n.$$.dirty&2080936&&t(4,r=`w-full flex items-center justify-center font-medium select-none transition transform duration-150 ease-in-out focus:outline-none ${f} ${_} ${B?R:D?c:`border-transparent ${y} ${p} ${d}`} ${m}`)},[l,i,s,B,r,m,U,D,F,v,k,x,w,M,_,f,y,p,d,c,R,u,T,b,J]}class Le extends ee{constructor(e){super();te(this,e,Ue,Pe,ne,{class:5,href:0,blank:1,label:2,big:6,active:7,disabled:3,waitOnDisabled:8,secondary:9,tertiary:10,danger:11,white:12,customPadding:13})}}export{Le as N,Ce as a,Re as b,H as c,q as d,Oe as f,P as t,h as w};
//# sourceMappingURL=NavButton-7688252c.js.map
