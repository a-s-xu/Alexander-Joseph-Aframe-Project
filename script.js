//Defining Enviornment 
let enviornment = [
  "------------------------------------------",
  "--------------------------------------",
  "----------------------------------------",
  "------------------------------------------",
  "-----------------------------------------",
  "-----T---------------------------------",
  "-----------------------------------------",
  "-----------------------------------------",
  "---------------------------------------",
  "---------------------------------------",
  "--------------------T--------------------",
  "-----------------------------------------",
  "------R----------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "-----------------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "-----------------------R----------------",
  "-----------------------------------------",      
  "----------------------------------------",
  "-----------------------------------------",
  "-----------------------------------------",
  "----------------------------------------",
  "---------------------------------R------",
  "----------------------------------------",
  "-----------------------------------------",
  "-----------------------------------------",
  "--------------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "-----------------------------------------",     
  "----------------------------------------",
  "-----------------------------------------",
  "------R-----------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "----------------------------------------",
  "----------------------------------T-------",
];
//Defining Enviornment end

//Camera function
let rnd = (l,u) => Math.random()*(u-l)+l;
let scene, camera;
window.onload = function(){
  scene = document.querySelector("a-scene");
  camera = new Player("a-camera");
//Camera function

//Appending Environment
  scene = document.querySelector("a-scene");
  for(let r = 0; r < enviornment.length; r++){
    let row = enviornment[r];
    let cols = row.split("");
    for(let c = 0; c < cols.length; c++){
      if(cols[c] == "T"){
        new tree(c,0,r);
      }else if(cols[c]=="R"){
        new grass(c,0,r);
      }
    }

  }

  setTimeout(loop,0);//loop();
}
//Appending Enviroment end

//click function
let raycaster = new THREE.Raycaster();
raycaster.far = 1000;

let modelsPlaced = {
  gem: false,
  tablet: false,
  eye: false,
  dynamite: false,
};

window.addEventListener('mousedown', (event) => {
  if (event.button === 0) {
    let cameraEl = document.querySelector('a-camera');
    let sceneEl = document.querySelector('a-scene');
    let cameraObj = cameraEl.object3D;
    let direction = new THREE.Vector3();
    cameraObj.getWorldDirection(direction);
    direction.multiplyScalar(-1);
    raycaster.set(cameraObj.position, direction);

    let clickableObjects = sceneEl.querySelectorAll('[clickable]');
    let clickableMeshes = Array.from(clickableObjects).map(obj => obj.object3D);
    let intersects = raycaster.intersectObjects(clickableMeshes, true);

    if (intersects.length > 0) {
      let clickedObj = intersects[0].object.el;
      console.log('Clicked on:', clickedObj);

      
      clickedObj.setAttribute('visible', false);

      
      clickedObj.removeAttribute('clickable');

      
      if (clickedObj.id === 'collectible-box') {
        let gemModel = document.createElement('a-gltf-model');
        gemModel.setAttribute('src', '#gem');
        gemModel.setAttribute('scale', '5 5 5');
        gemModel.setAttribute('animation-mixer', '');
        document.querySelector('#position1').appendChild(gemModel);
        modelsPlaced.gem = true;
      }
      else if (clickedObj.id === 'tablet-box') {
        let tabletModel = document.createElement('a-gltf-model');
        tabletModel.setAttribute('src', '#tablet');
        tabletModel.setAttribute('animation-mixer', '');
        document.querySelector('#position2').appendChild(tabletModel);
        modelsPlaced.tablet = true;
      }
      else if (clickedObj.id === 'eye-box') {
        let eyeModel = document.createElement('a-gltf-model');
        eyeModel.setAttribute('src', '#eye');
        eyeModel.setAttribute('scale', '0.1 0.1 0.1');
        eyeModel.setAttribute('animation-mixer', '');
        document.querySelector('#position3').appendChild(eyeModel);
        modelsPlaced.eye = true;
      }
      else if (clickedObj.id === 'dynamite-box') {
        let dynamiteModel = document.createElement('a-gltf-model');
        dynamiteModel.setAttribute('src', '#dynamite');
        dynamiteModel.setAttribute('scale', '.1 .1 .1');
        dynamiteModel.setAttribute('animation-mixer', '');
        dynamiteModel.setAttribute('data-dynamite', 'true'); 
        dynamiteModel.setAttribute('clickable', true); 
        document.querySelector('#position4').appendChild(dynamiteModel);
        modelsPlaced.dynamite = true;
      }

      
      if (modelsPlaced.gem && modelsPlaced.tablet && modelsPlaced.eye) {
        let blackout = document.createElement('a-plane');
        blackout.setAttribute('width', '16');
        blackout.setAttribute('height', '9');
        blackout.setAttribute('color', 'black');
        blackout.setAttribute('opacity', '1');
        blackout.setAttribute('position', '0 0 -.11');
        blackout.setAttribute('rotation', '0 0 0');
        cameraEl.appendChild(blackout);

        let message = document.createElement('a-text');
        message.setAttribute('value', 'CONGRATULATIONS!\nYou successfully repaired your spaceship and returned home!');
        message.setAttribute('opacity', '1');
        message.setAttribute('color', 'white');
        message.setAttribute('align', 'center');
        message.setAttribute('position', '0 0 -.1');
        message.setAttribute('scale', '.05 .05 .05');
        cameraEl.appendChild(message);

        let cheer = document.getElementById('cheer');
        let takeoff = document.getElementById('takeoff');

        cheer.play();
        takeoff.play();

        window.removeEventListener('mousedown', handleMouseDown); 
      }

      
      if (clickedObj.hasAttribute('data-dynamite')) {
        let destructodoor = document.querySelector('#destructodoor');
        if (destructodoor) {
          destructodoor.parentNode.removeChild(destructodoor);  
        }
      }

    } else {
      console.log('No object clicked');
    }
  }
});
//click function end

//Intro sequence start
window.addEventListener('load', function () {

  let bg = document.querySelector('#bg');
  bg.play();

  document.getElementById('playButton').addEventListener('click', function () {
    document.getElementById('loadingScreen').classList.add('fadeOut');

    let cameraEl = document.querySelector('a-camera');  

    let bgms = document.getElementById('bgms');
    let startcrash = document.getElementById('startcrash');

    bg.pause();
    bg.currentTime = 0;

    bgms.play();
    startcrash.play();

    let blackout = document.createElement('a-plane');
    blackout.setAttribute('width', '16');
    blackout.setAttribute('height', '9');
    blackout.setAttribute('color', 'black');
    blackout.setAttribute('opacity', '1');
    blackout.setAttribute('position', '0 0 -.11');  
    blackout.setAttribute('rotation', '0 0 0'); 
    cameraEl.appendChild(blackout);

    let message = document.createElement('a-text');
    message.setAttribute('value', 'Repair your spaceship and return home.');
    message.setAttribute('color', 'white');
    message.setAttribute('align', 'center');
    message.setAttribute('position', '0 0 -.1');  
    message.setAttribute('scale', '.05 .05 .05');
    message.setAttribute('visible', 'false');  
    cameraEl.appendChild(message);  

    setTimeout(() => {
      blackout.setAttribute('opacity', '0.8');
      message.setAttribute('visible', 'true'); 
    }, 7000);

    setTimeout(() => {
      message.setAttribute('visible', 'false'); 
      blackout.setAttribute('visible', 'false'); 
    }, 10000);  

    setTimeout(() => {
      document.getElementById('loadingScreen').style.display = 'none';
      document.getElementById('JoeyChestnut').style.display = 'block';
    }, 1000);
  });

});
//Intro sequence End

//Window
function loop(){
  camera.update();
  window.requestAnimationFrame( loop );
}
//Window End

