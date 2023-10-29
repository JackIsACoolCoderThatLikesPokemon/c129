song = "";
leftWristY = 0;
leftWristX = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log('posenet is loaded')
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#7FFFD4");
    stroke("#7FFFD4");

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if(results.length > 0) 
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist's x = " + leftWristX + " and Left Wrist's y = " + leftWristY + " and Right Wrist's x = " + rightWristX + " and Right Wrist's y = " + rightWristY);

    }
}
