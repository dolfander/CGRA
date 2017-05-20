/**
 * MySubmarine
 * @constructor
 */

 function MySubmarine(scene,material) {
 	CGFobject.call(this,scene);

	this.x = 5;
	this.y = 0;
	this.z = 0;

	this.a = 0;
	this.b = 0;
	this.c = 0;

	this.h_speed = 0;
  this.v_speed =0;
	this.angspeed = 0;


	this.structure = new MySubmarineStructure(this.scene,material);
	this.time = 0;
	this.max_speed = .3;
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

  	this.moveForward(this.h_speed);
  	this.rotateRight(this.angspeed);
	   this.moveUp(this.v_speed);

  	this.h_speed *=.99;
  	this.angspeed*=.925;
	this.v_speed *=.99;

	this.structure.rightHelix.update(1,this.h_speed);
	this.structure.leftHelix.update(0,this.h_speed);

	if(this.structure.h_rotation_ang >0)
	this.structure.h_rotation_ang -= .5;

	if(this.structure.h_rotation_ang <0)
	this.structure.h_rotation_ang += .5;

  if(this.structure.v_rotation_ang <0)
	this.structure.v_rotation_ang += .5;

  if(this.structure.v_rotation_ang >0)
	this.structure.v_rotation_ang -= .5;

  if(this.structure.top.v_rotation_ang <0)
	this.structure.top.v_rotation_ang += .5;

  if(this.structure.top.v_rotation_ang >0)
	this.structure.top.v_rotation_ang -= .5;


    this.time = currTime;
}

MySubmarine.prototype.moveForward = function(amount) {
  var zvalue = amount * Math.cos(this.b);
  var xvalue = amount * Math.sin(this.b);


	this.z+= zvalue;
  this.x+= xvalue;


}

MySubmarine.prototype.pushForward = function(amount) {
  if(Math.abs(this.h_speed + amount) <= this.max_speed)
  		this.h_speed+=amount;
  	else if(this.h_speed > 0)
  		this.h_speed = this.max_speed;
  else this.h_speed = -this.max_speed;
}

MySubmarine.prototype.pushLeft = function(amount) {
	if(Math.abs(this.angspeed + amount) <= this.max_angspeed)
		this.angspeed+=amount;
	else if(this.angspeed > 0)
		this.angspeed = this.max_angspeed;
	else this.angspeed = -this.max_angspeed;

	if(this.structure.h_rotation_ang > -45)
	this.structure.h_rotation_ang -= 5;


}
MySubmarine.prototype.pushRight = function(amount) {
	if(Math.abs(this.angspeed -amount) <= this.max_angspeed)
		this.angspeed-=amount;
	else if(this.angspeed > 0)
		this.angspeed = this.max_angspeed;
	else this.angspeed = -this.max_angspeed;



if(this.structure.h_rotation_ang < 45)
	this.structure.h_rotation_ang += 5;

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


MySubmarine.prototype.moveUp = function(amount) {

		this.y += amount;


}

MySubmarine.prototype.pushUp = function(amount) {

  if(Math.abs(this.v_speed + amount) <= this.max_speed)
     this.v_speed+=amount;
   else if(this.v_speed > 0)
     this.v_speed = this.max_speed;
  else this.v_speed = -this.max_speed;

  if(this.structure.top.v_rotation_ang > -20)
    this.structure.top.v_rotation_ang -= 2.5;

  if(this.structure.v_rotation_ang > -20)
    this.structure.v_rotation_ang -= 2.5;

}

MySubmarine.prototype.pushDown = function(amount) {

  if(Math.abs(this.v_speed - amount) <= this.max_speed)
     this.v_speed-=amount;
   else if(this.v_speed > 0)
     this.v_speed = this.max_speed;
  else this.v_speed = -this.max_speed;



    if(this.structure.top.v_rotation_ang < 20)
      this.structure.top.v_rotation_ang += 2.5;


    if(this.structure.v_rotation_ang < 20)
    	this.structure.v_rotation_ang += 2.5;



}
