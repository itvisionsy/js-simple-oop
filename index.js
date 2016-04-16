/***** GENERIC METHODS FOR INHERITENCE ******/

//gets a main and sub classes, and sets the prototype correctly, with extra useful methods
function extend(SubClass, MainClass) {
    SubClass.prototype.__proto__ = MainClass.prototype;
    SubClass.extendClass = extendClass;
    SubClass.defineMethod = defineMethod;
    return SubClass;
}

//gets a sub class, and sets the calling context class as the main one for the sub prototype
function extendClass(SubClass) {
    if (!SubClass) {
        return subClass.call(this);
    }
    return extend(SubClass, this);
}

//creates a new class and sets the current calling context class as the main class for it.
function subClass() {
    var SubClass = function () {
      this.parentConstructor.apply(this, arguments);
    };
    return extendClass.call(this, SubClass);
}

//allows to define named methods directly in the prototype of the class
function defineMethod(methodCallback, methodName) {

    if (typeof methodCallback !== 'function') {
        throw 'Method should be a function';
    }

    if (!methodName && !methodCallback.name) {
        throw 'You should provide a name to the method either in definition or as a second parameter name';
    }

    methodName = methodCallback.name || methodName;

    this.prototype[methodName] = methodCallback;

};

/**** THE MAIN OOP CLASS ****/

var OOP;

(function(){

  function OOP() {

  }

  // Allows to call parent constructor from sub constructors. i.e. this.parentConstructor()
  OOP.prototype.parentConstructor = function () {

      //get arguments list
      var args = Array.prototype.slice.call(arguments);
      args.unshift('constructor');

      return this.parentMethod.apply(this, args);

  };

  // Allows to call a parent method from sub classes after they are overridden. i.e. this.parentMethod(methodName, param1, param2, ...);
  OOP.prototype.parentMethod = function (method) {
      if (!method) {
          throw 'What method to call in parent?';
      }

      //get arguments list
      var args = Array.prototype.slice.call(arguments);
      args.shift();

      //checks if a method is an instuctor in current object stack
      function isConstructor(method){
        var parent = this;
        do {
          if(parent.constructor===method){
            return true;
          }
          parent = parent.__proto__;
        } while(parent);
        return false;
      }

      //find overriding calling method
      var callingMethod = arguments.callee.caller;
      while(callingMethod){
        if(callingMethod.name===method || method==='constructor' && isConstructor.call(this, callingMethod)){
          break;
        }
        callingMethod = callingMethod.caller;
      }
      if(!callingMethod) {
        throw 'Calling parent method from outside method context';
      }

      //find called method
      var found = false, parent = this, calledMethod;
      if(typeof callingMethod !== 'function'){
        throw 'Calling parent method from a normal context!';
      }
      while(parent){
        if(parent.hasOwnProperty(method) || method==='constructor'){
          if(found && (method==='constructor' && callingMethod !== parent.constructor || method!=='constructor')){
            calledMethod = method==='constructor' ? parent.constructor : parent[method];
            break;
          } else if( parent[method] === callingMethod || method==='constructor' && callingMethod === parent.constructor) {
            found = true;
          }
        }
        parent = parent.__proto__;
      }

      //if no called method found
      if(!calledMethod){
        throw 'Method ' + method + ' not found in parent levels!';
      }

      //call the parent method
      return calledMethod.apply(this, args);
  };

  // Allows to call parent method directly without the name. Named methods should be used to define methods.
  // Defnition example: MainClass.prototype.talk = function talk(param1){ ... }
  // Calling example: SubClass.prototype.talk = function talk(param1, param2){ this.propagateCall(param1); ... }; //this will call the parent talk method with param1 passed
  OOP.prototype.propagateCall = function () {
      var method = arguments.callee.caller.name;
      if(!method){
        throw 'Can not propagate method call for unnamed methods. Use named functions to use this method.';
      }
      var args = Array.prototype.slice.call(arguments || []);
      args.unshift(method);
      return this.parentMethod.apply(this, args);
  };

  // Add inheritence methods
  OOP.extendClass = extendClass;
  OOP.extendTo = extend;

})();

//end
module.exports = OOP;
