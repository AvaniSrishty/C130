song = "";
song1 = "";

score_leftWrist = 0;
score_rightWrist = 0;
music_played = "";
music_played_right = "";

leftWrist_X = 0;
rightWrist_X= 0;
leftWrist_Y = 0;
rightWrist_Y = 0;


function preload(){
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3");
    console.log("preload");
} 

function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
   
}


function draw(){
    image(video, 0, 0, 400, 400);

     music_played = song.isPlaying();

    fill("red");
    stroke("black");

    if(score_leftWrist > 0.2){
        circle(leftWrist_X, leftWrist_Y, 20);
        song1.stop();

        if(music_played == false){
           song.play();

           document.getElementById("song_title").innerHTML = "song = Harry Potter Remix🎵";
        }
    }



    if(score_rightWrist > 0.2){
       circle(rightWrist_X, rightWrist_Y, 20);
       song.stop();

       if(music_played_right == false){
             song1.play();

             document.getElementById("song_title").innerHTML = "song = Remix🎵";
       }
    }
}



function modelLoaded(){
   console.log("your model is ready to work")
}

function gotPoses(result){

    console.log(result);
if(result.length > 0){


        rightWrist_X = result[0].pose.rightWrist.x;
        rightWrist_Y = result[0].pose.rightWrist.y;

        leftWrist_X = result[0].pose.leftWrist.x;
        leftWrist_Y = result[0].pose.leftWrist.y;

    score_leftWrist = result[0].pose.keypoints[9].score;
    score_rightWrist = result[0].pose.keypoints[10].score;

}
}