import * as THREE from 'three';
import cellphoneJSON from './Cellphone.json';
import celphone from './Celphone.json';

let camera, scene, renderer;
let loader, cellphone;


init({
  width: window.innerWidth,
  height: window.innerHeight,
  anchor: document.getElementById('my-canvas')
});

function load_phone(callback){
  loader.load(cellphoneJSON, function onLoad(object) {
    console.log(object);
    scene = object;
    cellphone = object.getObjectByName('Celphone');
    camera = object.getObjectByName('Camera');
    // camera.position.set(0,0,);
    console.log(object.getObjectByName('Screen'));
  
    let jsonLoader = new THREE.JSONLoader();
    jsonLoader.load(celphone, (geo, mat) => {
      let mesh = new THREE.Mesh(geo, mat);
      cellphone.material = mat;
      cellphone.material[0].shininess = 7;
      console.log(mesh);
      callback();
    });
    
    
  }, function onProgress(p){
    console.log('Loading Cellphone:',p);
  }, function onError(e){
    console.log('Error Loading Cellphone:',e);
  })
}

function init({width, height, anchor, callback}) {
  
  // RENDERING
  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true} );
  // renderer.setClearColor( 0x00000000, 0);
  renderer.setSize( width, height );
  anchor.appendChild( renderer.domElement );
  
  // MODEL
  loader = new THREE.ObjectLoader();
  load_phone(animate);
}

function animate() {
  
  requestAnimationFrame( animate );
  
  cellphone.rotation.x += 0.005;
  cellphone.rotation.y += 0.01;
  
  renderer.render( scene , camera );
  
}
