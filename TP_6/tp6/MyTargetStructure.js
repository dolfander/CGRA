function MyTargetStructure(scene, material) {
    CGFobject.call(this, scene);

    this.cylinder = new MyCylinder(this.scene, 50, 1);
    this.front = new MyClockSurface(this.scene, 100);
    this.back = new MyClockSurface(this.scene, 100);

    this.material = material;
    this.rotationAngle = 0;

    this.targetAppearence = new CGFappearance(this.scene);
    this.targetAppearence.setAmbient(0.3, 0.3, 0.3, 1);
    this.targetAppearence.setDiffuse(0.8, 0.8, 0.8, 1);
    this.targetAppearence.setSpecular(0.1, 0.1, 0.1, 1);
    this.targetAppearence.setShininess(10);
    this.targetAppearence.loadTexture("../resources/images/target.png");

    this.initBuffers();
};

MyTargetStructure.prototype = Object.create(CGFobject.prototype);
MyTargetStructure.prototype.constructor = MyTargetStructure;


MyTargetStructure.prototype.display = function () {

    this.material.apply();

    this.scene.pushMatrix();
    this.scene.scale(0.5, 0.5, 0.5);
    this.scene.translate(0, 0, -2);
    this.cylinder.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.scale(0.5, 0.5, 0.5);
    this.scene.translate(0, 0, -1);
    this.targetAppearence.apply();
    this.front.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.rotate(180 * degToRad, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.scene.translate(0, 0, 2);
    this.targetAppearence.apply();
    this.back.display();
    this.scene.popMatrix();


}

MyTargetStructure.prototype.setMaterial = function (material) {
    this.material = material;
}
