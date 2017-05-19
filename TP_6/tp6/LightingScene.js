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

	this.Light1 = true;
	this.Light2 = true;
	this.Light3 = true;
	this.Light4 = true;
	this.pause = false;


	this.materialDefault = new CGFappearance(this);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.loadTexture("../resources/images/floor.jpg");
	this.floorAppearance.setTextureWrap("REPEAT","REPEAT");

	this.metalAppearence = new CGFappearance(this);
	this.metalAppearence.setAmbient(0.3,0.3,0.3,1);
	this.metalAppearence.setDiffuse(1,1,1,1);
	this.metalAppearence.setSpecular(0.1,0.1,0.1,1);
	this.metalAppearence.setShininess(100);
	this.metalAppearence.loadTexture("../resources/images/metal.jpg");
	
	

	this.trippyAppearence = new CGFappearance(this);
	this.trippyAppearence.setAmbient(0.3,0.3,0.3,1);
	this.trippyAppearence.setDiffuse(1,1,1,1);
	this.trippyAppearence.setSpecular(0.1,0.1,0.1,1);
	this.trippyAppearence.setShininess(100);
	this.trippyAppearence.loadTexture("../resources/images/trippy.jpg");
	
	
	
	this.blackAppearence = new CGFappearance(this);
	this.blackAppearence.setAmbient(0.3,0.3,0.3,1);
	this.blackAppearence.setDiffuse(1,1,1,1);
	this.blackAppearence.setSpecular(0.1,0.1,0.1,1);
	this.blackAppearence.setShininess(100);
	this.blackAppearence.loadTexture("../resources/images/rusty_black.jpg");

	this.submarineAppearances = [this.metalAppearence, this.trippyAppearence];
	this.matoptions = [ 'Normal', 'Trippy'];
	this.Texture = 0;

	this.submarine = new MySubmarine(this,this.submarineAppearances[this.Texture]);
	this.floor = new MyPlane(this,0,50,0,50,100);
	this.post = new MyPost(this);
	this.helix = new MyHelix(this);

	this.torpedo = new MyTorpedo(this, this.metalAppearence);

    target1 = new MyTarget(this, this.blackAppearence);
	target2 = new MyTarget(this, this.blackAppearence);
	target3 = new MyTarget(this, this.blackAppearence);

	this.targets = [target1, target2, target3];


	this.setUpdatePeriod(20);

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);


	
	// Positions for four lights
	this.lights[0].setPosition(-5, 6, 5, 1);
	this.lights[1].setPosition(-5, 6.0, -5, 1.0);
	this.lights[2].setPosition(5, 6.0, 5, 1.0);
	this.lights[3].setPosition(5, 6, -5, 1);

	this.lights[0].setAmbient(0.1, .1, .1, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();
	this.lights[0].setVisible(true);

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	this.lights[1].setVisible(true);


	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable();
	this.lights[2].setVisible(true);


	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0,1.0,1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].enable();
	this.lights[3].setVisible(true);



	this.setGlobalAmbientLight(0,0,0);
	

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
	
	// Ligtht1
	if(this.Light1)
		this.lights[0].enable();
	else 
		this.lights[0].disable();
	
	// Light2
	if(this.Light2)
		this.lights[1].enable();
	else 
		this.lights[1].disable();
	
	// Light3
	if(this.Light3)
		this.lights[2].enable();
	else 
		this.lights[2].disable();
	
	
	// Light4
	if(this.Light4)
		this.lights[3].enable();
	else this.lights[3].disable();

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
		this.translate(8,0,0);
		this.post.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(0,1.5,0);
		this.rotate(90* degToRad, 0, 1, 0);
		this.submarine.display();
	this.popMatrix();


	this.pushMatrix();
	    this.translate(1, 1, 0);
	    this.torpedo.display();
	this.popMatrix();

	this.pushMatrix();
	    this.translate(0, 0.5, 0);
	    this.targets[0].display();
	this.popMatrix();

	this.pushMatrix();
	    this.translate(0, 0.5, 0);
	    this.targets[1].display();
	this.popMatrix();

	this.pushMatrix();
	    this.translate(0, 0.5, 0);
	    this.targets[2].display();
    this.popMatrix();


};

LightingScene.prototype.update = function(currTime){
	
	this.submarine.setMaterial(this.submarineAppearances[this.Texture]);
	
	if(!this.pause){
		this.post.update(currTime);
		this.submarine.update(currTime);
	}


};



LightingScene.prototype.doSomething = function(){

};
