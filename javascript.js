$(document).ready(function(){
    $('input[type="radio"]').click(function(){
      if ($("#6p").is(':checked'))
      {
        $("#template-1").removeClass("hidden");
      }

      if ($("#template1").is(':checked'))
      {
        $(".btn").attr("disabled",false);

      }
    });
  });