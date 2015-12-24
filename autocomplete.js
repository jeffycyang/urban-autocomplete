var textInputs;

if (document.querySelectorAll)
{
    textInputs = document.querySelectorAll('input[type=text]');
}
else
{
    textInputs = [];
    var unfiltered = document.getElementsByTagName('input'),
        i = unfiltered.length,
        input;
    while(i--)
    {
        input = unfiltered[i];
        if (!input.type || input.type === 'text')
        {
            textInputs.push(input);
        }
    }
}

$(textInputs).addClass('awesomplete');

var awesomplete = new Awesomplete(textInputs[0], {
  minChars: 1,
  autoFirst: true
});

$(textInputs).on("keyup", function(){
    // $.ajax({
    //   url: 'http://api.urbandictionary.com/v0/define?term=' + this.value,
    //   type: 'GET',
    //   dataType: 'json'
    // })
    // .success(function(data) {
    //   var list = [];
    //   console.log('success!');
    //   $.each(data, function(key, value) {
    //     list.push(value.tags);
    //   });
    //   awesomplete.list = list;
    // });
    chrome.runtime.sendMessage({
        method: 'GET',
        action: 'xhttp',
        url: 'http://api.urbandictionary.com/v0/define?term=' + this.value
    }, function(responseText) {
        var list = [];  
        $.each(JSON.parse(responseText)["tags"], function(key, value) {
            console.log("choice "+value);
            list.push(value);
        });
        awesomplete.list = list;
    });
});