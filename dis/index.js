"use strict";
class Person {
    speak(name) {
        return `Olá ${name?.toUpperCase() ?? "Fulano .."}!!!`;
    }
}
const person = new Person();
person.speak();
person.speak('Lucas');
