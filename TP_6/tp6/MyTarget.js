function MyTarget(scene, material) {
    CGFobject.call(this, scene);

    this.x = 2;
    this.y = 2;
    this.z = 0;

    this.material = material;

    this.cylinder = new MyCylinder(this.scene, 50, 1);
    this.front = new MyClockSurface(this.scene, 100);
    this.back = new MyClockSurface(this.scene, 100);

    this.glassAppearence = new CGFappearance(this.scene);
    this.glassAppearence.setAmbient(0.3, 0.3, 0.3, 1);
    this.glassAppearence.setDiffuse(0.9, 0.9, 0.9, 1);
    this.glassAppearence.setSpecular(0.1, 0.1, 0.1, 1);
    this.glassAppearence.setShininess(10);
    this.glassAppearence.loadTexture("../resources/images/glass.jpg");

    this.initBuffers();
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;


MyTarget.prototype.display = function () {

    this.material.apply();

    this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(0, 0, -2);
        this.cylinder.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(0, 0, -1);
        this.front.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(0, 0, 2);
        this.back.display();
    this.scene.popMatrix();


};

MyTarget.prototype.setMaterial = function (material) {
    this.material = material;
}

