document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('play').addEventListener('click',function(){
    window.location.href = 'aframeproject.html';
});
  document.getElementById('scenario').addEventListener('click',function(){
    document.getElementById('descriptor').innerHTML = "<h1> Scenario </h1> <hr> <p> After a long journey on NASA's experimental spaceship, you find yourself crashing into a rogue asteroid. Your ship, critically damaged, forced you to seek refuge on an alien planet. </p>";
  });

  document.getElementById('controls').addEventListener('click',function(){
    document.getElementById('descriptor').innerHTML = "<h1> Controls </h1> <hr> <p> The controls are simple <br> WASD to move forward, left, backwards and right. <br> Space to jump. <br> Mouse to turn with the left mouse button to click. </p>";});
  document.getElementById('gameplay').addEventListener('click',function(){
    document.getElementById('descriptor').innerHTML = "<h1> Gameplay </h1> <hr> <p> You are tasked with finding three items to repair your spaceship: <br> - A power source in the form of a vibrant blue gem. <br> - Your control tablet for your ship. <br> - Your loyal AI that controls your ship in your absence. </p>";
  });
  document.getElementById('credit').addEventListener('click',function(){
    document.getElementById('descriptor').innerHTML = "<h1> Credits </h1> <hr> <p> Project made by Alexander Xu and Joseph Seo. </p>";
  });

  // let audio = document.getElementById('bg');
  // document.addEventListener('DOMContentLoaded', function (){
  //   audio.muted = false;
  //   audio.play();
  // },{ once: true});

  document.addEventListener('DOMContentLoaded', function (){
    audio.muted=false;
    let playplay = audio.play();
    if (playplay !== undefined){
      playplay.catch(()=>{
        console.log("Autoplay blocked!!!");
      document.addEventListener('click' , function(){
        audio.play();
      },{once: true});
    });
}});});

//Two hours on this only to realize my browser blocked autoplay. I should be embarrassed

