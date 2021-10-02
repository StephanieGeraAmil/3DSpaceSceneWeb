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

const torusgeometry=  new THREE.TorusGeometry(10, 2, 10, 100);
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
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200,50);
//scene.add(lightHelper,gridHelper);


const torus= new THREE.Mesh(torusgeometry,torusmaterial);

torus.position.set(5,0,0)
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
const circlematerial = new THREE.MeshStandardMaterial( { map:photoTexture} );
const circle = new THREE.Mesh( circlegeometry, circlematerial );
scene.add( circle );
circle.position.setX(15);


//combine multiple maps
//moon
const moonTexture= new THREE.TextureLoader().load('moon.jpeg');
const normalTexture= new THREE.TextureLoader().load('normal.jpeg');
const moongeometry = new THREE.SphereGeometry(3,32,32);
const moonmaterial=new THREE.MeshStandardMaterial( { map:moonTexture, normalMap:normalTexture} );
const moon= new THREE.Mesh(moongeometry,moonmaterial);

moon.position.z=30;
moon.position.x=-10;
scene.add(moon);

function moveCamera(){
  //calculate where the user is scrolling to
    const t = document.body.getBoundingClientRect().top; // top of the viewport

    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    circle.rotation.z=t*0.001;

    circle.position.z=t*0.005;
    
    
    camera.position.z= t*-0.01;
    camera.position.x= t*-0.0002;
    camera.position.y= t*-0.0002;

}
document.body.onscroll= moveCamera


function animate() {
  requestAnimationFrame(animate);

  //moving each time we repaint the frame
    torus.rotation.x+=0.01;
    torus.rotation.y+=0.01;
    torus.rotation.z+=0.01;


        
      //rotation/position/scale

    controls.update();

  renderer.render(scene, camera);
}


animate();








