var mydata = require('./assets/templates.json');
console.log(mydata.R6Nucleus.Size);

function solve(template){

    //Ver si esto funciona o hay que usar el parse
let map=new Map(template);

let R, B, B1, B2, B3;

let providers = require('./assets/providers.json');

//Falta barajar los proveedore
R=providers.R;
if(template.Random){
    B=providers.B;
}else{
    B1=providers.B1;
    B2=providers.B2;
    B3=providers.B3;
}

//Falta quitar los bloqueados
array.forEach(element => {
    //¿?
});

for(i=1;i<=template.Size;i++){
let key=i.toString();
let value=map.get(key);
if(value="R"){
    map.set(key,R.pop());
}else if(value="B"){
    map.set(key,B.pop());
}else if(value="B1"){
    map.set(key,B1.pop());
}else if(value="B2"){
    map.set(key,B2.pop());
}else if(value="B3"){
    map.set(key,B3.pop());
}
}

return map;

}

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

