
window.DOMTokenList = window.DOMTokenList || (function() {
    function DOMTokenList(element) {
        Array.call(this);
        this.element = element;
    }
    DOMTokenList.prototype = new Array();
    DOMTokenList.prototype.constructor = DOMTokenList;

    DOMTokenList.prototype.toString = function() {
        return this.join(" ");
    }
    DOMTokenList.prototype.add = function(className) {
        if(!this.contains(className)) {
            this.push(className);
            this.element.className = this.toString();
        }
    }
    DOMTokenList.prototype.remove = function(className) {
        var loc;
        if(loc = this.indexOf(className) > -1) {
            this.splice(loc, 1);
            this.element.className = this.toString();
        }
    }
    DOMTokenList.prototype.contains = function(className) {
        return this.indexOf(className) > -1;
    }
    DOMTokenList.prototype.item = function(loc) {
        return this[loc];
    }
    DOMTokenList.prototype.toggle = function(className) {
        var loc = this.indexOf(className),
            contains = loc > -1;

        if(contains) {
            this.splice(has, className);
        }
        else {
            this.push(className);
        }
        this.element.className = this.toString();

        return !contains;
    }
    return DOMTokenList;
})();