/**
 * Created by lh100756 on 2015/7/22.
 */

window.onload = function () {

    doNumberFlow().then(function () {
            console.log('doNumberFlow Over');
        }
    );
};


function doNumberFlow () {

    return new Promise( function (resolve, reject) {

        //开启Three.js渲染器
        var renderer;
        //声明全局变量（对象）
        var stats;
        function initThree() {
            width = document.getElementById('canvas3d').clientWidth;//获取画布「canvas3d」的宽
            height = document.getElementById('canvas3d').clientHeight;//获取画布「canvas3d」的高
            renderer=new THREE.WebGLRenderer({antialias:true});//生成渲染器对象（属性：抗锯齿效果为设置有效）
            renderer.setSize(width, height );//指定渲染器的高宽（和画布框大小一致）
            document.getElementById('canvas3d').appendChild(renderer.domElement);//追加 【canvas】 元素到 【canvas3d】 元素中。
            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            document.getElementById('canvas3d').appendChild(stats.domElement);
        }

        //设置相机
        var camera;
        function initCamera() {
            camera = new THREE.PerspectiveCamera( 45, width / height , 1 , 5000 );//设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
            camera.position.x = 0;//设置相机的位置坐标
            camera.position.y = 50;//设置相机的位置坐标
            camera.position.z = 100;//设置相机的位置坐标
            camera.up.x = 0;//设置相机的上为「x」轴方向
            camera.up.y = 1;//设置相机的上为「y」轴方向
            camera.up.z = 0;//设置相机的上为「z」轴方向
            camera.lookAt( {x:0, y:0, z:0 } );//设置视野的中心坐标
        }
        //设置场景
        var scene;
        function initScene() {
            scene = new THREE.Scene();
        }
        //设置光源
        var light;
        function initLight() {
            light = new THREE.DirectionalLight(0xffffff, 1.0, 0);//设置平行光源
            light.position.set( 200, 200, 200 );//设置光源向量
            scene.add(light);// 追加光源到场景
        }

        var textArray = [];
        function initLetter() {
            var total = 300;
            var xOffset = 30;
            var yOffset = Math.floor(total/xOffset);
            var position;
            var size;
            var lettersCol = ['0', '1'];
            var text;
            for(var i = 0; i < xOffset; i++) {
                for (var j = 0; j < yOffset; j++) {
                    size = Math.random()*20;
                    text = lettersCol[Math.round(Math.random())];
                    if (size > 4) {
                        size = 4;
                    }else if (size < 3) {
                        size = 3;
                    }
                    position = {
                        x: -80 + i*6,
                        y: 30 + j*10,
                        z: 0
                    };
                    initText(text, size, position);
                }

            }
        }


        function initText(text, size, position) {
            var height = 0.5,

                font = "droid sans", // helvetiker, optimer, gentilis, droid sans, droid serif
                weight = "normal", // normal bold
                style = "normal"; // normal italic
            textGeo = new THREE.TextGeometry( text, {

                size: size,
                height: height,

                font: font,
                weight: weight,
                style: style
            });

            textMesh1 = new THREE.Mesh( textGeo, new THREE.MeshLambertMaterial({color: 0xffffff}));

            textMesh1.position.x = position.x;
            textMesh1.position.y = position.y;
            textMesh1.position.z = position.z;
            scene.add(textMesh1);
            textArray.push(textMesh1);
        }

        //执行
        function threeStart() {
            initThree();
            initCamera();
            initScene();
            initLight();
            initLetter();
            getRate();
            animate();
        }

        var rateArray = [];
        function getRate() {
            for (var i = 0; i < textArray.length; i++) {
                var rate = Math.random()*4;
                if (rate > 2.8) {
                    rate = 2.8
                } else if (rate < 2.5) {
                    rate = 2.5;
                }
                rateArray.push(rate);
            }
        }

        function animate() {

            for (var i = 0; i < textArray.length; i++) {
                textArray[i].position.y -= rateArray[i]*0.05;
            }

            if (textArray[i-1].position.y > -100) {
                stats.update();
                renderer.render( scene, camera );
                requestAnimationFrame( animate );
            } else {
                console.log('< -100');
                resolve();
                renderer.clear();
            }

        }


        threeStart();
    });

}

