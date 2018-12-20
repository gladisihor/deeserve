function initAnchors(){new SmoothScroll({anchorLinks:".anchor-link",extraOffset:0,wheelBehavior:"none",animDuration:600})}function initResizeClass(){var e=jQuery(window),t=jQuery("body"),n=null;e.on("resize orientation",function(){t.addClass("resize-active"),clearTimeout(n),n=setTimeout(function(){t.removeClass("resize-active")},300)})}function initMobileNav(){var e=jQuery("body");jQuery(".nav-opener").on("click",function(t){t.preventDefault(),e.toggleClass("nav-active")}),jQuery(".nav-holder").on("click",function(t){t.currentTarget===t.target&&e.removeClass("nav-active")})}jQuery(function(){initMobileNav(),initResizeClass(),initAnchors()}),function(e,t){function n(t,n,i){var a;document.body&&(n="number"==typeof n?{duration:n}:n||{},s=s||e("html, body"),a=n.container||s,"number"==typeof t&&(t={top:t}),r&&o&&r.off(c,o),n.wheelBehavior&&"none"!==n.wheelBehavior&&(o=function(e){"stop"===n.wheelBehavior?(a.off(c,o),a.stop()):"ignore"===n.wheelBehavior&&e.preventDefault()},r=a.on(c,o)),a.stop().animate({scrollLeft:t.left,scrollTop:t.top},n.duration,function(){o&&a.off(c,o),e.isFunction(i)&&i()}))}function i(t){this.options=e.extend({anchorLinks:'a[href^="#"]',container:null,extraOffset:null,activeClasses:null,easing:"swing",animMode:"duration",animDuration:800,animSpeed:1500,anchorActiveClass:"anchor-active",sectionActiveClass:"section-active",wheelBehavior:"stop",useNativeAnchorScrolling:!1},t),this.init()}var s,r,o,a=e(window),c="onwheel"in document||document.documentMode>=9?"wheel":"mousewheel DOMMouseScroll";i.prototype={init:function(){this.initStructure(),this.attachEvents(),this.isInit=!0},initStructure:function(){var t=this;this.container=e(this.options.container?this.options.container:"html,body"),this.scrollContainer=this.options.container?this.container:a,this.anchorLinks=jQuery(this.options.anchorLinks).filter(function(){return jQuery(t.getAnchorTarget(jQuery(this))).length})},getId:function(e){try{return"#"+e.replace(/^.*?(#|$)/,"")}catch(e){return null}},getAnchorTarget:function(t){var n=this.getId(e(t).attr("href"));return e(n.length>1?n:"html")},getTargetOffset:function(e){var t=e.offset().top;return this.options.container&&(t-=this.container.offset().top-this.container.prop("scrollTop")),"number"==typeof this.options.extraOffset?t-=this.options.extraOffset:"function"==typeof this.options.extraOffset&&(t-=this.options.extraOffset(e)),{top:t}},attachEvents:function(){var t=this;if(this.options.activeClasses&&this.anchorLinks.length){this.anchorData=[];for(var n=0;n<this.anchorLinks.length;n++){var i=jQuery(this.anchorLinks[n]),s=t.getAnchorTarget(i),r=null;e.each(t.anchorData,function(e,t){t.block[0]===s[0]&&(r=t)}),r?r.link=r.link.add(i):t.anchorData.push({link:i,block:s})}this.resizeHandler=function(){t.isInit&&t.recalculateOffsets()},this.scrollHandler=function(){t.refreshActiveClass()},this.recalculateOffsets(),this.scrollContainer.on("scroll",this.scrollHandler),a.on("resize load orientationchange refreshAnchor",this.resizeHandler)}this.clickHandler=function(e){t.onClick(e)},this.options.useNativeAnchorScrolling||this.anchorLinks.on("click",this.clickHandler)},recalculateOffsets:function(){var t=this;e.each(this.anchorData,function(e,n){n.offset=t.getTargetOffset(n.block),n.height=n.block.outerHeight()}),this.refreshActiveClass()},toggleActiveClass:function(e,t,n){e.toggleClass(this.options.anchorActiveClass,n),t.toggleClass(this.options.sectionActiveClass,n)},refreshActiveClass:function(){var t=this,n=!1,i=this.container.prop("scrollHeight"),s=this.scrollContainer.height(),r=this.options.container?this.container.prop("scrollTop"):a.scrollTop();if(this.options.customScrollHandler)return void this.options.customScrollHandler.call(this,r,this.anchorData);this.anchorData.sort(function(e,t){return e.offset.top-t.offset.top}),e.each(this.anchorData,function(e){var o=t.anchorData.length-e-1,a=t.anchorData[o],c="parent"===t.options.activeClasses?a.link.parent():a.link;r>=i-s?o===t.anchorData.length-1?t.toggleActiveClass(c,a.block,!0):t.toggleActiveClass(c,a.block,!1):!n&&(r>=a.offset.top-1||0===o)?(n=!0,t.toggleActiveClass(c,a.block,!0)):t.toggleActiveClass(c,a.block,!1)})},calculateScrollDuration:function(e){return"speed"===this.options.animMode?Math.abs(this.scrollContainer.scrollTop()-e.top)/this.options.animSpeed*1e3:this.options.animDuration},onClick:function(e){var t=this.getAnchorTarget(e.currentTarget),i=this.getTargetOffset(t);e.preventDefault(),n(i,{container:this.container,wheelBehavior:this.options.wheelBehavior,duration:this.calculateScrollDuration(i)}),this.makeCallback("onBeforeScroll",e.currentTarget)},makeCallback:function(e){if("function"==typeof this.options[e]){var t=Array.prototype.slice.call(arguments);t.shift(),this.options[e].apply(this,t)}},destroy:function(){var t=this;this.isInit=!1,this.options.activeClasses&&(a.off("resize load orientationchange refreshAnchor",this.resizeHandler),this.scrollContainer.off("scroll",this.scrollHandler),e.each(this.anchorData,function(e){var n=t.anchorData.length-e-1,i=t.anchorData[n],s="parent"===t.options.activeClasses?i.link.parent():i.link;t.toggleActiveClass(s,i.block,!1)})),this.anchorLinks.off("click",this.clickHandler)}},e.extend(i,{scrollTo:function(e,t,i){n(e,t,i)}}),t.SmoothScroll=i}(jQuery,this),function(e){var t=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(t)&&t.match(/rv\:(\d+)/)&&RegExp.$1<41&&addEventListener("resize",function(){var t,n=document.createElement("source"),i=function(e){var t,i,s=e.parentNode;"PICTURE"===s.nodeName.toUpperCase()?(t=n.cloneNode(),s.insertBefore(t,s.firstElementChild),setTimeout(function(){s.removeChild(t)})):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,i=e.sizes,e.sizes+=",100vw",setTimeout(function(){e.sizes=i}))},s=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)i(t[e])},r=function(){clearTimeout(t),t=setTimeout(s,99)},o=e.matchMedia&&matchMedia("(orientation: landscape)"),a=function(){r(),o&&o.addListener&&o.addListener(r)};return n.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?a():document.addEventListener("DOMContentLoaded",a),r}())}(window),function(e,t,n){"use strict";function i(e){return" "===e||"    "===e||"\n"===e||"\f"===e||"\r"===e}function s(){H=!1,P=e.devicePixelRatio,B={},I={},g.DPR=P||1,$.width=Math.max(e.innerWidth||0,C.clientWidth),$.height=Math.max(e.innerHeight||0,C.clientHeight),$.vw=$.width/100,$.vh=$.height/100,m=[$.height,$.width,P].join("-"),$.em=g.getEmValue(),$.rem=$.em}function r(e,t,n,i){var s,r,o,a;return"saveData"===b.algorithm?e>2.7?a=n+1:(r=t-n,s=Math.pow(e-.6,1.5),o=r*s,i&&(o+=.1*s),a=e+o):a=n>1?Math.sqrt(e*t):e,a>n}function o(e){var t,n=g.getSet(e),i=!1;"pending"!==n&&(i=m,n&&(t=g.setRes(n),g.applySetCandidate(t,e))),e[g.ns].evaled=i}function a(e,t){return e.res-t.res}function c(e,t,n){var i;return!n&&t&&(n=e[g.ns].sets,n=n&&n[n.length-1]),i=l(t,n),i&&(t=g.makeUrl(t),e[g.ns].curSrc=t,e[g.ns].curCan=i,i.res||K(i,i.set.sizes)),i}function l(e,t){var n,i,s;if(e&&t)for(s=g.parseSet(t),e=g.makeUrl(e),n=0;n<s.length;n++)if(e===g.makeUrl(s[n].url)){i=s[n];break}return i}function u(e,t){var n,i,s,r,o=e.getElementsByTagName("source");for(n=0,i=o.length;i>n;n++)s=o[n],s[g.ns]=!0,(r=s.getAttribute("srcset"))&&t.push({srcset:r,media:s.getAttribute("media"),type:s.getAttribute("type"),sizes:s.getAttribute("sizes")})}function h(e,t){function n(t){var n,i=t.exec(e.substring(h));return i?(n=i[0],h+=n.length,n):void 0}function s(){var e,n,i,s,a,c,l,u,h,p=!1,d={};for(s=0;s<o.length;s++)a=o[s],c=a[a.length-1],l=a.substring(0,a.length-1),u=parseInt(l,10),h=parseFloat(l),G.test(l)&&"w"===c?((e||n)&&(p=!0),0===u?p=!0:e=u):q.test(l)&&"x"===c?((e||n||i)&&(p=!0),0>h?p=!0:n=h):G.test(l)&&"h"===c?((i||n)&&(p=!0),0===u?p=!0:i=u):p=!0;p||(d.url=r,e&&(d.w=e),n&&(d.d=n),i&&(d.h=i),i||n||e||(d.d=1),1===d.d&&(t.has1x=!0),d.set=t,f.push(d))}for(var r,o,a,c,l,u=e.length,h=0,f=[];;){if(n(W),h>=u)return f;r=n(N),o=[],","===r.slice(-1)?(r=r.replace(F,""),s()):function(){for(n(U),a="",c="in descriptor";;){if(l=e.charAt(h),"in descriptor"===c)if(i(l))a&&(o.push(a),a="",c="after descriptor");else{if(","===l)return h+=1,a&&o.push(a),void s();if("("===l)a+=l,c="in parens";else{if(""===l)return a&&o.push(a),void s();a+=l}}else if("in parens"===c)if(")"===l)a+=l,c="in descriptor";else{if(""===l)return o.push(a),void s();a+=l}else if("after descriptor"===c)if(i(l));else{if(""===l)return void s();c="in descriptor",h-=1}h+=1}}()}}function f(e){var t,n,s,r,o,a,c=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(n=function(e){function t(){r&&(o.push(r),r="")}function n(){o[0]&&(a.push(o),o=[])}for(var s,r="",o=[],a=[],c=0,l=0,u=!1;;){if(""===(s=e.charAt(l)))return t(),n(),a;if(u){if("*"===s&&"/"===e[l+1]){u=!1,l+=2,t();continue}l+=1}else{if(i(s)){if(e.charAt(l-1)&&i(e.charAt(l-1))||!r){l+=1;continue}if(0===c){t(),l+=1;continue}s=" "}else if("("===s)c+=1;else if(")"===s)c-=1;else{if(","===s){t(),n(),l+=1;continue}if("/"===s&&"*"===e.charAt(l+1)){u=!0,l+=2;continue}}r+=s,l+=1}}}(e),s=n.length,t=0;s>t;t++)if(r=n[t],o=r[r.length-1],function(e){return!!(c.test(e)&&parseFloat(e)>=0)||!!l.test(e)||"0"===e||"-0"===e||"+0"===e}(o)){if(a=o,r.pop(),0===r.length)return a;if(r=r.join(" "),g.matchesMedia(r))return a}return"100vw"}t.createElement("picture");var p,d,m,g={},v=function(){},A=t.createElement("img"),y=A.getAttribute,w=A.setAttribute,S=A.removeAttribute,C=t.documentElement,k={},b={algorithm:""},x="data-pfsrc",T=x+"set",z=navigator.userAgent,D=/rident/.test(z)||/ecko/.test(z)&&z.match(/rv\:(\d+)/)&&RegExp.$1>35,E="currentSrc",L=/\s+\+?\d+(e\d+)?w/,M=/(\([^)]+\))?\s*(.+)/,R=e.picturefillCFG,Q="font-size:100%!important;",H=!0,B={},I={},P=e.devicePixelRatio,$={px:1,in:96},j=t.createElement("a"),O=!1,U=/^[ \t\n\r\u000c]+/,W=/^[, \t\n\r\u000c]+/,N=/^[^ \t\n\r\u000c]+/,F=/[,]+$/,G=/^\d+$/,q=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,V=function(e,t,n,i){e.addEventListener?e.addEventListener(t,n,i||!1):e.attachEvent&&e.attachEvent("on"+t,n)},_=function(e){var t={};return function(n){return n in t||(t[n]=e(n)),t[n]}},J=function(){var e=/^([\d\.]+)(em|vw|px)$/,t=function(){for(var e=arguments,t=0,n=e[0];++t in e;)n=n.replace(e[t],e[++t]);return n},n=_(function(e){return"return "+t((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(t,i){var s;if(!(t in B))if(B[t]=!1,i&&(s=t.match(e)))B[t]=s[1]*$[s[2]];else try{B[t]=new Function("e",n(t))($)}catch(e){}return B[t]}}(),K=function(e,t){return e.w?(e.cWidth=g.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},X=function(e){var n,i,s,r=e||{};if(r.elements&&1===r.elements.nodeType&&("IMG"===r.elements.nodeName.toUpperCase()?r.elements=[r.elements]:(r.context=r.elements,r.elements=null)),n=r.elements||g.qsa(r.context||t,r.reevaluate||r.reselect?g.sel:g.selShort),s=n.length){for(g.setupRun(r),O=!0,i=0;s>i;i++)g.fillImg(n[i],r);g.teardownRun(r)}};e.console&&console.warn,E in A||(E="src"),k["image/jpeg"]=!0,k["image/gif"]=!0,k["image/png"]=!0,k["image/svg+xml"]=t.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1"),g.ns=("pf"+(new Date).getTime()).substr(0,9),g.supSrcset="srcset"in A,g.supSizes="sizes"in A,g.supPicture=!!e.HTMLPictureElement,g.supSrcset&&g.supPicture&&!g.supSizes&&function(e){A.srcset="data:,a",e.src="data:,a",g.supSrcset=A.complete===e.complete,g.supPicture=g.supSrcset&&g.supPicture}(t.createElement("img")),g.selShort="picture>img,img[srcset]",g.sel=g.selShort,g.cfg=b,g.supSrcset&&(g.sel+=",img["+T+"]"),g.DPR=P||1,g.u=$,g.types=k,d=g.supSrcset&&!g.supSizes,g.setSize=v,g.makeUrl=_(function(e){return j.href=e,j.href}),g.qsa=function(e,t){return e.querySelectorAll(t)},g.matchesMedia=function(){return e.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?g.matchesMedia=function(e){return!e||matchMedia(e).matches}:g.matchesMedia=g.mMQ,g.matchesMedia.apply(this,arguments)},g.mMQ=function(e){return!e||J(e)},g.calcLength=function(e){var t=J(e,!0)||!1;return 0>t&&(t=!1),t},g.supportsType=function(e){return!e||k[e]},g.parseSize=_(function(e){var t=(e||"").match(M);return{media:t&&t[1],length:t&&t[2]}}),g.parseSet=function(e){return e.cands||(e.cands=h(e.srcset,e)),e.cands},g.getEmValue=function(){var e;if(!p&&(e=t.body)){var n=t.createElement("div"),i=C.style.cssText,s=e.style.cssText;n.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",C.style.cssText=Q,e.style.cssText=Q,e.appendChild(n),p=n.offsetWidth,e.removeChild(n),p=parseFloat(p,10),C.style.cssText=i,e.style.cssText=s}return p||16},g.calcListLength=function(e){if(!(e in I)||b.uT){var t=g.calcLength(f(e));I[e]=t||$.width}return I[e]},g.setRes=function(e){var t;if(e){t=g.parseSet(e);for(var n=0,i=t.length;i>n;n++)K(t[n],e.sizes)}return t},g.setRes.res=K,g.applySetCandidate=function(e,t){if(e.length){var n,i,s,o,l,u,h,f,p,d=t[g.ns],m=g.DPR;if(u=d.curSrc||t[E],h=d.curCan||c(t,u,e[0].set),h&&h.set===e[0].set&&((p=D&&!t.complete&&h.res-.1>m)||(h.cached=!0,h.res>=m&&(l=h))),!l)for(e.sort(a),o=e.length,l=e[o-1],i=0;o>i;i++)if(n=e[i],n.res>=m){s=i-1,l=e[s]&&(p||u!==g.makeUrl(n.url))&&r(e[s].res,n.res,m,e[s].cached)?e[s]:n;break}l&&(f=g.makeUrl(l.url),d.curSrc=f,d.curCan=l,f!==u&&g.setSrc(t,l),g.setSize(t))}},g.setSrc=function(e,t){var n;e.src=t.url,"image/svg+xml"===t.set.type&&(n=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=n))},g.getSet=function(e){var t,n,i,s=!1,r=e[g.ns].sets;for(t=0;t<r.length&&!s;t++)if(n=r[t],n.srcset&&g.matchesMedia(n.media)&&(i=g.supportsType(n.type))){"pending"===i&&(n=i),s=n;break}return s},g.parseSets=function(e,t,i){var s,r,o,a,c=t&&"PICTURE"===t.nodeName.toUpperCase(),h=e[g.ns];(h.src===n||i.src)&&(h.src=y.call(e,"src"),h.src?w.call(e,x,h.src):S.call(e,x)),(h.srcset===n||i.srcset||!g.supSrcset||e.srcset)&&(s=y.call(e,"srcset"),h.srcset=s,a=!0),h.sets=[],c&&(h.pic=!0,u(t,h.sets)),h.srcset?(r={srcset:h.srcset,sizes:y.call(e,"sizes")},h.sets.push(r),(o=(d||h.src)&&L.test(h.srcset||""))||!h.src||l(h.src,r)||r.has1x||(r.srcset+=", "+h.src,r.cands.push({url:h.src,d:1,set:r}))):h.src&&h.sets.push({srcset:h.src,sizes:null}),h.curCan=null,h.curSrc=n,h.supported=!(c||r&&!g.supSrcset||o),a&&g.supSrcset&&!h.supported&&(s?(w.call(e,T,s),e.srcset=""):S.call(e,T)),h.supported&&!h.srcset&&(!h.src&&e.src||e.src!==g.makeUrl(h.src))&&(null===h.src?e.removeAttribute("src"):e.src=h.src),h.parsed=!0},g.fillImg=function(e,t){var n,i=t.reselect||t.reevaluate;e[g.ns]||(e[g.ns]={}),n=e[g.ns],(i||n.evaled!==m)&&((!n.parsed||t.reevaluate)&&g.parseSets(e,e.parentNode,t),n.supported?n.evaled=m:o(e))},g.setupRun=function(){(!O||H||P!==e.devicePixelRatio)&&s()},g.supPicture?(X=v,g.fillImg=v):function(){var n,i=e.attachEvent?/d$|^c/:/d$|^c|^i/,s=function(){var e=t.readyState||"";r=setTimeout(s,"loading"===e?200:999),t.body&&(g.fillImgs(),(n=n||i.test(e))&&clearTimeout(r))},r=setTimeout(s,t.body?9:99),o=C.clientHeight,a=function(){H=Math.max(e.innerWidth||0,C.clientWidth)!==$.width||C.clientHeight!==o,o=C.clientHeight,H&&g.fillImgs()};V(e,"resize",function(e,t){var n,i,s=function(){var t=new Date-i;99>t?n=setTimeout(s,99-t):(n=null,e())};return function(){i=new Date,n||(n=setTimeout(s,99))}}(a)),V(t,"readystatechange",s)}(),g.picturefill=X,g.fillImgs=X,g.teardownRun=v,X._=g,e.picturefillCFG={pf:g,push:function(e){var t=e.shift();"function"==typeof g[t]?g[t].apply(g,e):(b[t]=e[0],O&&g.fillImgs({reselect:!0}))}};for(;R&&R.length;)e.picturefillCFG.push(R.shift());e.picturefill=X,"object"==typeof module&&"object"==typeof module.exports?module.exports=X:"function"==typeof define&&define.amd&&define("picturefill",function(){return X}),g.supPicture||(k["image/webp"]=function(t,n){var i=new e.Image;return i.onerror=function(){k[t]=!1,X()},i.onload=function(){k[t]=1===i.width,X()},i.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==","pending"}("image/webp"))}(window,document);