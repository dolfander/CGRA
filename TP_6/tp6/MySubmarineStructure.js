
function MySubmarineStructure(scene) {
 CGFobject.call(this,scene);
 
 this.body = new MyCylinder(this.scene,50,1);
 this.front = new MySemiSphere(this.scene,50,19);
 this.back = new MySemiSphere(this.scene,50,19);
 this.tower = new MyCylinder(this.scene,50,1);
 this.top = new MyClockSurface(this.scene);
 
 



 this.initBuffers();
};

MySubmarineStructure.prototype = Object.create(CGFobject.prototype);
MySubmarineStructure.prototype.constructor = MySubmarineStructure;

MySubmarineStructure.prototype.initBuffers = function() {
 this.vertices = [
 0.5, 0.3, 0,
 -0.5, 0.3, 0,
 0, 0.3, 2,

 ];

 this.indices = [
 0, 1, 2,
 ];
 
  
	this.normals = [
		0,1,0,
		0,1,0,
		0,1,0,
	];




 this.primitiveType = this.scene.gl.TRIANGLES;
 this.initGLBuffers();
};

MySubmarineStructure.prototype.display = function() {

	this.scene.metalAppearence.apply();

	this.scene.pushMatrix();
	this.scene.scale(0.78,0.78,4);
	this.body.display();
	this.scene.popMatrix();
 	
	this.scene.pushMatrix();
	this.scene.scale(0.78,0.78,0.78);
	this.scene.translate(0,0,5.08);
	this.front.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.scale(0.78,0.78,0.78);
	this.scene.rotate(180* degToRad, 0, 1, 0);
	this.back.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.rotate(90* degToRad, 1, 0, 0);
	this.scene.translate(0,2.5,-1.3);
	this.scene.scale(0.45,0.45,0.9);

	this.tower.display();
	this.scene.popMatrix();



 }


