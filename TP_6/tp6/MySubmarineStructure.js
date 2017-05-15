
function MySubmarineStructure(scene, material) {
 CGFobject.call(this,scene);
 
 this.body = new MyCylinder(this.scene,50,1);
 this.semi_sphere = new MySemiSphere(this.scene,50,19);
 this.top = new MySubmarineTop(this.scene,material);
 this.trapezius = new MyTrapezius(this.scene,2.5,1.5,0.3);
 this.helix  = new MyHelix(this.scene,material);

 this.material = material;
 
 this.initBuffers();
};

MySubmarineStructure.prototype = Object.create(CGFobject.prototype);
MySubmarineStructure.prototype.constructor = MySubmarineStructure;


MySubmarineStructure.prototype.display = function() {

	this.material.apply();

	this.scene.pushMatrix();
		this.scene.scale(0.78,0.78,4);
		this.body.display();
	this.scene.popMatrix();
 	
	this.scene.pushMatrix();
		this.scene.scale(0.78,0.78,0.78);
		this.scene.translate(0,0,5.08);
		this.semi_sphere .display();
	this.scene.popMatrix();
	
	
	this.scene.pushMatrix();
		this.scene.scale(0.78,0.78,0.78);
		this.scene.rotate(180* degToRad, 0, 1, 0);
		this.semi_sphere .display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.rotate(-90* degToRad, 1, 0, 0);
		this.scene.rotate(-90* degToRad, 0, 0, 1);

		this.scene.scale(0.5,0.5,0.7);
		this.scene.translate(5,0,1);

		this.top.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.scale(1.5,0.5,1.2);
		this.scene.translate(-1.23,0,-0.3);
		this.trapezius.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.rotate(90*degToRad,0,0,1);
		this.scene.scale(1.5,0.5,1.2);
		this.scene.translate(-1.23,0,-0.3);
		this.trapezius.display();
	this.scene.popMatrix();
	
	
	this.scene.pushMatrix();
		this.scene.translate(1.07,-0.2,0.3);
		this.scene.scale(0.3,0.3,0.3);
		this.helix.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(-1.07,-0.2,0.3);
		this.scene.scale(0.3,0.3,0.3);
		this.helix.display();
	this.scene.popMatrix();
	

 }
 
  MySubmarineStructure.prototype.setMaterial = function(material) {
	this.material = material;
	this.top.setMaterial(material);
	this.helix.setMaterial(material);
 }


