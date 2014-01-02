function App() { //Abstract klass, hur får man till det? 
    //Denna klass ska skapa en meny specifik för varje app

    this.addApp = function (app) {
        if (app === 'memory') {

        }
    };

    this.getDropDownMenu = function () {
    }; 
}

App.prototype.addMenu = function () {

};


// Inheritance
/**
 * Transform base class
 */
function Transform() {
    this.type = "2d";
}

Transform.prototype.toString = function () {
    return "Transform";
}

/**
 * Translation class.
 */
function Translation(x, y) {
    // Parent constructor
    Transform.call(this);

    // Public properties
    this.x = x;
    this.y = y;
}

// Inheritance
Translation.prototype = Object.create(Transform.prototype);

// Override
Translation.prototype.toString = function () {
    return Transform.prototype.toString() + this.type + " Translation " + this.x + ":" + this.y;
}

/**
 * Rotation class.
 */
function Rotation(angle) {
    // Parent constructor
    Transform.call(this);

    // Public properties
    this.angle = angle;
}

// Inheritance
Rotation.prototype = Object.create(Transform.prototype);

// Override
Rotation.prototype.toString = function () {
    return Transform.prototype.toString() + this.type + " Rotation " + this.angle;
}

// Tests
translation = new Translation(10, 15);

console.log(translation instanceof Transform); // true
console.log(translation instanceof Translation); // true
console.log(translation instanceof Rotation); // false
console.log(translation.toString()) // Transform2d Translation 10:15