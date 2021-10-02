import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
//for moving around using our mouse

const scene=new THREE.Scene();
//scene->container
const camera= new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight , 0.1 , 1000)
//in a perspective camera we pass the arguments(field of view, aspect ratio, view frustrum)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
//render needs to know wich DOM element to use
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(30);
renderer.render(scene,camera);


//creating objects
//geometry-> vectors that define the object
//texture-> wrapping paper 

const torusgeometry=  new THREE.TorusGeometry(10, 3, 16, 100);
//const torusmaterial= new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe:true});
//basci material  doesnt require light
const torusmaterial= new THREE.MeshStandardMaterial({ color: 0x00ff00});
//needs light
const pointLight=new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

//adding an ambient light
const ambientLight=new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);
//using helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper);


const torus= new THREE.Mesh(torusgeometry,torusmaterial);
scene.add( torus );




const controls= new OrbitControls(camera, renderer.domElement);
//listen to dom events on the mouse and update the camera position acordingly


///generating stars
function addStar() {
  const stargeometry=new THREE.SphereGeometry (0.25, 24,24);
  const starmaterial= new THREE.MeshStandardMaterial({color:0xffffff});
  const star= new THREE.Mesh(stargeometry,starmaterial);
  const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z);
  scene.add(star);

}
Array(200).fill().forEach(addStar);

//adding space background
const spaceTexture= new THREE.TextureLoader().load('space.jpeg');
//it is posible to add a callback to been notify when the image is done loading
scene.background=spaceTexture;

//texture map- maping 2d pictures to a 3d object
const circlegeometry = new THREE.CircleGeometry( 5, 32 );
const photoTexture = new THREE.TextureLoader().load('Group 1.png');
const circlematerial = new THREE.MeshBasicMaterial( { map:photoTexture} );
const circle = new THREE.Mesh( circlegeometry, circlematerial );
scene.add( circle );
circle.position.setX(15);
circle.position.setY(15);

//combine multiple maps


function animate() {
  requestAnimationFrame(animate);

  //moving each time we repaint the frame
  torus.rotation.x+=0.01;
    torus.rotation.y+=0.01;
      torus.rotation.z+=0.01;


      circle.rotation.x+=0.01;
    circle.rotation.y+=0.01;
      
      circle.position.x-=0.01;
        circle.position.z-=0.01;
        
      //rotation/position/scale

      controls.update();

  renderer.render(scene, camera);
}


animate();











// import './style.css';
// import * as THREE from 'three';


// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector('#bg')
// });

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(40);
// camera.position.setX(-5);

// renderer.render(scene, camera);

// // Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0x007999 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// // Lights

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);

// //stars
// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(100));

//   star.position.set(x, y, z);
//   scene.add(star);
// }

// Array(200).fill().forEach(addStar);

// // Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
// scene.background = spaceTexture;

// // Cube

// const cubeTexture = new THREE.TextureLoader().load('Group 1.png');

// const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: cubeTexture }));

// scene.add(cube);

// // Moon

// const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpeg');

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: normalTexture,
//   })
// );

// scene.add(moon);

// moon.position.z = 30;
// moon.position.setX(-10);

// cube.position.z = -5;
// cube.position.x = 2;

// // Scroll Animation

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.05;
//   moon.rotation.y += 0.075;
//   moon.rotation.z += 0.05;

//   cube.rotation.y += 0.01;
//   cube.rotation.z += 0.01;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.rotation.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();

// // Animation Loop

// function animate() {
//   requestAnimationFrame(animate);

//   torus.rotation.x += 0.01;
//   torus.rotation.y += 0.005;
//   torus.rotation.z += 0.01;

//   moon.rotation.x += 0.005;
//   renderer.render(scene, camera);
// }

// animate();