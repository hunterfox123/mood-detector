let currentQuestion = 0;
let totalScore = 0;
let playerName = "";
let selectedScore = null;

/* SCREEN NAVIGATION (FIXED) */
function nextScreen(id){

document.querySelectorAll(".screen")
.forEach(s=>s.classList.add("hidden"));

document.getElementById(id).classList.remove("hidden");

}

/* QUESTIONS */
const questions = [
{
q:"How are you feeling right now?",
options:[["Happy",3],["Good",2],["Okay",1],["Sad",-2],["Very Sad",-3]]
},
{
q:"How often do you smile?",
options:[["Very Often",3],["Often",2],["Sometimes",1],["Rarely",-2],["Never",-3]]
},
{
q:"How do you feel today?",
options:[["Excited",3],["Positive",2],["Normal",1],["Worried",-2],["Upset",-3]]
},
{
q:"How easy is it to enjoy things?",
options:[["Very Easy",3],["Easy",2],["Normal",1],["Hard",-2],["Very Hard",-3]]
},
{
q:"How calm are you?",
options:[["Very Calm",3],["Calm",2],["Neutral",1],["Anxious",-2],["Very Anxious",-3]]
},
{
q:"How are your thoughts?",
options:[["Positive",3],["Mostly Positive",2],["Mixed",1],["Negative",-2],["Very Negative",-3]]
},
{
q:"One word mood?",
options:[["Happy",3],["Good",2],["Okay",1],["Sad",-2],["Stressed",-3]]
}
];

/* START */
function startQuiz(){

playerName=document.getElementById("username").value;

if(playerName==""){
alert("Enter name");
return;
}

currentQuestion=0;
totalScore=0;

showQuestion();
nextScreen("quizPage");

}

/* SHOW QUESTION */
function showQuestion(){

let q=questions[currentQuestion];

document.getElementById("questionNumber")
.innerText=`Q${currentQuestion+1}/7`;

document.getElementById("questionText").innerText=q.q;

let html="";

q.options.forEach(o=>{
html+=`
<button class="option-btn"
onclick="select(${o[1]},this)">
${o[0]}
</button>`;
});

document.getElementById("optionsContainer").innerHTML=html;

selectedScore=null;

}

/* SELECT */
function select(score,btn){

selectedScore=score;

document.querySelectorAll(".option-btn")
.forEach(b=>b.classList.remove("selected"));

btn.classList.add("selected");

}

/* NEXT */
function nextQuestion(){

if(selectedScore==null){
alert("Select option");
return;
}

totalScore+=selectedScore;
currentQuestion++;

if(currentQuestion<questions.length){
showQuestion();
}else{
showResult();
}

}

/* RESULT */
function showResult(){

nextScreen("resultPage");

let mood="",score=0,suggestion="";

if(totalScore>=15){
mood="Excited"; score=100; suggestion="Full of energy!";
}
else if(totalScore>=8){
mood="Happy"; score=85; suggestion="Good mood!";
}
else if(totalScore>=3){
mood="Calm"; score=70; suggestion="Balanced mind.";
}
else if(totalScore>=-2){
mood="Neutral"; score=55; suggestion="Stable mood.";
}
else if(totalScore>=-7){
mood="Sad"; score=40; suggestion="Take rest.";
}
else{
mood="Stressed"; score=25; suggestion="Relax yourself.";
}

window.finalScore=score;

document.getElementById("moodResult").innerText="Mood: "+mood;
document.getElementById("scoreResult").innerText="Score: "+score;
document.getElementById("suggestionResult").innerText=suggestion;

}

/* SAVE */
function saveResult(){

let data=JSON.parse(localStorage.getItem("lb"))||[];

data.push({name:playerName,score:window.finalScore});

localStorage.setItem("lb",JSON.stringify(data));

alert("Saved!");

nextScreen("screen7");

}

/* LEADERBOARD */
function showLeaderboard(){

let data=JSON.parse(localStorage.getItem("lb"))||[];

data.sort((a,b)=>b.score-a.score);

let table="<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

data.forEach((d,i)=>{
table+=`<tr><td>${i+1}</td><td>${d.name}</td><td>${d.score}</td></tr>`;
});

document.getElementById("leaderboardTable").innerHTML=table;

nextScreen("leaderboardPage");

}