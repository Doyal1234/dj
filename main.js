video="";
status="";
objects=[];

function prelaoad() {
video=loadVideo("video.mp4");
video.hide();
}

function setup() {
canvas=createCanvas(480,380);
canvas.center();
}

function draw() {
image(video,0,0,480,380);
if(status!="") {
objectDetector.detect("cocossd",gotResult);
for(i=0;i<objects.length;i++) {
document.getElementById("status").innerHTML="Status:Object Detected";
document.getElementById("number_of_objects").innerHTML="Number of objects detected are"+objects.length;
fill("#FF0000");
percent=floor(objects[i].confidence*100);
text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
noFill();
stroke("#FF0000");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
}
}

function gotResult(error,results) {
if(error) {
console.log(error);
}
console.log(results)
objects=results;
}

function start() {
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="Status:Object Detected";
}

function modelLoaded() {
console.log("Model loaded!");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}