
function MySubmarine(scene) {
 CGFobject.call(this,scene);



 this.yRotation = 0;
 	this.Xmovement = 7;
 this.Zmovement = 0;

 this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.initBuffers = function() {
 this.vertices = [
 0.5, 0.3, 0,
 -0.5, 0.3, 0,
 0, 0.3, 2,

 ];

 this.indices = [
 0, 1, 2,
 ];




 this.primitiveType = this.scene.gl.TRIANGLES;
 this.initGLBuffers();
};


MySubmarine.prototype.moveForward = function (speed)
{
	this.Xmovement += Math.sin(this.yRotation * degToRad) * (speed / 15);
	this.Zmovement += Math.cos(this.yRotation * degToRad) * (speed / 15);


  //
	// if (this.Xmovement < 2)
	// 	this.Xmovement = 2;
	// if (this.Xmovement > 29)
	// 	this.Xmovement = 29;
  //
	// if (this.Zmovement < 2)
	// 	this.Zmovement = 2;
	// if (this.Zmovement > 29)
	// 	this.Zmovement = 29;
};

MySubmarine.prototype.moveBack = function (speed)
{
	this.Xmovement -= Math.sin(this.yRotation * degToRad) * (speed / 30);
	this.Zmovement -= Math.cos(this.yRotation * degToRad) * (speed / 30);

  //
	// if (this.Xmovement < 2)
	// 	this.Xmovement = 2;
	// if (this.Xmovement > 29)
	// 	this.Xmovement = 29;
  //
	// if (this.Zmovement < 2)
	// 	this.Zmovement = 2;
	// if (this.Zmovement > 29)
	// 	this.Zmovement = 29;
};

MySubmarine.prototype.update = function(currTime)
{
	if (this.lastUpdate == -1)
		this.lastUpdate = currTime;
	var diff = currTime - this.lastUpdate;

  this.scene.pushMatrix();
		this.scene.translate(this.Xmovement, 0, this.Zmovement);
		this.scene.submarine.display();
	this.scene.popMatrix();

	this.lastUpdate = currTime;
}
