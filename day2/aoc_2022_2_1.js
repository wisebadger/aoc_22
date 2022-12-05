const init = function() {
    let headingTitle = document.getElementById('titleHeading');
    headingTitle.innerHTML = "Rock Paper Scissors";
};

const GetScore = function(score) {
    const rock = 1;
    const paper = 2;
    const scissor = 3;

    // 1 beats 3 
    // 3 beats 2
    // 2 beats 1

    switch (score) {
        case 'A':
        case 'X':
            return rock;
        case 'B':
        case 'Y':
            return paper;
        case 'C':
        case 'Z':
            return scissor;
        default:
            console.log("getscore failed: unknown score");
            break;
    }

}

const SimBattle = function(opponentScore, playerScore){

    const win = 6;
    const draw = 3;
    const lose = 0;

    if(opponentScore === playerScore){
        return playerScore + draw; // draw
    } else if(opponentScore === 1 && playerScore === 3){
        return playerScore + lose;
    } else if (opponentScore === 2 && playerScore === 1){
        return playerScore + lose;
    } else if (opponentScore === 3 && playerScore === 2){
        return playerScore + lose;
    } else if (opponentScore === 3 && playerScore === 1) {
        return playerScore + win;
    } else if (opponentScore === 1 && playerScore === 2){
        return playerScore + win;
    } else if (opponentScore === 2 && playerScore === 3){
        return playerScore + win;
    } else {
        console.log("something bad happened\nOppscore: " + opponentScore + "\nUserscore: " + playerScore);
    }
}

const GetDataFromFile = function() {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
        
        reader.addEventListener("load", () => {
                
        // input
        var strategyGuide = reader.result;
        let battles = strategyGuide.split("\n");
        var playerScore = 0;
        var opponentScore = 0;

        // simulate the battles 
        for (let index = 0; index < battles.length; index++) {
            if(battles[index] != ""){
                let battle = battles[index].split(' ');
                let opponentChoice = battle[0];
                let playerChoice = battle[1];


                playerScore += SimBattle(GetScore(opponentChoice), GetScore(playerChoice));
                opponentScore += SimBattle(GetScore(playerChoice), GetScore(opponentChoice));
            }
        }


        document.getElementById('thedata').innerHTML = "PlayerXYZ: " + playerScore;
        document.getElementById('thedata2').innerHTML = "OpponentABC: " + opponentScore;
        }, false); 
      
        if (file) {
          reader.readAsText(file);
        }
      };

(function () {
    init();
})();

// 13223 is to low