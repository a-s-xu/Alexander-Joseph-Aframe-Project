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

window.addEventListener('mousedown', function(event) {   
  if (event.button === 0) {  

    let camEl = document.querySelector('a-camera');   
    let sceneStuff = document.querySelector('a-scene');    
    let camObj = camEl.object3D;    
    let dir = new THREE.Vector3();   
    camObj.getWorldDirection(dir);    
    dir.multiplyScalar(-1);    
    raycaster.set(camObj.position, dir);    

    let clickableStuff = sceneStuff.querySelectorAll('[clickable]');    
    let clickableMeshes = Array.from(clickableStuff).map(obj => obj.object3D);    
    let intersects = raycaster.intersectObjects(clickableMeshes, true);    
    console.log("Checking idk.");  

    if (intersects.length > 0) {     
      let clickedObj = intersects[0].object.el;     
      console.log('Clicked on:', clickedObj);  

      clickedObj.setAttribute('visible', false);      
      clickedObj.removeAttribute('clickable');   

      if (clickedObj.id === 'collectible-box'){  
        let gemModel = document.createElement('a-gltf-model');    
        gemModel.setAttribute('src', '#gem');    
        gemModel.setAttribute('scale', '5 5 5');    
        gemModel.setAttribute('animation-mixer', '');    
        document.querySelector('#position1').appendChild(gemModel);    
        modelsPlaced.gem = true;    
      } 
      else if (clickedObj.id === 'tablet-box'){   
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

      console.log("Checking if all models are c;ocled placed");  

      if (modelsPlaced.gem && modelsPlaced.tablet && modelsPlaced.eye) {     
        console.log("All models iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");  
        let BlacScrn = document.createElement('a-plane');    
        BlacScrn.setAttribute('width', '16');    
        BlacScrn.setAttribute('height', '9');    
        BlacScrn.setAttribute('color', 'black');    
        BlacScrn.setAttribute('opacity', '1');    
        BlacScrn.setAttribute('position', '0 0 -.11');    
        BlacScrn.setAttribute('rotation', '0 0 0');    
        camEl.appendChild(BlacScrn);    

        let Bruh = document.createElement('a-text');    
        Bruh.setAttribute('value', 'CONGRATULATIONS!\nYou successfully repaired your spaceship and returned home!');    
        Bruh.setAttribute('opacity', '1');    
        Bruh.setAttribute('color', 'white');    
        Bruh.setAttribute('align', 'center');    
        Bruh.setAttribute('position', '0 0 -.1');    
        Bruh.setAttribute('scale', '.05 .05 .05');    
        camEl.appendChild(Bruh);    

        let cheer = document.getElementById('cheer');    
        let takeoff = document.getElementById('takeoff');    
        cheer.play();    
        takeoff.play();    

        console.log("Sounds playin");  
        window.removeEventListener('mousedown', handleMouseDown);    
      }    
      console.log("Checking for dynami");  
      if (clickedObj.hasAttribute('data-dynamite')) {   
        let destructodoor = document.querySelector('#destructodoor');    
        if (destructodoor) {    
          console.log("Destroying door");  
          destructodoor.parentNode.removeChild(destructodoor);    
        }    
     }    
    } else {    
      console.log('No  clicked');    
    }    
}  });
//click function end

//Intro sequence start
window.addEventListener('load', function() { 
  let bg = document.querySelector('#bg'); 
  bg.play(); 
  document.getElementById('playButton').addEventListener('click', function() { 
    document.getElementById('loadingScreen').classList.add('fadeOut'); 

    let cam = document.querySelector('a-camera');   
    let musicStuff = document.getElementById('bgms');  
    let crashSound = document.getElementById('startcrash');  
    bg.pause();  
    bg.currentTime = 0;   
    musicStuff.play(); 
    crashSound.play(); 

    let BlacScrn = document.createElement('a-plane');  
    BlacScrn.setAttribute('width', '16');  
    BlacScrn.setAttribute('height', '9');  
    BlacScrn.setAttribute('color', 'black');   
    BlacScrn.setAttribute('opacity', '1');  
    BlacScrn.setAttribute('position', '0 0 -.11');   
    BlacScrn.setAttribute('rotation', '0 0 0');   
    cam.appendChild(BlacScrn);  
    let Bruh = document.createElement('a-text');  
    Bruh.setAttribute('value', 'Repair your spaceship and return home.');  
    Bruh.setAttribute('color', 'white');  
    Bruh.setAttribute('align', 'center');  
    Bruh.setAttribute('position', '0 0 -.1');  
    Bruh.setAttribute('scale', '.05 .05 .05');  
    Bruh.setAttribute('visible', 'false');   
    cam.appendChild(Bruh);    
    console.log("BlacScrn and Bruh added");  
    setTimeout(function() { 
        BlacScrn.setAttribute('opacity', '0.8');   
        Bruh.setAttribute('visible', 'true');   
    }, 7000);    

    setTimeout(function(){ 
        Bruh.setAttribute('visible', 'false');    
        BlacScrn.setAttribute('visible', 'false');  
    }, 10000);     
    setTimeout(function() { 
        document.getElementById('loadingScreen').style.display = 'none'; 
        document.getElementById('JoeyChestnut').style.display = 'block'; 
        console.log("Loading screen removed");   
    }, 1000); 
});});
//Intro sequence End

//Window
function loop(){
  camera.update();
  window.requestAnimationFrame( loop );
}
//Window End

