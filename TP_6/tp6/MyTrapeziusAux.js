function MyTrapeziusAux(scene) {
	CGFobject.call(this,scene);

	
	this.initBuffers();
};

MyTrapeziusAux.prototype = Object.create(CGFobject.prototype);
MyTrapeziusAux.prototype.constructor=MyTrapeziusAux;

MyTrapeziusAux.prototype.initBuffers = function () {
	this.vertices = [
            0,-0.5,1,
			1,-0.5,0,
			0,-0.5,0,
			0,-0.5,1,
			1,-0.5,0,
			1,0.5,0,
			0,0.5,1,
			0,0.5,1,
			1,0.5,0,
			0,0.5,0
			];

	this.indices = [
			2, 1, 0,
			3,4,5,
			3,5,6,
			7,8,9
		
        ];

    this.normals = [
          0, -1, 0,
          0, -1, 0,
          0, -1, 0,
		  1,0,1,
		  1,0,1,
		  1,0,1,
		  1,0,1,
		  0,1,0,
		  0,1,0,
		  0,1,0
		  

    ];
	
	this.texCoords = [];
	
	for (var a = 0; a <= 10; a++){
	this.texCoords.push(0);
	this.texCoords.push(1);
	}

   
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};