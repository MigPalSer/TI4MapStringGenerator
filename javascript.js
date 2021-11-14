var templates;
var providers;

$(document).ready(function(){
    $('input[type="radio"]').click(function(){
        $(".template").addClass("hidden");

      if ($("#2p").is(':checked'))
      {
        $(".2ptemplate").removeClass("hidden");
      }

      else if($("#3p").is(':checked'))
      {
        $(".3ptemplate").removeClass("hidden");
      }

      else if($("#4p").is(':checked'))
      {
        $(".4ptemplate").removeClass("hidden");
      }

      else if($("#5p").is(':checked'))
      {
        $(".5ptemplate").removeClass("hidden");
      }

      else if($("#6p").is(':checked'))
      {
        $(".6ptemplate").removeClass("hidden");
      }

      else if($("#7p").is(':checked'))
      {
        $(".7ptemplate").removeClass("hidden");
      }

      else if($("#8p").is(':checked'))
      {
        $(".8ptemplate").removeClass("hidden");
      }

      if ($(".templates").is(':checked'))
      {
        $(".btn").attr("disabled",false);

      }
    });
    templates=readJson('./assets/templates.json');
    providers=readJson('./assets/providers.json');
  });


 function readJson(url){
    let obj=[];
    fetch(url).then(response=> response.json()).then(data=> obj.push(data));
    return obj;
}

function objectToMap(obj){
    let keys=Object.keys(obj);
    let map=new Map();
    for(i=0;i<keys.length;i++){
        map.set(keys[i], obj[keys[i]]);
    }
    return map;
}

function keeganString(map){
    let string="";
    for(i=1;i<=map.get("Size");i++){
        string+=map.get(i.toString());
        string+=",";
    }
    string=string.slice(0, string.length-1);
    return string;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function copyAndShuffle(array){
      let copiedArray=[];

      for(var i=0;i<array.length;i++){
          copiedArray.push(array[i]);
      }

      return shuffle(copiedArray);
  }

function removeElement(arr,val){
    let index=arr.indexOf(val);
    if(index!=-1){
        arr.splice(index, 1);
    }
}

function solve(template){

let map=objectToMap(template);

let R=[], B=[], B1=[], B2=[], B3=[];

let solveproviders=providers[0];

R=copyAndShuffle(solveproviders.R);

//shuffle(R);

if(template.Random){
    B=copyAndShuffle(solveproviders.B);
    //shuffle(B);
}else{
    B1=copyAndShuffle(solveproviders.B1);
    //shuffle(B1);
    B2=copyAndShuffle(solveproviders.B2);
    //shuffle(B2);
    B3=copyAndShuffle(solveproviders.B3);
    //shuffle(B3);
}

let blockedTiles=map.get("BlockedTiles");

for(var i=0;i<=blockedTiles.length;i++){
    removeElement(R,blockedTiles[i]);
    removeElement(B,blockedTiles[i]);
    removeElement(B1,blockedTiles[i]);
    removeElement(B2,blockedTiles[i]);
    removeElement(B3,blockedTiles[i]);

}

for(i=1;i<=template.Size;i++){
let key=i.toString();
let value=map.get(key);
if(value=="R"){
    map.set(key,R.pop());
}else if(value=="B"){
    map.set(key,B.pop());
}else if(value=="B1"){
    map.set(key,B1.pop());
}else if(value=="B2"){
    map.set(key,B2.pop());
}else if(value=="B3"){
    map.set(key,B3.pop());
}
}

return map;

}

function generateString(e){
    let myString="";
    if(e==document.getElementById("random")){
        myString+="R";
    }

    if(e==document.getElementById("balanced")){
        myString+="B";
    }

    if(e==document.getElementById("conflictive")){
        myString+="C";
    }

    if($("#2Regina").is(':checked')){
        myString+="2Regina";
    }

    else if($("#3Limes").is(':checked')){
        myString+="3Limes";
    }

    else if($("#4Gladio").is(':checked')){
        myString+="4Gladio";
    }

    else if($("#5Aracne").is(':checked')){
        myString+="5Aracne";
    }

    else if($("#6Nucleus").is(':checked')){
        myString+="6Nucleus";
    }

    else if($("#7Centrum").is(':checked')){
        myString+="7Centrum";
    }

    else if($("#8CentrumAnilla").is(':checked')){
        myString+="8CentrumAnilla";
    }

    
    let tempmap=objectToMap(templates[0]);
    let map=solve(tempmap.get(myString));
    console.log(map);
    
    document.getElementById("finalString").innerHTML=keeganString(map);

    var theurl= "https://keeganw.github.io/ti4/?settings=T60000000FFF&tiles="+keeganString(map);
    document.getElementById("mapbutton").href=theurl;

}

