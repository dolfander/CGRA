function MySubmarineTop(scene) {
 CGFobject.call(this,scene);
 
 this.cylinder = new MyCylinder(this.scene,50,1);
 this.surface = new MyClockSurface(this.scene,50);
 this.semi_sphere = new MySemiSphere(this.scene,50,19);
 this.trapezius = new MyTrapezius(this.scene);
 
 	this.glassAppearence = new CGFappearance(this.scene);
	this.glassAppearence.setAmbient(0.3,0.3,0.3,1);
	this.glassAppearence.setDiffuse(0.9,0.9,0.9,1);
	this.glassAppearence.setSpecular(0.1,0.1,0.1,1);
	this.glassAppearence.setShininess(10);
	this.glassAppearence.loadTexture("../resources/images/glass.jpg");
 

 this.initBuffers();
};

MySubmarineTop.prototype = Object.create(CGFobject.prototype);
MySubmarineTop.prototype.constructor = MySubmarineTop;


MySubmarineTop.prototype.display = function() {

	this.scene.metalAppearence.apply();
	
	// Tower


	this.cylinder.display();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.surface.display();
	this.scene.popMatrix();
	
	
	// Periscope
	
	this.scene.blackAppearence.apply();
	
	this.scene.pushMatrix();
	this.scene.scale(0.1,0.1,3);
	this.cylinder.display();
	this.scene.popMatrix();
	
	
	
	this.scene.pushMatrix();
	this.scene.translate(0.3,0,3);
	this.scene.rotate(-90* degToRad,0,1,0);
	this.scene.scale(0.1,0.1, 0.3);
	this.cylinder.display();
	this.scene.popMatrix();
	

	this.scene.pushMatrix();
	this.scene.translate(0,0,3);
	this.scene.scale(0.1,0.1, 0.1);
	this.semi_sphere.display();
	this.scene.popMatrix();
	
	this.glassAppearence.apply();
	
	this.scene.pushMatrix();
	this.scene.translate(0.3,0,3);
	this.scene.rotate(90 * degToRad,0,1,0);
	this.scene.scale(0.1,0.1,0.1);
	this.surface.display();
	this.scene.popMatrix();
	
	// Trapezius
	
	this.scene.metalAppearence.apply();
	
	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.translate(0,0,-0.5);
	this.scene.scale(1,0.3,0.7);
	
	this.trapezius.display();
 	


 };
