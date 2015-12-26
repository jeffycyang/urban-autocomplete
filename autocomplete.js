var textInputs;

if (document.querySelectorAll) {
    textInputs = document.querySelectorAll('input[type=text]');
} else {
    textInputs = [];
    var unfiltered = document.getElementsByTagName('input'),
        i = unfiltered.length,
        input;
    while(i--) {
        input = unfiltered[i];
        if (!input.type || input.type === 'text') {
            textInputs.push(input);
        }
    }
}

$(textInputs).addClass('awesomplete');

console.log(textInputs);

var awesomplete = [];
for (var i=0 ; i < textInputs.length ; i++){
    awesomplete[i] = new Awesomplete(textInputs[i], {
      minChars: 1,
      autoFirst: true,
      filter: function(){
        return true;
      }
    });
}

$(textInputs).on("keypress", function() {
    chrome.runtime.sendMessage({
        method: 'GET',
        action: 'xhttp',
        // url: 'http://api.urbandictionary.com/v0/define?term=' + this.value
        url: 'http://api.urbandictionary.com/v0/autocomplete?key=ab71d33b15d36506acf1e379b0ed07ee&term=' + this.value
    }, function(responseText) {
        var list = [];  
        // $.each(JSON.parse(responseText)["tags"], function(key, value) {
        $.each(JSON.parse(responseText), function(key, value) {
            list.push(value);
        });
        for (var j=0 ; j < awesomplete.length ; j++) {
            awesomplete[j].list = list;
        }
    });
});
