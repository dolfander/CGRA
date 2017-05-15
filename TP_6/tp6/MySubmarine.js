/**
 * MyRobot
 * @constructor
 */

 function MySubmarine(scene,material) {
 	CGFobject.call(this,scene);
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.a = 0;
	this.b = 0;
	this.c = 0;
	this.x1 = -0.0;
	this.y1 =-0.0;
	this.z1 =-0.0;
	this.speed = 0;
	this.angspeed = 0;

	this.structure = new MySubmarineStructure(this.scene,material);
	this.time = 0;
	this.max_speed = .5;
	this.max_angspeed = 1;


 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {
	this.scene.pushMatrix();

		this.scene.translate(this.x, this.y,this.z);
		this.scene.rotate(this.a, 1,0,0);
		this.scene.rotate(this.b, 0,1,0);
		this.scene.rotate(this.c, 0,0,1);
		this.structure.display();

	this.scene.popMatrix();
};
MySubmarine.prototype.update = function(currTime) {

  	this.moveForward(this.speed);
  	this.rotateRight(this.angspeed);

  	this.speed *=.99;
  	this.angspeed*=.925;
	
	
	this.structure.helix.update(this.speed);
		
	
    this.time = currTime;
}

MySubmarine.prototype.moveForward = function(amount) {
  var zvalue = amount * Math.cos(this.b);
	var xvalue = amount * Math.sin(this.b);

	this.z+= zvalue;
  this.x+= xvalue;
}

MySubmarine.prototype.pushForward = function(amount) {
  if(Math.abs(this.speed + amount) <= this.max_speed)
  		this.speed+=amount;
  	else if(this.speed > 0)
  		this.speed = this.max_speed;
  else this.speed = -this.max_speed;
}

MySubmarine.prototype.pushLeft = function(amount) {
	if(Math.abs(this.angspeed + amount) <= this.max_angspeed)
		this.angspeed+=amount;
	else if(this.angspeed > 0)
		this.angspeed = this.max_angspeed;
	else this.angspeed = -this.max_angspeed;
}
MySubmarine.prototype.pushRight = function(amount) {
	this.pushLeft(-amount);
}

MySubmarine.prototype.pushBackward = function(amount) {
	this.pushForward(-amount);
}


MySubmarine.prototype.rotateLeft = function(amount) {

	this.b += amount;
}

MySubmarine.prototype.rotateRight = function(amount) {

  this.b -= amount;
}

MySubmarine.prototype.setMaterial = function(material) {
	this.structure.setMaterial(material);
}
