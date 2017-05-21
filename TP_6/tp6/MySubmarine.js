/**
 * MySubmarine
 * @constructor
 */

 function MySubmarine(scene,material) {
 	CGFobject.call(this,scene);

	this.x = 7;
	this.y = 5;
	this.z = 3;

	this.a = 0;
	this.b = 0;
	this.c = 0;

	this.h_speed = 0;
	this.v_speed =0;
	this.h_angspeed = 0;
	this.v_angspeed =0;


	this.structure = new MySubmarineStructure(this.scene,material);
	this.time = 0;
	this.max_h_speed = .5;
	this.max_v_speed = 0.1;
	this.max_h_angspeed = 0.1;
	this.max_v_angspeed = 1;

 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {
	this.scene.pushMatrix();

		this.scene.translate(this.x, this.y,this.z);

		this.scene.rotate(this.b, 0,1,0);
		this.scene.rotate(this.a*degToRad, 1,0,0);
		this.scene.rotate(this.c, 0,0,1);
		this.structure.display();

	this.scene.popMatrix();
};
MySubmarine.prototype.update = function(currTime) {

  	this.moveForward(this.h_speed);
	this.moveUp(this.v_speed);

  	this.rotateRight(this.h_angspeed);
	this.rotateUp(this.v_angspeed);

  	this.h_speed *=.99;
	this.v_speed *=.80;

	this.h_angspeed *=0.95;
	this.v_angspeed *=0.80;



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

if(this.a<0)
	this.a+= 0.2;

if(this.a>0)
	this.a-= 0.2;


    this.time = currTime;
}

MySubmarine.prototype.moveForward = function(amount) {
  var zvalue = amount * Math.cos(this.b);
  var xvalue = amount * Math.sin(this.b);


	this.z+= zvalue;
  this.x+= xvalue;


}

MySubmarine.prototype.pushForward = function(amount) {
  if(Math.abs(this.h_speed + amount) <= this.max_h_speed)
  		this.h_speed+=amount;
  	else if(this.h_speed > 0)
  		this.h_speed = this.max_h_speed;
  else this.h_speed = -this.max_h_speed;
}

MySubmarine.prototype.pushLeft = function(amount) {
	if(Math.abs(this.h_angspeed + amount) <= this.max_h_angspeed)
		this.h_angspeed+=amount;
	else if(this.h_angspeed > 0)
		this.h_angspeed = this.max_h_angspeed;
	else this.h_angspeed = -this.max_h_angspeed;

	if(this.structure.h_rotation_ang > -45)
	this.structure.h_rotation_ang -= 5;


}
MySubmarine.prototype.pushRight = function(amount) {
	if(Math.abs(this.h_angspeed -amount) <= this.max_h_angspeed)
		this.h_angspeed-=amount;
	else if(this.h_angspeed > 0)
		this.h_angspeed = this.max_h_angspeed;
	else this.h_angspeed = -this.max_h_angspeed;



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

MySubmarine.prototype.rotateUp = function(amount) {

//if(this.a > -10  &&this.a< 10)
  this.a -= amount;
}




MySubmarine.prototype.setMaterial = function(material) {
	this.structure.setMaterial(material);
}


MySubmarine.prototype.moveUp = function(amount) {

		this.y += amount;

}

MySubmarine.prototype.pushUp = function(amount) {

  if(Math.abs(this.v_speed + amount) <= this.max_v_speed)
     this.v_speed+=amount;
   else if(this.v_speed > 0)
     this.v_speed = this.max_v_speed;
  else this.v_speed = -this.max_v_speed;

  if(Math.abs(this.v_angspeed + 0.6) <= this.max_v_angspeed)
		this.v_angspeed+=0.6;
	else if(this.v_angspeed > 0)
		this.v_angspeed = this.max_v_angspeed;
	else this.v_angspeed = -this.max_v_angspeed;

  if(this.structure.top.v_rotation_ang > -20)
    this.structure.top.v_rotation_ang -= 2.5;

  if(this.structure.v_rotation_ang > -20)
    this.structure.v_rotation_ang -= 2.5;




}

MySubmarine.prototype.pushDown = function(amount) {

	if(Math.abs(this.v_angspeed -0.6) <= this.max_v_angspeed)
		this.v_angspeed-=0.6;
	else if(this.v_angspeed > 0)
		this.v_angspeed = this.max_v_angspeed;
	else this.v_angspeed = -this.max_v_angspeed;


  if(Math.abs(this.v_speed - amount) <= this.max_v_speed)
     this.v_speed-=amount;
   else if(this.v_speed > 0)
     this.v_speed = this.max_v_speed;
  else this.v_speed = -this.max_v_speed;



    if(this.structure.top.v_rotation_ang < 20)
      this.structure.top.v_rotation_ang += 2.5;


    if(this.structure.v_rotation_ang < 20)
    	this.structure.v_rotation_ang += 2.5;




}

MySubmarine.prototype.periscopeUp = function() {

  if(this.structure.top.height < 0.5)
    this.structure.top.height += 0.01;

}

MySubmarine.prototype.periscopeDown = function() {

  if(this.structure.top.height > -0.5)
    this.structure.top.height -= 0.01;

}

MySubmarine.prototype.getX = function (){
	return this.x;
}

MySubmarine.prototype.getY = function (){
	return this.y;
}

MySubmarine.prototype.getZ = function (){
	return this.z;
}

MySubmarine.prototype.getH_angle  = function (){
  //return this.h_speed;
  return this.h_angspeed;
}

MySubmarine.prototype.getV_angle  = function (){
	return this.v_angspeed;
  //return this.v_speed;
}
