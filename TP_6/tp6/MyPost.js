function MyPost(scene) {
	CGFobject.call(this,scene);

	this.post  = new MyCylinder(this.scene,50,1);
	this.clock = new MyClock(this.scene);




};

MyPost.prototype = Object.create(CGFobject.prototype);

MyPost.prototype.constructor= MyPost;


MyPost.prototype.display= function () {

  this.scene.pushMatrix();
    this.scene.rotate(270 * degToRad, 1, 0, 0);
		this.scene.scale(0.04,0.04,3);
		this.scene.metalAppearence.apply();
    this.post.display();
  this.scene.popMatrix();

this.scene.pushMatrix();
	this.scene.scale(0.25,0.25,0.1);
	this.scene.translate(0,11.01,-0.5);
	this.clock.display();
this.scene.popMatrix();

	this.scene.materialDefault.apply();

};

MyPost.prototype.update = function(currTime){
	this.clock.update(currTime);

};
