function MyExplosion(scene,x,y,z) {
  CGFobject.call(this, scene);

  this.lastTime = 0;
  this.deltaTime = 0;
  this.startTime = 0;
  this.animationTime = 0;

  this.state='RUN';


  this.explosionAppearance = new CGFappearance(this.scene);
  this.explosionAppearance.loadTexture("../resources/images/target.png");
  this.explosionAppearance.setAmbient(0.8,0.8,0.8,1);
  this.explosionAppearance.setDiffuse(0.3,0.3,0.3,1);
  this.explosionAppearance.setSpecular(0.3,0.3,0.3,1);
  this.explosionAppearance.setShininess(30);

  this.x=x;
  this.y=y;
  this.z=z;
  this.Dx=0;
  this.Dy=0;
  this.Dz=0;

  this.cube = new MyTargetStructure(this.scene, this.scene.blackAppearence);

  this.cube.initBuffers();
};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;

MyExplosion.prototype.display = function() {
  var degToRad = Math.PI / 180.0;
  this.explosionAppearance.apply();

  this.scene.pushMatrix();
  this.scene.translate(this.x+this.Dx, this.y+this.Dy, this.z+this.Dyz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x+this.Dx, this.y-this.Dy, this.z+this.Dyz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x-this.Dx, this.y+this.Dy, this.z-this.Dyz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x-this.Dx, this.y-this.Dy, this.z-this.Dyz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x+this.Dx, this.y+this.Dy, this.z-this.Dyz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x+this.Dx, this.y-this.Dy, this.z-this.Dyz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x-this.Dx, this.y+this.Dy, this.z+this.Dyz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x-this.Dx, this.y-this.Dy, this.z+this.Dyz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x+this.Dx, this.y, this.z);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x-this.Dx, this.y, this.z);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x, this.y, this.z-this.Dz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x, this.y, this.z+this.Dz);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x, this.y-this.Dy, this.z);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x, this.y+this.Dy, this.z);
  this.scene.scale(0.5,0.5,0.5);
  this.cube.display();
  this.scene.popMatrix();
};

MyExplosion.prototype.update = function(currTime) {


  this.deltaTime = this.deltaTime || 0;
  this.deltaTime = currTime - this.lastTime;
  this.lastTime = currTime;
  var perSecond = (this.deltaTime / (1000));
  this.animationTime = this.animationTime || 0;

  if (perSecond > 1)
  perSecond = 0;

  this.animationTime+=perSecond;


  if(this.animationTime<0.2){
    this.Dx+=perSecond*10;
    this.Dy+=perSecond*10;
    this.Dz+=perSecond*10;
  }
  else
  this.state='STOP';

  return this.animationTime;

}

MyExplosion.prototype.getState = function(){
  return this.state;
}
