/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

function MyQuad(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	if(typeof minS == 'undefined') {
		this.minS = 0;
	} else {
		this.minS = minS;
	}

	if(typeof maxS == 'undefined') {
		this.maxS = 1;
	} else {
		this.maxS = maxS;
	}

	if(typeof minT == 'undefined') {
		this.minT = 0;
	} else {
		this.minT = minT;
	}

	if(typeof maxT == 'undefined') {
		this.maxT = 1;
	} else {
		this.maxT = maxT;	
	}

	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0.5,	//0
            -0.5, 0.5, 0.5,		//1
            0.5, -0.5, 0.5,		//2
            0.5, 0.5, 0.5		//3
			];

	this.indices = [
			2, 1, 0,
			3, 1, 2
        ];

    this.normals = [
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          0, 0, 1

    ];

    this.texCoords = [
    	this.minS, this.maxT,
    	this.minS, this.minT,
    	this.maxS, this.maxT,
    	this.maxS, this.minT
    ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};