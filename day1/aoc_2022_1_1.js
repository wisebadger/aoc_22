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
        var maxCalories = 0;
        var currentElf = 0;
        for(var i = 0; i < arrElfInventory.length; i++){
            currentElf += parseInt(arrElfInventory[i]);
            if (maxCalories < currentElf){
                maxCalories = currentElf;
            }
            if(arrElfInventory[i] == ""){
                currentElf = 0;
            }
        }
        
        console.log(currentElf);
        console.log(maxCalories);
        console.log(arrElfInventory);
        }, false); 
      
        if (file) {
          reader.readAsText(file);
        }
        
      };

(function () {
    init();
})();