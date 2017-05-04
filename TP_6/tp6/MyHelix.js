function MyHelix(scene) {
 CGFobject.call(this,scene);
 
 this.cylinder = new MyCylinder(this.scene,50,1);
 this.reverse_cylinder = new MyCylinder(this.scene,50,1,true);
 this.polign = new MyUnitCubeQuad(this.scene);
 this.semi_sphere = new MySemiSphere(this.scene,40,19); 

 this.initBuffers();
};

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor = MyHelix;


MyHelix.prototype.display = function() {
	
	this.scene.metalAppearence.apply();
	
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.5);
	this.scene.scale(1,1,0.7);
	this.cylinder.display();
	this.reverse_cylinder.display();
	this.scene.popMatrix();
	
	this.scene.blackAppearence.apply();
	
	this.scene.pushMatrix();
	this.scene.scale(0.4,1.9,0.25);
	this.polign.display();
	this.scene.popMatrix();
	
	this.scene.metalAppearence.apply();
	
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.1)
	this.scene.scale(0.2,0.2,0.2);
	this.semi_sphere.display();
	this.scene.popMatrix();


 };
