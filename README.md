# js-simple-oop
Simple OOP inheritance implementation for JavaScript.

It is trying to minimize any conventions and rules on how to write your JS code.
 So, you will keep writing your JS code as you used to. That includes: defining classes,
 defining private and public methods, ....

_Only one important_ convention (which is originally a JavaScript one) to mention:
 Add methods in a named way, so try to avoid writing any anonymous/closure method
 without name. i.e. instead of writing `function(param1, param2){ ... }` add a name
 so it will become `function someName(param1, param2){ ... }` and that will work
 exactly without any effects on your code and execution.

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
You can create a class by calling the `extendClass` method on OOP or any extended class.

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

### Adding methods
```JavaScript
LivingCreature.prototype.identify = function identify(){
  console.log('I am alive for ' + this.age + ' years now!');
};

//Overriding the identify method for IntelligentCreature
IntelligentCreature.prototype.identify = function identify(){
  console.log('I am an intelligent creature.');
  //One way to call parent overridden methods, thanks to named methods, which made
  //this one possible.
  return this.propagateCall();
};

//Add a method to Human
Human.prototype.identify = function identify(){
  console.log('My name is '+ this.name +'!');
  //Another way to call the overridden method is by mentioning its name directly
  this.parentMethod('identify');
};
```

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
