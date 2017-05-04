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
	
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.5);
	this.cylinder.display();
	this.reverse_cylinder.display();
	this.scene.popMatrix();
	

	
	this.scene.pushMatrix();
	this.scene.scale(0.4,1.96,0.25);
	this.polign.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.semi_sphere.display();


 };
