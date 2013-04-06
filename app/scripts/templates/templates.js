Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"container\">\n  ");
  data.buffer.push("\n  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["bus"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', hashTypes, escapeExpression=this.escapeExpression;


  data.buffer.push("<section id=\"");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "bid", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\">\n  <h1>Bus - ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "bid", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n  <p> Capacidad: <strong>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "capacidad", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong></p>\n  <p> Cupos: <strong>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "cupos", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong></p>\n</section>\n");
  return buffer;
  
});

Ember.TEMPLATES["day"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("Bienvido..\n");
  
});

Ember.TEMPLATES["home"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', hashTypes;
  data.buffer.push("\n  <h1> Bienvenido ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "username", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n  ");
  hashTypes = {'tagName': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Brv.CalendarView", {hash:{
    'tagName': ("section"),
    'class': ("row")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n  ");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, options;
  data.buffer.push("\n  <h3>Necesitas verificar tus credenciales antes de continuar.</h3>\n  ");
  hashTypes = {};
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers.linkTo),stack1 ? stack1.call(depth0, "login", options) : helperMissing.call(depth0, "linkTo", "login", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\n");
  return buffer;
  }
function program4(depth0,data) {
  
  
  data.buffer.push(" Login");
  }

  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "isLogged", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["home/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  


  data.buffer.push("<h2> Bienvenido</h2>\n");
  
});

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Ember.Handlebars.helpers; data = data || {};
  var buffer = '', stack1, hashTypes, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1, hashTypes;
  data.buffer.push("\n    ");
  hashTypes = {};
  stack1 = helpers['if'].call(depth0, "view.errorOnLogin", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  hashTypes = {'valueBinding': "STRING",'type': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.attempts"),
    'type': ("hidden")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    <div class=\"span3\">\n      ");
  hashTypes = {'valueBinding': "STRING",'class': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.username"),
    'class': ("span3")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n    <div class=\"span3\">\n      ");
  hashTypes = {'valueBinding': "STRING",'class': "STRING",'type': "STRING"};
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextField", {hash:{
    'valueBinding': ("view.password"),
    'class': ("span3"),
    'type': ("password")
  },contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n    <div class=\"span4\">\n      <button class=\"btn btn-large btn-block\" name=\"submit\" type=\"submit\" ");
  hashTypes = {'target': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "submitLogin", {hash:{
    'target': ("view")
  },contexts:[depth0],types:["STRING"],hashTypes:hashTypes,data:data})));
  data.buffer.push(">Entrar</button>\n    </div>\n  ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n      <p class=\"palette-alizarin palette center\"> Error </p>\n    ");
  }

  data.buffer.push("<section id=\"login\">\n  <header>\n    <img ");
  hashTypes = {'src': "STRING"};
  data.buffer.push(escapeExpression(helpers.bindAttr.call(depth0, {hash:{
    'src': ("iurl")
  },contexts:[],types:[],hashTypes:hashTypes,data:data})));
  data.buffer.push("/>\n    <h1>");
  hashTypes = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "name", {hash:{},contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data})));
  data.buffer.push("</h1>\n  </header>\n  ");
  hashTypes = {'tagName': "STRING",'class': "STRING"};
  stack1 = helpers.view.call(depth0, "Brv.LoginFormView", {hash:{
    'tagName': ("form"),
    'class': ("row")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</section>\n");
  return buffer;
  
});