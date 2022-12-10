const init = function() {
    let headingTitle = document.getElementById('titleHeading');
    headingTitle.innerHTML = "day 7";
};

const Log = function(input){ console.log(input); }

const GetDataFromFile = function() {
        const [file] = document.querySelector('input[type=file]').files;
        const reader = new FileReader();

        
        reader.addEventListener("load", () => {
            
            // get data from file
            let rawData = reader.result;
            let result;
            

            document.getElementById('thedata').innerHTML = "Result: " + result;
        }, false); 
      
        if (file) {
          reader.readAsText(file);
        }
      };

(function () {
    init();
})();
