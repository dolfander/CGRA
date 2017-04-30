var degToRad = Math.PI / 180.0;

var	FLOOR_WIDTH =30;
var FLOOR_HEIGHT = 30;



function LightingScene() {
	CGFscene.call(this);

}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.enableTextures(true);
	this.initCameras();
	this.initLights();

	this.gl.clearColor(0.0, 0.4, 0.6, 1);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);



	this.axis = new CGFaxis(this);

	this.option1 = true;
	this.option2 = false;
	this.speed = 3;

	this.materialDefault = new CGFappearance(this);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.loadTexture("../resources/images/floor.jpg");

	this.metalAppearence = new CGFappearance(this);
	this.metalAppearence.setAmbient(0.3,0.3,0.3,1);
	this.metalAppearence.setDiffuse(0.8,0.8,0.8,1);
	this.metalAppearence.setSpecular(0.1,0.1,0.1,1);
	this.metalAppearence.setShininess(10);
	this.metalAppearence.loadTexture("../resources/images/metal.jpg");

	this.submarine = new MySubmarine(this);
	this.floor = new MyQuad(this,0,100,0,100);
	this.post = new MyPost(this);



	this.setUpdatePeriod(100);


};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(1, 6.0, 7.5, 1.0);
	this.lights[2].setVisible(true);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable();

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup




	this.pushMatrix();
		this.rotate(270 * degToRad, 1, 0, 0);
		this.scale(FLOOR_WIDTH, FLOOR_HEIGHT, 1);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(8,5,0);
		this.post.display();
	this.popMatrix();

	this.pushMatrix();
		this.rotate(90* degToRad, 0, 1, 0);
		this.submarine.display();
	this.popMatrix();




};

LightingScene.prototype.update = function(currTime){
		this.post.update(currTime);
		this.submarine.update(currTime);


};



LightingScene.prototype.doSomething = function(){

};
