var degToRad = Math.PI / 180.0;

var	FLOOR_WIDTH =30;
var FLOOR_HEIGHT = 30;



function LightingScene() {
	CGFscene.call(this);

	this.targets = new Array();
	this.target1;
	this.updatePeriod = 0;

	this.torpedo_appear;
	this.targetExploded;

}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.getTarget = function() {

		var target = this.targets.shift();

		this.toExplode = target;
		this.targets.push(new MyTarget(this, this.blackAppearence));

    return target;
}

//Activated on pressing 'F' or 'f'
LightingScene.prototype.deployTorpedo = function() {
    this.targetExploded = false;

    if(this.torpedo_appear == false)
        this.torpedo_appear = true;
    else
        if (this.torpedo_appear == true)
            this.torpedo_appear = false;

    this.torpedo = new MyMovingTorpedo(this, this.blackAppearence,this.submarine.getZ(),this.submarine.getY(),-(this.submarine.getX()), this.submarine.getH_angle(), this.submarine.getV_angle());

		//this.torpedo = new MyMovingTorpedo(this, this.blackAppearence,3,5,-7, this.submarine.getH_angle(), this.submarine.getV_angle());


    if(String(this.toExplode) != "undefined")
        this.targetExplosion = new MyExplosion(this, this.toExplode.getX(), this.toExplode.getY(), this.toExplode.getZ());
  }


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

	this.torpedo_appear = false;
	this.targetExploded = false;

	this.updatePeriod=50;
	this.setUpdatePeriod(this.updatePeriod);

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
	this.trippyAppearence.setDiffuse(0.4,0.4,0.4,1);
	this.trippyAppearence.setSpecular(0.1,0.1,0.1,1);
	this.trippyAppearence.setShininess(10);
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

	//this.torpedo = new MyTorpedo(this, this.metalAppearence,0,0,0,0,0); //testing

  this.target1 = new MyTarget(this, this.blackAppearence);
	this.targets.push(this.target1);
	this.target2 = new MyTarget(this, this.blackAppearence);
	this.targets.push(this.target2);
	this.target3 = new MyTarget(this, this.blackAppearence);
	this.targets.push(this.target3);


	this.explosion = new MyExplosion(this, 2, 2 , 3);

	//this.targets = [target1, target2, target3]; // array


	this.setUpdatePeriod(20);

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);



	// Positions for four lights
	this.lights[0].setPosition(-5, 15, 5, 1);
	this.lights[1].setPosition(-5, 15, -5, 1.0);
	this.lights[2].setPosition(5, 15, 5, 1.0);
	this.lights[3].setPosition(5, 15, -5, 1);

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

	if (this.targetExploded == true)
 		if(this.targetExplosion.getState()=='RUN')
 		{
 				this.targetExplosion.display();
 				this.torpedo_appear = false;
 		}

 if(this.torpedo_appear == true)
 		this.torpedo.display();


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



//this.explosion.display();

if(this.targetExploded == false)
		if(String(this.toExplode) != "undefined")
				this.toExplode.display();


for(i = 0; i < this.targets.length; i++){
	this.targets[i].display();
}

};

LightingScene.prototype.update = function(currTime){

	this.submarine.setMaterial(this.submarineAppearances[this.Texture]);

	if(!this.pause){
		this.post.update(currTime);
		this.submarine.update(currTime);


		if(this.torpedo_appear == true)
			this.targetExploded =  this.torpedo.update(currTime,this.submarine.getX(),this.submarine.getY(),this.submarine.getZ());

			if(this.targetExploded == true){
					this.animationTime = this.targetExplosion.update(currTime);}


	}


};

LightingScene.prototype.getUpdatePeriod = function() {
    return this.updatePeriod;
}

LightingScene.prototype.doSomething = function(){

};
