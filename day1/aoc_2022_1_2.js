const init = function() {
    let headingTitle = document.getElementById('titleHeading');
    headingTitle.innerHTML = "Hello Elves";
};


const GetDataFromFile = function() {
        const content = document.querySelector('.thedata');
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();
        
      
        reader.addEventListener("load", () => {
          // this will then display a text file
          
        var elfRoster = reader.result;
        var arrElfInventory = elfRoster.split("\n");

        var maxCalories = [];
        var currentElf = 0;
        var allElves = [];

        for(var i = 0; i < arrElfInventory.length; i++){

            if(arrElfInventory[i] != ''){
                currentElf += parseInt(arrElfInventory[i]);
            } else {
                allElves.push(parseInt(currentElf));
                currentElf = 0;
            }
        }

        allElves.sort(function(a, b) {
            return a - b;
          });

        for(var j = 1; j <= 3; j++){
            maxCalories.push(allElves[allElves.length - j])
        }

        const answer = maxCalories.reduce((accumulator, value)=>{
            return accumulator + value;
        }, 0);

        console.log(answer);
        console.log(maxCalories);
        }, false); 
      
        if (file) {
          reader.readAsText(file);
        }
        
      };

      /*
      265
: 
67760

68706

70116
      */

(function () {
    init();
})();