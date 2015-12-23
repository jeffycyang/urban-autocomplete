var textInputs;

if (document.querySelectorAll)
{
    textInputs = document.querySelectorAll('input[type=text]');
}
else
{
    textInputs = [];
    var unfiltered = document.getElementsByTagName("input"),
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

var awesomplete = new Awesomplete(input, {
  minChars: 1,
  autoFirst: true
});

$(textInputs).on("keyup", function(){
    $.ajax({
      url: 'http://api.urbandictionary.com/v0/define?term=' + this.value,
      type: 'GET',
      dataType: 'json'
    })
    .success(function(data) {
      var list = [];
      $.each(data, function(key, value) {
        list.push(value.tags);
      });
      awesomplete.list = list;
    });
});