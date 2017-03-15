!function(e,t){"use strict";var r=e.History=e.History||{};if("undefined"!=typeof r.Adapter)throw new Error("History.js Adapter has already been loaded...");r.Adapter={handlers:{},_uid:1,uid:function(e){return e._uid||(e._uid=r.Adapter._uid++)},bind:function(e,t,a){var n=r.Adapter.uid(e);r.Adapter.handlers[n]=r.Adapter.handlers[n]||{},r.Adapter.handlers[n][t]=r.Adapter.handlers[n][t]||[],r.Adapter.handlers[n][t].push(a),e["on"+t]=function(e,t){return function(a){r.Adapter.trigger(e,t,a)}}(e,t)},trigger:function(e,t,a){a=a||{};var n,o,i=r.Adapter.uid(e);for(r.Adapter.handlers[i]=r.Adapter.handlers[i]||{},r.Adapter.handlers[i][t]=r.Adapter.handlers[i][t]||[],n=0,o=r.Adapter.handlers[i][t].length;o>n;++n)r.Adapter.handlers[i][t][n].apply(this,[a])},extractEventData:function(e,r){var a=r&&r[e]||t;return a},onDomLoad:function(t){var r=e.setTimeout(function(){t()},2e3);e.onload=function(){clearTimeout(r),t()}}},"undefined"!=typeof r.init&&r.init()}(window),function(e,t){"use strict";var r=e.console||t,a=e.document,n=e.navigator,o=!1,i=e.setTimeout,s=e.clearTimeout,u=e.setInterval,l=e.clearInterval,d=e.JSON,c=e.alert,p=e.History=e.History||{},f=e.history;try{o=e.sessionStorage,o.setItem("TEST","1"),o.removeItem("TEST")}catch(h){o=!1}if(d.stringify=d.stringify||d.encode,d.parse=d.parse||d.decode,"undefined"!=typeof p.init)throw new Error("History.js Core has already been loaded...");p.init=function(){return"undefined"==typeof p.Adapter?!1:("undefined"!=typeof p.initCore&&p.initCore(),"undefined"!=typeof p.initHtml4&&p.initHtml4(),!0)},p.initCore=function(){if("undefined"!=typeof p.initCore.initialized)return!1;if(p.initCore.initialized=!0,p.options=p.options||{},p.options.hashChangeInterval=p.options.hashChangeInterval||100,p.options.safariPollInterval=p.options.safariPollInterval||500,p.options.doubleCheckInterval=p.options.doubleCheckInterval||500,p.options.disableSuid=p.options.disableSuid||!1,p.options.storeInterval=p.options.storeInterval||1e3,p.options.busyDelay=p.options.busyDelay||250,p.options.debug=p.options.debug||!1,p.options.initialTitle=p.options.initialTitle||a.title,p.options.html4Mode=p.options.html4Mode||!1,p.options.delayInit=p.options.delayInit||!1,p.intervalList=[],p.clearAllIntervals=function(){var e,t=p.intervalList;if("undefined"!=typeof t&&null!==t){for(e=0;e<t.length;e++)l(t[e]);p.intervalList=null}},p.debug=function(){p.options.debug&&p.log.apply(p,arguments)},p.log=function(){var e,t,n,o,i,s=!("undefined"==typeof r||"undefined"==typeof r.log||"undefined"==typeof r.log.apply),u=a.getElementById("log");for(s?(o=Array.prototype.slice.call(arguments),e=o.shift(),"undefined"!=typeof r.debug?r.debug.apply(r,[e,o]):r.log.apply(r,[e,o])):e="\n"+arguments[0]+"\n",t=1,n=arguments.length;n>t;++t){if(i=arguments[t],"object"==typeof i&&"undefined"!=typeof d)try{i=d.stringify(i)}catch(l){}e+="\n"+i+"\n"}return u?(u.value+=e+"\n-----\n",u.scrollTop=u.scrollHeight-u.clientHeight):s||c(e),!0},p.getInternetExplorerMajorVersion=function(){var e=p.getInternetExplorerMajorVersion.cached="undefined"!=typeof p.getInternetExplorerMajorVersion.cached?p.getInternetExplorerMajorVersion.cached:function(){for(var e=3,t=a.createElement("div"),r=t.getElementsByTagName("i");(t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&r[0];);return e>4?e:!1}();return e},p.isInternetExplorer=function(){var e=p.isInternetExplorer.cached="undefined"!=typeof p.isInternetExplorer.cached?p.isInternetExplorer.cached:Boolean(p.getInternetExplorerMajorVersion());return e},p.options.html4Mode?p.emulated={pushState:!0,hashChange:!0}:p.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(n.userAgent)||/AppleWebKit\/5([0-2]|3[0-2])/i.test(n.userAgent))),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in a)||p.isInternetExplorer()&&p.getInternetExplorerMajorVersion()<8)},p.enabled=!p.emulated.pushState,p.bugs={setHash:Boolean(!p.emulated.pushState&&"Apple Computer, Inc."===n.vendor&&/AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)),safariPoll:Boolean(!p.emulated.pushState&&"Apple Computer, Inc."===n.vendor&&/AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)),ieDoubleCheck:Boolean(p.isInternetExplorer()&&p.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(p.isInternetExplorer()&&p.getInternetExplorerMajorVersion()<7)},p.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},p.cloneObject=function(e){var t,r;return e?(t=d.stringify(e),r=d.parse(t)):r={},r},p.getRootUrl=function(){var e=a.location.protocol+"//"+(a.location.hostname||a.location.host);return a.location.port&&(e+=":"+a.location.port),e+="/"},p.getBaseHref=function(){var e=a.getElementsByTagName("base"),t=null,r="";return 1===e.length&&(t=e[0],r=t.href.replace(/[^\/]+$/,"")),r=r.replace(/\/+$/,""),r&&(r+="/"),r},p.getBaseUrl=function(){var e=p.getBaseHref()||p.getBasePageUrl()||p.getRootUrl();return e},p.getPageUrl=function(){var e,t=p.getState(!1,!1),r=(t||{}).url||p.getLocationHref();return e=r.replace(/\/+$/,"").replace(/[^\/]+$/,function(e){return/\./.test(e)?e:e+"/"})},p.getBasePageUrl=function(){var e=p.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},p.getFullUrl=function(e,t){var r=e,a=e.substring(0,1);return t="undefined"==typeof t?!0:t,/[a-z]+\:\/\//.test(e)||(r="/"===a?p.getRootUrl()+e.replace(/^\/+/,""):"#"===a?p.getPageUrl().replace(/#.*/,"")+e:"?"===a?p.getPageUrl().replace(/[\?#].*/,"")+e:t?p.getBaseUrl()+e.replace(/^(\.\/)+/,""):p.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),r.replace(/\#$/,"")},p.getShortUrl=function(e){var t=e,r=p.getBaseUrl(),a=p.getRootUrl();return p.emulated.pushState&&(t=t.replace(r,"")),t=t.replace(a,"/"),p.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,"")},p.getLocationHref=function(e){return e=e||a,e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:-1==e.URL.indexOf("#")&&-1!=e.location.href.indexOf("#")?e.location.href:e.URL||e.location.href},p.store={},p.idToState=p.idToState||{},p.stateToId=p.stateToId||{},p.urlToId=p.urlToId||{},p.storedStates=p.storedStates||[],p.savedStates=p.savedStates||[],p.normalizeStore=function(){p.store.idToState=p.store.idToState||{},p.store.urlToId=p.store.urlToId||{},p.store.stateToId=p.store.stateToId||{}},p.getState=function(e,t){"undefined"==typeof e&&(e=!0),"undefined"==typeof t&&(t=!0);var r=p.getLastSavedState();return!r&&t&&(r=p.createStateObject()),e&&(r=p.cloneObject(r),r.url=r.cleanUrl||r.url),r},p.getIdByState=function(e){var t,r=p.extractId(e.url);if(!r)if(t=p.getStateString(e),"undefined"!=typeof p.stateToId[t])r=p.stateToId[t];else if("undefined"!=typeof p.store.stateToId[t])r=p.store.stateToId[t];else{for(;;)if(r=(new Date).getTime()+String(Math.random()).replace(/\D/g,""),"undefined"==typeof p.idToState[r]&&"undefined"==typeof p.store.idToState[r])break;p.stateToId[t]=r,p.idToState[r]=e}return r},p.normalizeState=function(e){var t,r;return e&&"object"==typeof e||(e={}),"undefined"!=typeof e.normalized?e:(e.data&&"object"==typeof e.data||(e.data={}),t={},t.normalized=!0,t.title=e.title||"",t.url=p.getFullUrl(e.url?e.url:p.getLocationHref()),t.hash=p.getShortUrl(t.url),t.data=p.cloneObject(e.data),t.id=p.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,r=!p.isEmptyObject(t.data),(t.title||r)&&p.options.disableSuid!==!0&&(t.hash=p.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=p.getFullUrl(t.hash),(p.emulated.pushState||p.bugs.safariPoll)&&p.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t)},p.createStateObject=function(e,t,r){var a={data:e,title:t,url:r};return a=p.normalizeState(a)},p.getStateById=function(e){e=String(e);var r=p.idToState[e]||p.store.idToState[e]||t;return r},p.getStateString=function(e){var t,r,a;return t=p.normalizeState(e),r={data:t.data,title:e.title,url:e.url},a=d.stringify(r)},p.getStateId=function(e){var t,r;return t=p.normalizeState(e),r=t.id},p.getHashByState=function(e){var t,r;return t=p.normalizeState(e),r=t.hash},p.extractId=function(e){var t,r,a,n;return n=-1!=e.indexOf("#")?e.split("#")[0]:e,r=/(.*)\&_suid=([0-9]+)$/.exec(n),a=r?r[1]||e:e,t=r?String(r[2]||""):"",t||!1},p.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},p.extractState=function(e,t){var r,a,n=null;return t=t||!1,r=p.extractId(e),r&&(n=p.getStateById(r)),n||(a=p.getFullUrl(e),r=p.getIdByUrl(a)||!1,r&&(n=p.getStateById(r)),n||!t||p.isTraditionalAnchor(e)||(n=p.createStateObject(null,null,a))),n},p.getIdByUrl=function(e){var r=p.urlToId[e]||p.store.urlToId[e]||t;return r},p.getLastSavedState=function(){return p.savedStates[p.savedStates.length-1]||t},p.getLastStoredState=function(){return p.storedStates[p.storedStates.length-1]||t},p.hasUrlDuplicate=function(e){var t,r=!1;return t=p.extractState(e.url),r=t&&t.id!==e.id},p.storeState=function(e){return p.urlToId[e.url]=e.id,p.storedStates.push(p.cloneObject(e)),e},p.isLastSavedState=function(e){var t,r,a,n=!1;return p.savedStates.length&&(t=e.id,r=p.getLastSavedState(),a=r.id,n=t===a),n},p.saveState=function(e){return p.isLastSavedState(e)?!1:(p.savedStates.push(p.cloneObject(e)),!0)},p.getStateByIndex=function(e){var t=null;return t="undefined"==typeof e?p.savedStates[p.savedStates.length-1]:0>e?p.savedStates[p.savedStates.length+e]:p.savedStates[e]},p.getCurrentIndex=function(){var e=null;return e=p.savedStates.length<1?0:p.savedStates.length-1},p.getHash=function(e){var t,r=p.getLocationHref(e);return t=p.getHashByUrl(r)},p.unescapeHash=function(e){var t=p.normalizeHash(e);return t=decodeURIComponent(t)},p.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},p.setHash=function(e,t){var r,n;return t!==!1&&p.busy()?(p.pushQueue({scope:p,callback:p.setHash,args:arguments,queue:t}),!1):(p.busy(!0),r=p.extractState(e,!0),r&&!p.emulated.pushState?p.pushState(r.data,r.title,r.url,!1):p.getHash()!==e&&(p.bugs.setHash?(n=p.getPageUrl(),p.pushState(null,null,n+"#"+e,!1)):a.location.hash=e),p)},p.escapeHash=function(t){var r=p.normalizeHash(t);return r=e.encodeURIComponent(r),p.bugs.hashEscape||(r=r.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),r},p.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=p.unescapeHash(t)},p.setTitle=function(e){var t,r=e.title;r||(t=p.getStateByIndex(0),t&&t.url===e.url&&(r=t.title||p.options.initialTitle));try{a.getElementsByTagName("title")[0].innerHTML=r.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(n){}return a.title=r,p},p.queues=[],p.busy=function(e){if("undefined"!=typeof e?p.busy.flag=e:"undefined"==typeof p.busy.flag&&(p.busy.flag=!1),!p.busy.flag){s(p.busy.timeout);var t=function(){var e,r,a;if(!p.busy.flag)for(e=p.queues.length-1;e>=0;--e)r=p.queues[e],0!==r.length&&(a=r.shift(),p.fireQueueItem(a),p.busy.timeout=i(t,p.options.busyDelay))};p.busy.timeout=i(t,p.options.busyDelay)}return p.busy.flag},p.busy.flag=!1,p.fireQueueItem=function(e){return e.callback.apply(e.scope||p,e.args||[])},p.pushQueue=function(e){return p.queues[e.queue||0]=p.queues[e.queue||0]||[],p.queues[e.queue||0].push(e),p},p.queue=function(e,t){return"function"==typeof e&&(e={callback:e}),"undefined"!=typeof t&&(e.queue=t),p.busy()?p.pushQueue(e):p.fireQueueItem(e),p},p.clearQueue=function(){return p.busy.flag=!1,p.queues=[],p},p.stateChanged=!1,p.doubleChecker=!1,p.doubleCheckComplete=function(){return p.stateChanged=!0,p.doubleCheckClear(),p},p.doubleCheckClear=function(){return p.doubleChecker&&(s(p.doubleChecker),p.doubleChecker=!1),p},p.doubleCheck=function(e){return p.stateChanged=!1,p.doubleCheckClear(),p.bugs.ieDoubleCheck&&(p.doubleChecker=i(function(){return p.doubleCheckClear(),p.stateChanged||e(),!0},p.options.doubleCheckInterval)),p},p.safariStatePoll=function(){var t,r=p.extractState(p.getLocationHref());if(!p.isLastSavedState(r))return t=r,t||(t=p.createStateObject()),p.Adapter.trigger(e,"popstate"),p},p.back=function(e){return e!==!1&&p.busy()?(p.pushQueue({scope:p,callback:p.back,args:arguments,queue:e}),!1):(p.busy(!0),p.doubleCheck(function(){p.back(!1)}),f.go(-1),!0)},p.forward=function(e){return e!==!1&&p.busy()?(p.pushQueue({scope:p,callback:p.forward,args:arguments,queue:e}),!1):(p.busy(!0),p.doubleCheck(function(){p.forward(!1)}),f.go(1),!0)},p.go=function(e,t){var r;if(e>0)for(r=1;e>=r;++r)p.forward(t);else{if(!(0>e))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(r=-1;r>=e;--r)p.back(t)}return p},p.emulated.pushState){var h=function(){};p.pushState=p.pushState||h,p.replaceState=p.replaceState||h}else p.onPopState=function(t,r){var a,n,o=!1,i=!1,s=!0;return p.doubleCheckComplete(),(a=p.getHash())?(n=p.extractState(a||p.getLocationHref(),!0),n?p.replaceState(n.data,n.title,n.url,!1):(p.Adapter.trigger(e,"anchorchange"),p.busy(!1)),p.expectedStateId=!1,!1):(o=p.Adapter.extractEventData("state",t,r)||!1,o?i=p.getStateById(o):p.expectedStateId?(i=p.getStateById(p.expectedStateId),s=!1):i=p.extractState(p.getLocationHref()),i||(i=p.createStateObject(null,null,p.getLocationHref())),p.expectedStateId=!1,p.isLastSavedState(i)?(p.busy(!1),!1):(p.storeState(i),p.saveState(i),p.setTitle(i),s&&p.Adapter.trigger(e,"statechange"),p.busy(!1),!0))},p.Adapter.bind(e,"popstate",p.onPopState),p.pushState=function(t,r,a,n){if(p.getHashByUrl(a)&&p.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(n!==!1&&p.busy())return p.pushQueue({scope:p,callback:p.pushState,args:arguments,queue:n}),!1;p.busy(!0);var o=p.createStateObject(t,r,a);return p.isLastSavedState(o)?p.busy(!1):(p.storeState(o),p.expectedStateId=o.id,f.pushState(o.id,o.title,o.url),p.Adapter.trigger(e,"popstate")),!0},p.replaceState=function(t,r,a,n){if(p.getHashByUrl(a)&&p.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(n!==!1&&p.busy())return p.pushQueue({scope:p,callback:p.replaceState,args:arguments,queue:n}),!1;p.busy(!0);var o=p.createStateObject(t,r,a);return p.isLastSavedState(o)?p.busy(!1):(p.storeState(o),p.expectedStateId=o.id,f.replaceState(o.id,o.title,o.url),p.Adapter.trigger(e,"popstate")),!0};if(o){try{p.store=d.parse(o.getItem("History.store"))||{}}catch(g){p.store={}}p.normalizeStore()}else p.store={},p.normalizeStore();p.Adapter.bind(e,"unload",p.clearAllIntervals),p.saveState(p.storeState(p.extractState(p.getLocationHref(),!0))),o&&(p.onUnload=function(){var e,t,r;try{e=d.parse(o.getItem("History.store"))||{}}catch(a){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in p.idToState)p.idToState.hasOwnProperty(t)&&(e.idToState[t]=p.idToState[t]);for(t in p.urlToId)p.urlToId.hasOwnProperty(t)&&(e.urlToId[t]=p.urlToId[t]);for(t in p.stateToId)p.stateToId.hasOwnProperty(t)&&(e.stateToId[t]=p.stateToId[t]);p.store=e,p.normalizeStore(),r=d.stringify(e);try{o.setItem("History.store",r)}catch(n){if(n.code!==DOMException.QUOTA_EXCEEDED_ERR)throw n;o.length&&(o.removeItem("History.store"),o.setItem("History.store",r))}},p.intervalList.push(u(p.onUnload,p.options.storeInterval)),p.Adapter.bind(e,"beforeunload",p.onUnload),p.Adapter.bind(e,"unload",p.onUnload)),p.emulated.pushState||(p.bugs.safariPoll&&p.intervalList.push(u(p.safariStatePoll,p.options.safariPollInterval)),"Apple Computer, Inc."!==n.vendor&&"Mozilla"!==(n.appCodeName||"")||(p.Adapter.bind(e,"hashchange",function(){p.Adapter.trigger(e,"popstate")}),p.getHash()&&p.Adapter.onDomLoad(function(){p.Adapter.trigger(e,"hashchange")})))},p.options&&p.options.delayInit||p.init()}(window);