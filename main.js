status="";
function setup(){
    canvas=createCanvas(500,350);
    canvas.position(500,275);

    video=createCapture(VIDEO);
    video.size(500,350);
    video.hide();    
}
function start(){
    cocossd=ml5.objectDetector('cocossd',modalLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modalLoaded(){
    console.log("MODAL LOADED !");
    status=true;
}
function draw(){
    image(video,0,0,500,350)
}