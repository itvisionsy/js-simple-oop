var OOP = require('./index');
//in production it should be
//    var OOP = require('js-simple-oop');

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


//Add a method to LivingCreature
LivingCreature.prototype.identify = function identify(){
  if(this.age){
    return 'I am alive for ' + this.age + ' years now! ';
  } else {
    return 'I will not tell you my age. Try to guess it :) ';
  }
};

//Add a method which calls another method
LivingCreature.prototype.welcome = function welcome(){
  console.log('Hello! ' + this.identify());
};

//Add a method to the IntelligentCreature
IntelligentCreature.prototype.iqScore = function iqScore(){
  if(!this._iqScore){
    this._iqScore = Math.floor(Math.random()*200);
  }
  return this._iqScore;
};

//Overriding the identify method for IntelligentCreature
IntelligentCreature.prototype.identify = function identify(){

  //calling parent overridden identify method
  return this.propagateCall() + 'I am an intelligent creature. ';

};

//Add a method to Human
Human.prototype.identify = function identify(){

  return 'My name is '+ this.name +'! ' +
      //calling parent identify method
      //another way to call the overridden method
      this.parentMethod('identify') +
      //using other methods
      'My IQ score is ' +
      ( this.iqScore() > 100 ? 'high at ' : ( this.iqScore() < 50 ? 'low at ' : 'normal at ' )) +
      this.iqScore() + '. ';

};

//Creating objects
var tree = new LivingCreature();
var dolphin = new IntelligentCreature(12);
var person1 = new Human('Muhammad', 20);
var person2 = new Human('Salim', 47);

//Calling methods
tree.welcome(); //Hello! I will not tell you my age. Try to guess it :)
dolphin.welcome(); //Hello! I am alive for 12 years now! I am an intelligent creature.
person1.welcome(); //Hello! My name is Muhammad! I am alive for 20 years now! I am an intelligent creature. My IQ score is normal at 98.
person2.welcome(); //Hello! My name is Salim! I am alive for 47 years now! I am an intelligent creature. My IQ score is low at 35.
