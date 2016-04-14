/***** GENERIC METHODS FOR INHERITENCE ******/

//this method gets a main and sub classes, and sets the prototype correctly
function extend(SubClass, MainClass) {
    SubClass.prototype.__proto__ = MainClass.prototype;
    return SubClass;
}

//this method gets a sub class, and sets the calling context class as the main one for the sub prototype
function extendClass(SubClass) {
    if (!SubClass) {
        return createSubClass.call(this);
    }
    var SubClassExtended = extend(SubClass, this);
    SubClassExtended.extendClass = extendClass;
    SubClassExtended.subClass = subClass;
    return SubClassExtended;
}

//this method creates a new class and sets the current calling context class as the main class for it.
function subClass() {
    var SubClass = function () {};
    return extendClass.call(this, SubClass);
}

/**** THE MAIN OOP CLASS ****/

function OOP() {

}

// Allows to call parent constructor from sub constructors. i.e. this.parentConstructor()
OOP.prototype.parentConstructor = function () {
    if (this.__proto__ && this.__proto__.__proto__) {
        return this.__proto__.__proto__.constructor.apply(this.__proto__, arguments);
    }
};

// Allows to call a parent method from sub classes after they are overridden. i.e. this.parentMethod(methodName, param1, param2, ...);
OOP.prototype.parentMethod = function (method) {
    if (!method) {
        throw 'What method to call in parent?';
    }
    if (!(this.__proto__ && this.__proto__.__proto__)) {
        throw 'No parent to call method ' + method + ' in!';
    }
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    return this.__proto__.__proto__[method].apply(this.__proto__, args);
};

// Allows to call parent method directly without the name. Named methods should be used to define methods.
// Defnition example: MainClass.prototype.talk = function talk(param1){ ... }
// Calling example: SubClass.prototype.talk = function talk(param1, param2){ this.propagateCall(param1); ... }; //this will call the parent talk method with param1 passed
OOP.prototype.propagateCall = function () {
    var method = arguments.callee.caller.name;
    var args = Array.prototype.slice.call(arguments || []);
    args.unshift(method);
    return this.parentMethod.apply(this, args);
};

// Add inheritence methods
OOP.extendClass = extendClass;
OOP.subClass = subClass;

//end
exports = OOP;
