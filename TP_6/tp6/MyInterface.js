/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

	this.gui.add(this.scene, 'doSomething');

	// add a group of controls (and open/expand by defult)

	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;



	group.add(this.scene, 'Light1');
	group.add(this.scene, 'Light2');
	group.add(this.scene, 'Light3');
	group.add(this.scene, 'Light4');

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters

	this.gui.add(this.scene, 'Texture', {Normal: 0, Trippy: 1} );

	this.gui.add(this.scene, 'pause');

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	// switch (event.keyCode)
	// {
	// 	case (65):	// only works for capital 'A', as it is
	// 		console.log("Key 'A' pressed");
	// };

	var x = event.which || event.keyCode;             // Get the Unicode value


	if (x == 65 || x == 97){
		this.scene.submarine.pushLeft(-.02);

	}
	else if (x == 68 ||x == 100)	{
		this.scene.submarine.pushRight(-.02)
	}
	else if (x == 87 || x == 119){
		this.scene.submarine.pushForward(0.03);
	}
	else if (x == 83 || x == 115)	{
		this.scene.submarine.pushBackward(0.03);
	}
	else if(x== 81 || x== 113 ){
		this.scene.submarine.pushUp(0.01);
	}
	else if(x==69 || x == 101 ){
		this.scene.submarine.pushDown(0.01);
	}
	else if(x==80 || x == 112 ){
		this.scene.submarine.periscopeUp();
	}
	else if(x==76 || x == 108 ){
		this.scene.submarine.periscopeDown();
	}



};
