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
		this.scene.scale(0.06,0.06,4.8);
		this.scene.metalAppearence.apply();
    this.post.display();
  this.scene.popMatrix();

this.scene.pushMatrix();
this.scene.translate(0,5,-0.1);
	this.scene.scale(0.4,0.4,0.2);
	
	this.clock.display();
this.scene.popMatrix();

	this.scene.materialDefault.apply();

};

MyPost.prototype.update = function(currTime){
	this.clock.update(currTime);

};
