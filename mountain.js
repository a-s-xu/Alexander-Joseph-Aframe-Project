//Defining Mountain 
class mountain{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    //let document.getElementById("mountain").setAttribute; Idk I think code node is easier 

    this.obj = montana.cloneNode(true);
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);

  }
}

//Defining Grass 
class grass{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.obj = aliengrass.cloneNode(true);
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);}}

//Defining Tree 
class tree{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.obj = alientree.cloneNode(true);
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);
}
}

//Defining Glacier 
class glacier{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = y;

    this.obj = montana.cloneNode(true);
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);
}}