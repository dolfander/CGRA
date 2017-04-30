
function MySubmarineStructure(scene) {
 CGFobject.call(this,scene);



 this.initBuffers();
};

MySubmarineStructure.prototype = Object.create(CGFobject.prototype);
MySubmarineStructure.prototype.constructor = MySubmarineStructure;

MySubmarineStructure.prototype.initBuffers = function() {
 this.vertices = [
 0.5, 0.3, 0,
 -0.5, 0.3, 0,
 0, 0.3, 2,

 ];

 this.indices = [
 0, 1, 2,
 ];




 this.primitiveType = this.scene.gl.TRIANGLES;
 this.initGLBuffers();
};
