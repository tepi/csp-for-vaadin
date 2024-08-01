// Define nonce that webpack should use for separately loaded chunks
const scriptElement = document.querySelector("script[nonce]");

// Override the Function constructor with a version that uses inlined code if available 
const originalFunction = window.Function;
window.Function = function(...args) {
  const key = args.join(",");
  
  if (functions.has(key)) {
    return functions.get(key);
  }

  if (key.startsWith("return window.Vaadin.Flow.loadOnDemand(")) {
    var chunk = key.split("return window.Vaadin.Flow.loadOnDemand('").pop().split("');").pop();
    return function (chunk) {return window.Vaadin.Flow.loadOnDemand(chunk);};
  }

  

  // In "training" mode, log expression to add to the map
  const code = args[args.length - 1];
  // Ignore the stats gatherer which isn't used in production mode
  if (code.indexOf("var StatisticsGatherer") == -1) {
    const snippet = `functions.set("${key}",\n  function(${args.slice(0, -1).join(',')}) {${code}});`
    console.warn(snippet);
  }

  // Fall back to the original constructor (seem to be fine not use it as a constructor)
  return originalFunction.apply(null, args)
}

// Inlined versions of all the functions that would otherwise have to be evaled
const functions = new Map();
functions.set("$0,$0.addEventListener('items-changed', function(){ this.$server.updateSelectedTab(true); });",
  function($0) {$0.addEventListener('items-changed', function(){ this.$server.updateSelectedTab(true); });});
functions.set("$0,return (function() { this.validate = function () {return this.checkValidity();};}).apply($0)",
  function($0) {return (function() { this.validate = function () {return this.checkValidity();};}).apply($0)});
functions.set("$0,$1,$2,return (function() { this.$server['}p']($0, true, $1)}).apply($2)",
  function($0,$1,$2) {return (function() { this.$server['}p']($0, true, $1)}).apply($2)});
functions.set("event,element,return (event.shiftKey)",
  function(event,element) {return (event.shiftKey)});
functions.set("event,element,return (event.metaKey)",
  function(event,element) {return (event.metaKey)});
functions.set("event,element,return (event.detail)",
  function(event,element) {return (event.detail)});
functions.set("event,element,return (event.ctrlKey)",
  function(event,element) {return (event.ctrlKey)});
functions.set("event,element,return (event.clientX)",
  function(event,element) {return (event.clientX)});
functions.set("event,element,return (event.clientY)",
  function(event,element) {return (event.clientY)});
functions.set("event,element,return (event.altKey)",
  function(event,element) {return (event.altKey)});
functions.set("event,element,return (event.button)",
  function(event,element) {return (event.button)});
functions.set("event,element,return (event.screenY)",
  function(event,element) {return (event.screenY)});
functions.set("event,element,return (event.screenX)",
  function(event,element) {return (event.screenX)});
functions.set("$0,this.scrollPositionHandlerAfterServerNavigation($0);",
  function($0) {this.scrollPositionHandlerAfterServerNavigation($0);});
functions.set("$0,document.title = $0",
  function($0) {document.title = $0});
functions.set("$0,    document.title = $0;\n    if(window?.Vaadin?.documentTitleSignal) {\n        window.Vaadin.documentTitleSignal.value = $0;\n    }\n",
  function($0) {    document.title = $0;
    if(window?.Vaadin?.documentTitleSignal) {
      window.Vaadin.documentTitleSignal.value = $0;
    }
  });
functions.set("$0,return (async function() { this._shouldSetInvalid = function (invalid) { return false };}).apply($0)",
    function($0) {return (async function() { this._shouldSetInvalid = function (invalid) { return false };}).apply($0)});
functions.set("$0,$1,return (async function() { this.serverConnected($0)}).apply($1)",
    function($0,$1) {return (async function() { this.serverConnected($0)}).apply($1)});
functions.set("$0,$1,$2,return (async function() { this.$server['}p']($0, true, $1)}).apply($2)",
    function($0,$1,$2) {return (async function() { this.$server['}p']($0, true, $1)}).apply($2)});
functions.set("$0,return $0.requestContentUpdate()",
    function($0) {return $0.requestContentUpdate()});
functions.set("$0,return (async function() { Vaadin.FlowComponentHost.patchVirtualContainer(this)}).apply($0)",
    function($0) {return (async function() { Vaadin.FlowComponentHost.patchVirtualContainer(this)}).apply($0)});
functions.set("$0,$1,return (async function() { this.renderer = (root) => {  if (this.text) {    root.textContent = this.text;  } else {    Vaadin.FlowComponentHost.setChildNodes($0, this.virtualChildNodeIds, root)  }}}).apply($1)",
    function($0,$1) {return (async function() { this.renderer = (root) => {  if (this.text) {    root.textContent = this.text;  } else {    Vaadin.FlowComponentHost.setChildNodes($0, this.virtualChildNodeIds, root)  }}}).apply($1)});
functions.set("$0,return $0.requestContentUpdate()",
    function($0) {return $0.requestContentUpdate()});
functions.set("$0,if($0.$connector) $0.$connector.reset();",
    function($0) {if($0.$connector) $0.$connector.reset();});
functions.set("$0,$1,$2,$3,$4,$5,return (async function() { window.Vaadin.setLitRenderer(this, $0, $1, $2, $3, $4)}).apply($5)",
    function($0,$1,$2,$3,$4,$5) {return (async function() { window.Vaadin.setLitRenderer(this, $0, $1, $2, $3, $4)}).apply($5)});
functions.set("$0,$1,return (async function() { if (this.$connector) { this.$connector.setSelectionMode($0) }}).apply($1)",
    function($0,$1) {return (async function() { if (this.$connector) { this.$connector.setSelectionMode($0) }}).apply($1)});
functions.set("$0,$1,return $0.$connector.updateSize($1)",
    function($0,$1) {return $0.$connector.updateSize($1)});
functions.set("$0,$1,$2,return $0.$connector.set($1,$2)",
    function($0,$1,$2) {return $0.$connector.set($1,$2)});
functions.set("$0,$1,return $0.$connector.confirm($1)",
    function($0,$1) {return $0.$connector.confirm($1)});
functions.set("$0,$1,$2,return (async function() { this.$connector.setFooterRenderer($0, { content: $1 })}).apply($2)",
    function($0,$1,$2) {return (async function() { this.$connector.setFooterRenderer($0, { content: $1 })}).apply($2)});
functions.set("$0,$1,$2,$3,$4,return (async function() { this.$connector.setHeaderRenderer($0, { content: $1, showSorter: $2, sorterPath: $3 })}).apply($4)",
    function($0,$1,$2,$3,$4) {return (async function() { this.$connector.setHeaderRenderer($0, { content: $1, showSorter: $2, sorterPath: $3 })}).apply($4)});
functions.set("$0,window.Vaadin.Flow.datepickerConnector.initLazy($0)",
    function($0) {window.Vaadin.Flow.datepickerConnector.initLazy($0)});
functions.set("$0,return (async function() { window.Vaadin.Flow.comboBoxConnector.initLazy(this)}).apply($0)",
    function($0) {return (async function() { window.Vaadin.Flow.comboBoxConnector.initLazy(this)}).apply($0)});
functions.set("$0,window.Vaadin.Flow.gridProConnector.patchEditModeRenderer($0)",
    function($0) {window.Vaadin.Flow.gridProConnector.patchEditModeRenderer($0)});
functions.set("$0,$1,return (async function() { window.Vaadin.Flow.gridProConnector.initCellEditableProvider($0)}).apply($1)",
    function($0,$1) {return (async function() { window.Vaadin.Flow.gridProConnector.initCellEditableProvider($0)}).apply($1)});
functions.set("$0,window.Vaadin.Flow.gridConnector.initLazy($0)",
    function($0) {window.Vaadin.Flow.gridConnector.initLazy($0)});
functions.set("$0,return (async function() { if (this.$connector) { this.$connector.reset() }}).apply($0)",
    function($0) {return (async function() { if (this.$connector) { this.$connector.reset() }}).apply($0)});
functions.set("$0,$1,return (async function() { if (this.$connector) { this.$connector.setSorterDirections($0) }}).apply($1)",
    function($0,$1) {return (async function() { if (this.$connector) { this.$connector.setSorterDirections($0) }}).apply($1)});
functions.set("$0,$1,$2,return $0.$connector.updateI18n($1,$2)",
    function($0,$1,$2) {return $0.$connector.updateI18n($1,$2)});
functions.set("$0,$1,$2,$3,return $0.$connector.set($1,$2,$3)",
    function($0,$1,$2,$3) {return $0.$connector.set($1,$2,$3)});
functions.set("$0,$1,$2,return $0.$connector.confirm($1,$2)",
    function($0,$1,$2) {return $0.$connector.confirm($1,$2)});