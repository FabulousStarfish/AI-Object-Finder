status="";
objects=[];
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
    object_to_be_found=document.getElementById("input").value;
}
function modalLoaded(){
    console.log("MODAL LOADED !");
    status=true;
}
function draw(){
    image(video,0,0,500,350)
    if(status!=""){
        cocossd.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            percent=floor(objects[i].confidence*100);
            label=objects[i].label;
            fill('#802f93');
            rect(objects[i].x,objects[i].y-30,120,30,0,10,0,0);
            fill('#ffffff');
            confidence=floor(objects[i].confidence*100);
            text(label+"  "+percent+"%",objects[i].x+5,objects[i].y-10);
            noFill();
            stroke("#802f93");
            strokeWeight(5);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(label==object_to_be_found.toLowerCase()){
                video.stop();
                cocossd.detect(gotResult);
                document.getElementById("found").innerHTML="<b>Object Found</b>";
                var synth=window.speechSynthesis;
                var speak_data=object_to_be_found+" Found";
                var utterThis=new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else{
                document.getElementById('found').innerHTML="Object Not Found";
            }
        }
    }
}
function gotResult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects=result;
    }
}