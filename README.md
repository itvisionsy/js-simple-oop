# js-simple-oop
Simple OOP inheritance implementation for JavaScript.

It is trying to minimize any conventions and rules on how to write your JS code.
 So, you will keep writing your JS code as you used to. That includes: defining
 classes, defining private and public methods, ....

_Only one_ convention (which is originally a JavaScript one) to mention: Add
methods in a named way, so try to avoid writing any anonymous/closure method
without name. i.e. instead of writing `function(param1, param2){ ... }` add a
name so it will become `function someName(param1, param2){ ... }` and that will
work exactly without any effects on your code and execution.

## Install
```
npm install js-simple-oop
```

## How to use

### Include the module
```JavaScript
var OOP = require('js-simple-oop');
```

### Creating classes
You can create a class by calling the `extendClass` method on OOP base class or
 any extended subclass.

```JavaScript

// Creating LivingCreature class as the main class with a constructor
var LivingCreature = OOP.extendClass(function(age){
  this.age = age;
});

// Creating IntelligentCreature extending LivingCreature without a constructor
// so LivingCreature constructor will be used
var IntelligentCreature = LivingCreature.extendClass();

//Creating Human extending IntelligentCreature, and extending the LivingCreature constructor
var Human = IntelligentCreature.extendClass(function(name, age){
  this.parentConstructor(age); //calls parent method
  this.name = name;
});
```

Extended subclasses will receive the following class-level methods:
 1. `.extendClass(subClass)` which allows to create subclasses from the current.
 1. `.defineMethod(method[, name])` which allows to define new named methods
 1. `.defineProperty(property[, getter[, setter[, descriptors]]])` which allows
   to define a property. Check [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
   for info.

Also, in the base OOP class, you can use following methods:
 1. `OOP.extendClass(Class)` allows to create new main classes.
 1. `OOP.extend(SubClass, MainClass)` to inherit MainClass to SubClass.

### Adding methods

You can add methods in the normal JavaScript way using the prototype.
Please note it is preferred to use the named functions when defining methods.
```JavaScript
//this way
LivingCreature.prototype.identify = function identify(){
  //...
};

//is preferred to this way
LivingCreature.prototype.identify = function(){
  //...
};
```

Or you can use the added `.defineMethod` method which will exactly the same result
```JavaScript
//this way
IntelligentCreature.defineMethod(function identify(){
  console.log('I am an intelligent creature.');
  //One way to call parent overridden methods, thanks to named methods, which made
  //this one possible.
  return this.propagateCall();
});

//is preferred to this way
IntelligentCreature.defineMethod(function(){
  //...
}, 'identify');
```

### Calling overridden methods
In subclasses, you can override an inherited method by define a method with the
same name.
To call the overridden method from within the overriding one, you can either
use the `this.parentMethod(methodName[, params...])` or the shorthand
`this.propagateCall([params...])` which will detect the name of the calling
method and call the first method internally.
```JavaScript
LivingCreature.defineMethod(function identify(){
  console.log('I am a living creature!');
});

IntelligentCreature.defineMethod(function identify(){
  this.parentMethod('identify');
  console.log('Also, I am an intelligent creature!');
});

Human.defineMethod(function identify(){
  this.propagateCall();
  console.log('And guess what? I am human....');
});

var someone = new Human();
someone.identify();

//result will be:
//I am a living creature!
//Also, I am an intelligent creature!
//And guess what? I am human....

```

Please note that calling overridden methods this way requires that methods were
defined in the named way.

If you are not happy with the named method definitions, you can still use the
original JavaScript method calling:
```JavaScript
LivingCreature.prototype.idenfity = function(){
  console.log('I am a living creature!');
};

IntelligentCreature.prototype.identify= function(){
  this.__proto__.__proto__.identify();
  console.log('Also, I am an intelligent creature!');
};
```

If you will go with this traditional approach, please note that the position of
the overridden method to be called is relative to the calling object, not calling class.

### Creating and using objects
Nothing new here. It is the normal `new` keyword.

```JavaScript
var tree = new LivingCreature();
var dolphin = new IntelligentCreature(12);
var person1 = new Human('Muhammad', 20);
var person2 = new Human('Salim', 47);
```

## Sample
Please check the [sample](sample.js) file which includes a nice example.

## Author
Muhannad Shelleh <muhannad.shelleh@live.com>

## License
Published under the [MIT](LICENSE) license.
