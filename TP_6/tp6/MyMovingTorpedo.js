function MyMovingTorpedo(scene,material,x,y,z, h_angle, v_angle) {
    CGFobject.call(this, scene);

    this.material =  material;

    this.h_angle = h_angle;
    this.v_angle = v_angle;

    this.x=x;
    this.y=y;
    this.z=z;

    this.torpedo = new MyTorpedo(this.scene,this.material, this.x,this.y,this.z,this.h_angle,this.v_angle);
};

MyMovingTorpedo.prototype = Object.create(CGFobject.prototype);
MyMovingTorpedo.prototype.constructor = MyMovingTorpedo;

MyMovingTorpedo.prototype.display = function() {
    var degToRad = Math.PI / 180.0;

    this.scene.pushMatrix();
        this.scene.translate(this.torpedo.getX(), this.torpedo.getY(), this.torpedo.getZ());
        this.scene.rotate(Math.PI+this.torpedo.getHBezier(), 0, 1, 0);
        this.scene.rotate(this.torpedo.getVBezier(), 1, 0, 0);
        this.torpedo.display();
    this.scene.popMatrix();
};

MyMovingTorpedo.prototype.update = function(currTime) {
    var bool = this.torpedo.update(currTime);

    return bool;
}

MyMovingTorpedo.prototype.getDistance = function() {
	return this.torpedo.getDistance();
}
