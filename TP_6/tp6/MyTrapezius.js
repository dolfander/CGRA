function MyTrapezius(scene) {
	CGFobject.call(this,scene);

	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();
};

MyTrapezius.prototype = Object.create(CGFobject.prototype);
MyTrapezius.prototype.constructor=MyTrapezius;

MyTrapezius.prototype.display = function() {
	this.quad.display();

	this.scene.pushMatrix();
	this.scene.scale(1,2,1);
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.quad.display();
	this.scene.popMatrix();
	
	

	this.scene.pushMatrix();
	this.scene.scale(1,Math.sqrt(0.5*0.5+1),1);
	this.scene.rotate(-Math.PI /2 +Math.atan(0.5/1), 1, 0, 0);
	this.scene.translate(0,0.2,-0.2);
	
	this.quad.display();
	this.scene.popMatrix();

	
	/*
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI/2, 0, 1, 0);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI/2, 0, 1, 0);
	this.quad.display();
	this.scene.popMatrix();
	
	*/
}