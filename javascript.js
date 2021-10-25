$(function(){
    $('input[type="radio"]').click(function(){
      if ($("#6p").is(':checked'))
      {
        $("#template-1").removeClass("hidden");
      }
    });
  });