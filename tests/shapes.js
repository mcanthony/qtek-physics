define(function(require) {

    var Engine = require('Engine');
    var Collider = require('Collider');
    var RigidBody = require('RigidBody');
    var BoxShape = require('BoxShape');
    var SphereShape = require('SphereShape');
    var CylinderShape = require('CylinderShape');
    var CapsuleShape = require('CapsuleShape');
    var ConeShape = require('ConeShape');
    var ConvexTriangleMeshShape = require('ConvexTriangleMeshShape');
    var BvhTriangleMeshShape = require('BvhTriangleMeshShape');
    var ConvexHullShape = require('ConvexHullShape');
    var StaticPlaneShape = require('StaticPlaneShape');
    var PhysicsMaterial = require("Material");

    var qtek = require('qtek/qtek');

    var engine = new Engine({
        workerUrl : '../src/AmmoEngineWorker'
    });
    var renderer = new qtek.Renderer({
        canvas : document.getElementById('Main')
    });
    renderer.resize(window.innerWidth, window.innerHeight);
    
    var animation = new qtek.animation.Animation();
    animation.start();
    
    var scene = new qtek.Scene();
    var camera = new qtek.camera.Perspective({
        aspect : renderer.width / renderer.height
    });
    camera.position.set(0, 10, 30);
    camera.lookAt(qtek.math.Vector3.ZERO);

    var light = new qtek.light.Directional();
    light.position.set(1, 2, 1);
    light.lookAt(qtek.math.Vector3.ZERO);
    scene.add(light);
    scene.add(new qtek.light.Ambient({intensity : 0.1}));

    var planeMesh = new qtek.Mesh({
        material : new qtek.Material({
            shader : qtek.shader.library.get('buildin.physical')
        }),
        geometry : new qtek.geometry.Plane(),
        scale : new qtek.math.Vector3(100, 100, 1)
    });
    planeMesh.material.set('glossiness', 0.2);
    planeMesh.rotation.rotateX(-Math.PI / 2);


    var floorBody = new RigidBody({
        shape : new StaticPlaneShape()
    });
    engine.addCollider(new Collider({
        rigidBody : floorBody,
        material : new PhysicsMaterial(),
        node : planeMesh,
        isStatic : true
    }));
    // scene.add(planeMesh);
    
    /****************************
                  Cube
     ****************************/
    var cubeGeo = new qtek.geometry.Cube();
    for (var i = 0; i < 50; i++) {
        
        var cubeMesh = new qtek.Mesh({
            geometry : cubeGeo,
            material : new qtek.Material({
                shader : qtek.shader.library.get('buildin.physical')
            }),
            position : new qtek.math.Vector3(20 - Math.random() * 40, Math.random() * 40, 20 - Math.random() * 40)
        });
        cubeMesh.material.set('color', [Math.random(), Math.random(), Math.random()]);
        scene.add(cubeMesh);

        var cubeBody = new RigidBody({
            shape : new BoxShape({
                halfExtents : new qtek.math.Vector3(1, 1, 1)
            }),
            mass : 1
        });

        engine.addCollider(new Collider({
            rigidBody : cubeBody,
            material : new PhysicsMaterial(),
            node : cubeMesh
        }));
    }


    /****************************
                  Sphere
     ****************************/
    var sphereGeo = new qtek.geometry.Sphere({
        widthSegments : 50,
        heightSegments : 50
    });
    for (var i = 0; i < 50; i++) {
        
        var sphereMesh = new qtek.Mesh({
            geometry : sphereGeo,
            material : new qtek.Material({
                shader : qtek.shader.library.get('buildin.physical')
            }),
            position : new qtek.math.Vector3(20 - Math.random() * 40, Math.random() * 40, 20 - Math.random() * 40)
        });
        sphereMesh.material.set('color', [Math.random(), Math.random(), Math.random()]);
        scene.add(sphereMesh);

        var sphereBody = new RigidBody({
            shape : new SphereShape({
                radius : 1
            }),
            mass : 1
        });

        engine.addCollider(new Collider({
            rigidBody : sphereBody,
            material : new PhysicsMaterial({
                friction : 0.9
            }),
            node : sphereMesh
        }));
    }


    /****************************
                  Cylinder
     ****************************/
    var cylinderGeo = new qtek.geometry.Cylinder({
        heightSegments : 10,
        capSegments : 40
    });
    for (var i = 0; i < 50; i++) {
        
        var cylinderMesh = new qtek.Mesh({
            geometry : cylinderGeo,
            material : new qtek.Material({
                shader : qtek.shader.library.get('buildin.physical')
            }),
            position : new qtek.math.Vector3(20 - Math.random() * 40, Math.random() * 40, 20 - Math.random() * 40)
        });
        cylinderMesh.material.set('color', [Math.random(), Math.random(), Math.random()]);
        scene.add(cylinderMesh);

        var cylinderBody = new RigidBody({
            shape : new CylinderShape(),
            mass : 1
        });

        engine.addCollider(new Collider({
            rigidBody : cylinderBody,
            material : new PhysicsMaterial({
                friction : 0.9
            }),
            node : cylinderMesh
        }));
    }

    /****************************
                Convex Mesh
     ****************************/
    var convexGeo = new qtek.geometry.Sphere({
        widthSegments : 4,
        heightSegments : 4
    });

    for (var i = 0; i < 50; i++) {
        
        var convexMesh = new qtek.Mesh({
            geometry : convexGeo,
            material : new qtek.Material({
                shader : qtek.shader.library.get('buildin.physical')
            }),
            position : new qtek.math.Vector3(20 - Math.random() * 40, Math.random() * 40, 20 - Math.random() * 40)
        });
        convexMesh.material.set('color', [Math.random(), Math.random(), Math.random()]);
        scene.add(convexMesh);

        var convexBody = new RigidBody({
            shape : new ConvexTriangleMeshShape({
                geometry : convexGeo
            }),
            mass : 1
        });

        engine.addCollider(new Collider({
            rigidBody : convexBody,
            material : new PhysicsMaterial({
                friction : 0.9
            }),
            node : convexMesh
        }));
    }

    /****************************
                Convex Hull
     ****************************/
    var convexHullGeo = new qtek.geometry.Cone({
        capSegments : 5
    });

    for (var i = 0; i < 50; i++) {
        
        var convexHullMesh = new qtek.Mesh({
            geometry : convexHullGeo,
            material : new qtek.Material({
                shader : qtek.shader.library.get('buildin.physical')
            }),
            position : new qtek.math.Vector3(20 - Math.random() * 40, Math.random() * 40, 20 - Math.random() * 40)
        });
        convexHullMesh.material.set('color', [Math.random(), Math.random(), Math.random()]);
        scene.add(convexHullMesh);

        var convexBody = new RigidBody({
            shape : new ConvexHullShape({
                geometry : convexHullGeo
            }),
            mass : 1
        });

        engine.addCollider(new Collider({
            rigidBody : convexBody,
            material : new PhysicsMaterial({
                friction : 0.9
            }),
            node : convexHullMesh
        }));
    }

    /****************************
            BVH Mesh
     ****************************/
    var loader = new qtek.loader.GLTF();
    loader.load('assets/env_stealth_collision.json');
    loader.success(function(res) {
        var _scene = res.scene;
        var geo = _scene.getNode('env_stealth_collision').geometry;
        var scaleMat = new qtek.math.Matrix4();
        scaleMat.scale(new qtek.math.Vector3(3, 3, 3));
        geo.applyTransform(scaleMat);

        var mesh = new qtek.Mesh({
            geometry : geo,
            culling : false,
            material : new qtek.Material({
                shader : qtek.shader.library.get('buildin.physical')
            })
        });
        mesh.position.set(-40, 0, -30);
        mesh.material.set('glossiness', 0.2);

        var body = new RigidBody({
            shape : new BvhTriangleMeshShape({
                geometry : geo
            }),
            mass : 1
        });

        engine.addCollider(new Collider({
            rigidBody : body,
            material : new PhysicsMaterial({
                friction : 0.9
            }),
            isStatic : true,
            node : mesh
        }));
        scene.add(mesh);
    });

    var control = new qtek.plugin.OrbitControl({
        target : camera,
        domElement : renderer.canvas
    });
    animation.on('frame', function(dTime) {
        control.update(dTime);
        engine.step(dTime / 1000, Math.ceil(dTime / 1000 * 120), 1 / 120);
        renderer.render(scene, camera);
    });
});