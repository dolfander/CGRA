function MySubmarineTop(scene,material) {
 CGFobject.call(this,scene);

 this.material =  material;

 this.cylinder = new MyCylinder(this.scene,50,1);
 this.surface = new MyClockSurface(this.scene,50);
 this.semi_sphere = new MySemiSphere(this.scene,50,19);
 this.trapezius = new MyTrapezius(this.scene,1.5,1,0.3);

 	this.glassAppearence = new CGFappearance(this.scene);
	this.glassAppearence.setAmbient(0.3,0.3,0.3,1);
	this.glassAppearence.setDiffuse(0.9,0.9,0.9,1);
	this.glassAppearence.setSpecular(0.1,0.1,0.1,1);
	this.glassAppearence.setShininess(10);
	this.glassAppearence.loadTexture("../resources/images/glass.jpg");

  this.v_rotation_ang=0;
  this.height =0;


 this.trapezius.initBuffers();
 this.initBuffers();
};

MySubmarineTop.prototype = Object.create(CGFobject.prototype);
MySubmarineTop.prototype.constructor = MySubmarineTop;


MySubmarineTop.prototype.display = function() {

	this.material.apply();

	// Tower


	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.2);	
	this.scene.scale(1,1,1.2);
	
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	   this.scene.translate(0,0,0.95);
	   this.surface.display();
	this.scene.popMatrix();


	// Periscope

	this.scene.blackAppearence.apply();

	this.scene.pushMatrix();
	  this.scene.translate(0.3,0,this.height);
	  this.scene.scale(1,1,0.8);


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


	// Periscope - Glass
	this.glassAppearence.apply();

	this.scene.pushMatrix();
	this.scene.translate(0.3,0,3);
	this.scene.rotate(90 * degToRad,0,1,0);
	this.scene.scale(0.1,0.1,0.1);
	this.surface.display();
	this.scene.popMatrix();

	this.scene.popMatrix();


	// Trapezius

	this.scene.blackAppearence.apply();

	this.scene.pushMatrix();
  this.scene.rotate(this.v_rotation_ang*degToRad,0,1,0);
	this.scene.rotate(-90 *degToRad,0,0,1);
	this.scene.rotate(90 *degToRad,1,0,0);
	this.scene.scale(2.5,0.5,2.5);
	this.scene.translate(-0.75,1.,-0.2);
	this.trapezius.display();
	this.scene.popMatrix();




 };

 MySubmarineTop.prototype.setMaterial = function(material) {
	this.material= material;
}
