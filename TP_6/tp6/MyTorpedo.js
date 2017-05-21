function MyTorpedo(scene, material,x,y,z, h_angle, v_angle) {
    CGFobject.call(this, scene);

    this.material = material;

    this.deltaTime=0;
  	this.lastTime=0;
  	this.t = 0;

  	this.x = x;
  	this.y = y-0.85;
  	this.z = z-0.6;

  	this.init_x=this.x;
  	this.init_y=this.y;
  	this.init_z=this.z;

  	this.h_angle = h_angle;
  	this.v_angle = v_angle;

  	this.h_bezier = h_angle-Math.PI;
  	this.v_bezier = v_angle;
  	this.diferenca = {x : 0, y : 0 , z : 0 };


    this.cylinder = new MyCylinder(this.scene, 50, 1);
    this.semi_sphere = new MySemiSphere(this.scene, 50, 19);
    this.trapezius = new MyTrapezius(this.scene, 2.5, 1.5, 0.3);

    this.glassAppearence = new CGFappearance(this.scene);
    this.glassAppearence.setAmbient(0.3, 0.3, 0.3, 1);
    this.glassAppearence.setDiffuse(0.9, 0.9, 0.9, 1);
    this.glassAppearence.setSpecular(0.1, 0.1, 0.1, 1);
    this.glassAppearence.setShininess(10);
    this.glassAppearence.loadTexture("../resources/images/glass.jpg");

    this.target = this.scene.getTarget();
    this.targetExploded = false;


    this.distance = Math.sqrt( Math.pow((this.target.getX()-this.x),2) + Math.pow((this.target.getY()-this.y),2) + Math.pow((this.target.getZ()-this.z),2));

    this.initBuffers();
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;


MyTorpedo.prototype.display = function () {

    this.material.apply();

    this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 2);
        this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 2);
    this.scene.scale(0.1, 0.1, 0.1);
    this.semi_sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(180 * degToRad, 0, 1, 0);
    this.scene.scale(0.1, 0.1, 0.1);
    this.semi_sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(0.15, 0.1, 0.2);
    this.scene.translate(-1.23, -0.15, 0);
    this.trapezius.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(90 * degToRad, 0, 0, 1);
    this.scene.scale(0.15, 0.1, 0.2);
    this.scene.translate(-1.23, -0.15, 0);
    this.trapezius.display();
    this.scene.popMatrix();


};

MyTorpedo.prototype.setMaterial = function (material) {
    this.material = material;
}

MyTorpedo.prototype.bezier = function(t){
	//funcao que retorna uma estrutura com as coordenadas de uma curva Bezier, dados t e os 4 pontos

	var p1 = { x: this.init_x, y: this.init_y, z: this.init_z};
	var p2 = { x: this.init_x+6*Math.cos(this.v_angle)*Math.sin(this.h_angle) , y: this.init_y-6*Math.sin (this.v_angle), z: this.init_z+6*Math.cos(this.v_angle)*Math.cos(this.h_angle)};
	var p3 = { x: this.target.x, y: this.target.y+3, z: this.target.z};
	var p4 = { x: this.target.x, y: this.target.y, z: this.target.z};

	var x = (p1.x * Math.pow((1-t),3)) + (p2.x* 3*t*Math.pow((1-t),2) + (p3.x * 3 * Math.pow(t,2)*(1-t))+(p4.x * Math.pow(t,3)));
	var y = (p1.y * Math.pow((1-t),3)) + (p2.y* 3*t*Math.pow((1-t),2) + (p3.y * 3 * Math.pow(t,2)*(1-t))+(p4.y * Math.pow(t,3)));
	var z = (p1.z * Math.pow((1-t),3)) + (p2.z* 3*t*Math.pow((1-t),2) + (p3.z * 3 * Math.pow(t,2)*(1-t))+(p4.z * Math.pow(t,3)));

	return {x: x, y: y, z: z};
}


MyTorpedo.prototype.update= function(currTime){

	this.deltaTime = this.deltaTime||0;
	this.deltaTime = currTime-this.lastTime;
	this.lastTime = currTime;
	var perSecond = (this.deltaTime/(60*1000));


	if(perSecond>1)
		perSecond=0;

	var deg2rad=Math.PI/180.0;

	var antes = {x : this.x, y : this.y, z :this.z};

	/* DeltaTime - Error handling */

	if(this.deltaTime==0 || this.deltaTime > 1000000)
		this.deltaTime=this.scene.getUpdatePeriod();

		this.t +=  1/(1000/this.deltaTime * this.distance);

	/* */

	var result = this.bezier(this.t);

	var depois = {x: result.x, y : result.y, z: result.z};

	this.diferenca = {x : (antes.x-depois.x), y: (antes.y-depois.y), z: (antes.z-depois.z)};

	this.h_bezier = Math.atan2(this.diferenca.x, this.diferenca.z);
	this.v_bezier = Math.atan2(Math.abs(this.diferenca.y), Math.abs(this.diferenca.z));

	if (this.t < 0.75) {
		this.x = result.x;
		this.y = result.y;
		this.z = result.z;
	}

	if (this.t > 0.75)
		this.targetExploded = true;

	return this.targetExploded;
}

MyTorpedo.prototype.setState= function(state){
	this.state=state;
}

MyTorpedo.prototype.getX = function() {
	return this.x;
}

MyTorpedo.prototype.getY = function() {
	return this.y;
}

MyTorpedo.prototype.getZ = function() {
	return this.z;
}

MyTorpedo.prototype.getHBezier = function() {
	return this.h_bezier;
}

MyTorpedo.prototype.getVBezier = function() {
	return this.v_bezier;
}

MyTorpedo.prototype.getDistance = function() {
	return this.distance;
}
