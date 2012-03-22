UI.SingleRangeControl = function(value, max, min) {
    UI.RangeControl.call(this, max, min);
    var rangeControl = this;

    this.slider = new UI.RangeSliderControl(this);
    this.append(this.slider);

    this.slider.addEventListener("drag", function(e) {
        rangeControl.onsliderdrag(this, e);
    });

    this.handle("DOMNodeInserted");

    this.slider._value = value;
}
UI.SingleRangeControl.prototype = new UI.RangeControl();
UI.SingleRangeControl.prototype.constructor = UI.SingleRangeControl;
UI.SingleRangeControl.prototype.supr = UI.RangeControl;

UI.SingleRangeControl.prototype.onmousedown = function(e) {
    this.slider.onmousemove(e, true);
    return false;
};

Object.defineProperty(UI.SingleRangeControl.prototype, "value", {
    get: function() {
        return this.slider._value;
    },
    set: function(val) {
        this.slider.value = val;
    }
});
UI.SingleRangeControl.prototype.onDOMNodeInserted = function() {
    this.value = this.slider._value;
}