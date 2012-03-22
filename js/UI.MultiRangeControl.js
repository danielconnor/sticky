UI.MultiRangeControl = function(max, min) {
    UI.RangeControl.call(this, max, min);

    this.handle("DOMNodeInsertedIntoDocument");
    this.handle("DOMNodeInserted");
}
UI.MultiRangeControl.prototype = new UI.RangeControl();
UI.MultiRangeControl.prototype.constructor = UI.MultiRangeControl;
UI.MultiRangeControl.prototype.supr = UI.RangeControl;


UI.MultiRangeControl.prototype.addSlider = function(value) {
    var slider = new UI.RangeSliderControl(this);

    slider.value = value;

    this.append(slider);
}

UI.MultiRangeControl.prototype.onDOMNodeInsertedIntoDocument = 
UI.MultiRangeControl.prototype.onDOMNodeInserted = function() {
    var children = this.children;
    for(var i = 0, il = children.length; i < il; i++) {
        var child = children[i];

        child.value = child._value;
    }
}