function MyTorpedo(scene, material) {
    CGFobject.call(this, scene);

    this.material = material;

    this.cylinder = new MyCylinder(this.scene, 50, 1);
    this.semi_sphere = new MySemiSphere(this.scene, 50, 19);
    this.trapezius = new MyTrapezius(this.scene, 2.5, 1.5, 0.3);
 

    this.glassAppearence = new CGFappearance(this.scene);
    this.glassAppearence.setAmbient(0.3, 0.3, 0.3, 1);
    this.glassAppearence.setDiffuse(0.9, 0.9, 0.9, 1);
    this.glassAppearence.setSpecular(0.1, 0.1, 0.1, 1);
    this.glassAppearence.setShininess(10);
    this.glassAppearence.loadTexture("../resources/images/glass.jpg");

    this.initBuffers();
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;


MyTorpedo.prototype.display = function () {

    this.material.apply();

    this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 2);
        this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0, 0, 2);
        this.scene.scale(0.1, 0.1, 0.1);
        this.semi_sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.semi_sphere.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
        this.scene.scale(0.15, 0.1, 0.2);
        this.scene.translate(-1.23, -0.15, 0);
        this.trapezius.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
        this.scene.rotate(90 * degToRad, 0, 0, 1);
        this.scene.scale(0.15, 0.1, 0.2);
        this.scene.translate(-1.23, -0.15, 0);
        this.trapezius.display();
    this.scene.popMatrix();





};

MyTorpedo.prototype.setMaterial = function (material) {
    this.material = material;
}

