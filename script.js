//Declaring and Initialising our constants
const higherButton = document.getElementById("higher");
const lowerButton = document.getElementById("lower");
const leftText = document.getElementById("left-text");
const rightText = document.getElementById("right-text");

const container = document.getElementById("container");
const buttonContainer = document.getElementById("button-container");
const scoreContainer = document.getElementById("score-container");

const leftContainer = document.getElementById("left-container");
const rightContainer = document.getElementById("right-container");
const scoreText = document.getElementById("score-text");
const endScreen = document.getElementById("end-screen");
const endScreenText = document.getElementById("end-screen-text");
const endScore = document.getElementById("end-score");
const restartButton = document.getElementById("restart");

//Creating an object array of YouTube video thumbnails and views
const thumbnails = [
    {
        source: "SDMN_vs_BETA.png",
        views: "9,000,000",
    },
    {
        source: "SDMN_USA_TRIP.png",
        views: "22,000,000",
    },
    {
        source: "NIKO_INTERVIEW.png",
        views: "34,000,000",
    },
    {
        source: "NIKO_ELECTION.png",
        views: "13,000,000",
    },
    {
        source: "F2_100BALLS.png",
        views: "55,000,000",
    },
    {
        source: "AJSHABEEL_PRISON.png",
        views: "1,400,000",
    },
    {
        source: "W2S_CROSSBAR.png",
        views: "70,000,000",
    },
    {
        source: "PEWDIEPIE_X_KSI.png",
        views: "10,000,000",
    },
    {
        source: "CHUNKZ_X_DARKEST.png",
        views: "2,400,000",
    }
];

//Temporary variables 
let shuffledThumbnails, currentIndex, currentScore;

currentIndex = 0;
currentScore = 0;

//Adding event listeners to buttons
higherButton.addEventListener("click", clickedHigher);
lowerButton.addEventListener("click", clickedLower);

restartButton.addEventListener("click", restartGame);

startGame();

//This function is called when the game begins or restarts
function startGame()
{
    //Randomly sorting the thumbnails array
    shuffledThumbnails = thumbnails.sort(()=>Math.random() - .5);

    //Adding the thumbnail image styles using javascript
    leftContainer.style.backgroundImage = "url(images/"+shuffledThumbnails[currentIndex].source+")";
    leftContainer.style.backgroundRepeat = "none";
    leftContainer.style.backgroundSize = "contain";
    leftText.innerText = shuffledThumbnails[currentIndex].views;

    rightContainer.style.backgroundImage = "url(images/"+shuffledThumbnails[currentIndex+1].source+")";
    rightContainer.style.backgroundRepeat = "none";
    rightContainer.style.backgroundSize = "contain";
    rightText.innerText = shuffledThumbnails[currentIndex+1].views;

    //Making sure the views are hidden before guessing
    rightText.classList.add('hide');

    //Displaying the score
    scoreText.innerText = "Score: "+currentScore;

}

function clickedHigher()
{
    //Checking the equality of the views of the left and right thumbnails
    if(parseInt(rightText.innerText) > parseInt(leftText.innerText) || parseInt(rightText.innerText) == parseInt(leftText.innerText))
    {
        console.log("correct!");
        currentScore++;
        scoreText.innerText= "Score: "+currentScore;

        currentIndex++;

        if(currentIndex < shuffledThumbnails.length - 1)
        {
            setNextThumbnail(shuffledThumbnails, currentIndex);
        }
        else
        {
            //Ending the game since the guess was incorrect
            displayEndScreen();
        }
    }
    else if(parseInt(rightText.innerText) < parseInt(leftText.innerText))
    {
        //Ending the game since the guess was incorrect
        console.log("incorrect!");
        displayEndScreen();
    }
}

function clickedLower()
{
    //Checking the equality of the views of the left and right thumbnails
    if(parseInt(rightText.innerText) < parseInt(leftText.innerText) || parseInt(rightText.innerText) == parseInt(leftText.innerText))
    {
        console.log("correct!");
        currentScore++;
        scoreText.innerText= "Score: "+currentScore;

        currentIndex++;
        
        if(currentIndex < shuffledThumbnails.length - 1)
        {
            setNextThumbnail(shuffledThumbnails, currentIndex);
        }
        else
        {
            //Ending the game since the guess was incorrect
            displayEndScreen();
        }
    }
    else if(parseInt(rightText.innerText) > parseInt(leftText.innerText))
    {
        //Ending the game since the guess was incorrect
        console.log("incorrect!");
        displayEndScreen();
    }
}

function setNextThumbnail(shuffledThumbnails, currentIndex)
{
    //Swapping the left and right thumbnails and then changing the right one to the next
    leftContainer.style.backgroundImage = "url(images/"+shuffledThumbnails[currentIndex].source+")";
    leftText.innerText = shuffledThumbnails[currentIndex].views;
    leftText.classList.remove('hide');

    rightContainer.style.backgroundImage = "url(images/"+shuffledThumbnails[currentIndex+1].source+")";
    rightText.innerText = shuffledThumbnails[currentIndex+1].views;
}

function displayEndScreen()
{
    //Hiding the container, button-container and score-container elements
    container.classList.add('hide');
    buttonContainer.classList.add('hide');
    scoreContainer.classList.add('hide');
    
    //Then displaying the necessary end screen elements by removing hide
    endScreen.classList.remove('hide');
    endScore.innerText = "Your score: "+currentScore;
    endScore.classList.remove('hide');
    endScreenText.classList.remove('hide');

    restartButton.classList.remove('hide');
}

function restartGame()
{
    //In order to restart, we just reverse what was done in the displayEndScreen() function
    container.classList.remove('hide');
    buttonContainer.classList.remove('hide');
    scoreContainer.classList.remove('hide');
    
    endScreen.classList.add('hide');
    endScore.innerText = "Your score: "+currentScore;
    endScore.classList.add('hide');
    endScreenText.classList.add('hide');

    restartButton.classList.add('hide');

    //Resetting the currentIndex and Score values
    currentIndex = 0;
    currentScore = 0;

    //Calling startGame() again
    startGame();
}