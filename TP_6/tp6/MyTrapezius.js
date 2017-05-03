function MyTrapezius(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.quad = new MyQuad(this.scene,minS,maxS,minT,maxT);
	this.trapezius_aux = new MyTrapeziusAux(this.scene);
	this.quad.initBuffers();
	this.trapezius_aux.initBuffers();
	
	this.initBuffers();
};

MyTrapezius.prototype = Object.create(CGFobject.prototype);
MyTrapezius.prototype.constructor=MyTrapezius;




MyTrapezius.prototype.display = function () {
	
	
	this.scene.pushMatrix();
 	this.scene.translate(0, 0, 0.5);
	this.scene.scale(2,1,1);
 	this.quad.display();
	
	
	this.scene.rotate(180*degToRad,1,0,0);
	this.scene.scale(2,1,1);
	this.quad.display();
 	this.scene.popMatrix();
	
	
	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.translate(0,.5,0);
	this.scene.scale(2,1,1);
	this.quad.display();
	
	this.scene.rotate(-180*degToRad,1,0,0);
	this.quad.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(1,0,0);
	this.trapezius_aux.display();
	
	
	this.scene.translate(-2,0,0);
	this.scene.rotate(270*degToRad,0,1,0);
	
	this.trapezius_aux.display();
	this.scene.pushMatrix();
	
	
	
};