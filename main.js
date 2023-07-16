Harry_potter_theme_song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;

function setup()
{
    Canvas=createCanvas(600, 500);
    Canvas.center();  

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("black");
    if(scoreleftwrist > 0.2)
    {
        circle(leftwristX, leftwristY, 20);
        InNumberleftwristY=Number(leftwristY);
        remove_decimal=floor(InNumberleftwristY);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume= "+ volume;
        song.setVolume(volume);
    }
}
function preload()
{
    song=loadSound("song.mp3");
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1)
}
function modelLoaded()
{
    console.log('Posenet is Initialized')
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist= "+ scoreleftwrist);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftwristX + "leftWristY= "+leftwristY);

        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("rightWristX= "+rightwristX + "rightWristY= "+rightwristY);

    }
}