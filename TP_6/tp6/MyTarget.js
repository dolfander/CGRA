
/**
* MyTarget
* @constructor
*/


function MyTarget(scene, material) {
  CGFobject.call(this, scene);

  this.x = Math.floor((Math.random() * 10) -5 );
  this.y = 0.5;
  this.z = Math.floor((Math.random() * - 10) + 3);

  var inTarget = false;

  this.material = material;

  this.structure = new MyTargetStructure(this.scene, this.material);

  this.targetAppearence = new CGFappearance(this.scene);
  this.targetAppearence.setAmbient(0.3, 0.3, 0.3, 1);
  this.targetAppearence.setDiffuse(0.8, 0.8, 0.8, 1);
  this.targetAppearence.setSpecular(0.1, 0.1, 0.1, 1);
  this.targetAppearence.setShininess(10);
  this.targetAppearence.loadTexture("../resources/images/target.png");


  this.initBuffers();
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;


MyTarget.prototype.display = function () {

  this.scene.pushMatrix();

  this.scene.translate(this.x, this.y, this.z);
  this.structure.display();

  this.scene.popMatrix();


};

MyTarget.prototype.setMaterial = function (material) {
  this.material = material;
}


MyTarget.prototype.getX = function () {
  return this.x;
}

MyTarget.prototype.getY = function () {
  return this.y;
}

MyTarget.prototype.getZ = function () {
  return this.z;
}
