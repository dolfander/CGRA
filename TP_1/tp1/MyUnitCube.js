
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
        0.5,-0.5,-0.5,
        0.5,0.5,-0.5,
        0.5,0.5,0.5,
        0.5,-0.5,0.5,
        
        -0.5,-0.5,-0.5,
        -0.5,0.5,-0.5,
        -0.5,0.5,0.5,
        -0.5,-0.5,0.5,
			];

	this.indices = [
		0,1,2,
		0,2,3,
		1,5,6,
		1,6,2,
		2,6,7,
		2,7,3,
		1,5,4,
		1,4,0,
		4,5,6,
		4,6,7,
		0,4,3,
		4,7,3
		
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};