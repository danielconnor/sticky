
var util = (function() {
  "use strict";
  return {
    inherits: function(ctor, superCtor) {
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };

})();


util.inherits.test = function() {
  "use strict";

  function A() {
    this.testProperty = {
      prop: "success"
    };
  }
  A.prototype.testFunction = function() {
    return "success";
  };

  function B() {
    A.call(this);
  }
  this(B, A);

  var parent = new A(),
    sub = new B();

  return parent instanceof A &&
    sub instanceof B &&
    sub instanceof A &&
    sub.testFunction === A.prototype.testFunction &&
    sub.testProperty.prop === "success" &&
    parent.testProperty.prop === "success" &&
    parent.testProperty !== sub.testProperty;

};