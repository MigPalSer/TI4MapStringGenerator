var templates;
var providers;

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
    templates=readJson('./assets/templates.json');
    providers=readJson('./assets/providers.json');
  });


 function readJson(url){
    let obj=[];
    //const response= 
    fetch(url).then(response=> response.json()).then(data=> obj.push(data)); //.then(data => console.log(data));
    //const obj= response.items;
    //console.log("a ver el obj");
    //console.log(obj);
    //obj.forEach(console.log);
    //let eing=JSON.parse(obj);
    //console.log(eing);
    //return fetch(url).then(response=>{return response.json()});
    //return JSON.parse(fetch(url).then(response=>{return response.json()}));
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

function removeElement(arr,val){
    let index=arr.indexOf(val);
    if(index!=-1){
        arr.splice(index);
    }
}

function solve(template){

let map=objectToMap(template);

let R=[], B=[], B1=[], B2=[], B3=[];

//let providers = readJson('./assets/providers.json');

providers=providers[0];

R=providers.R;

shuffle(R);

if(template.Random){
    B=providers.B;
    shuffle(B);
}else{
    B1=providers.B1;
    shuffle(B1);
    B2=providers.B2;
    shuffle(B2);
    B3=providers.B3;
    shuffle(B3);
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
/*let testmap=solve(mydata.R6Nucleus);
console.log(keeganString(testmap));*/

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

    if($("#template1").is(':checked')){
        myString+="6Nucleus"
    }

    //alert("2h");
    //let mydata2 = readJson('./assets/templates.json');
    //console.log(mydata2);
    //console.log(mydata2[0]);

    console.log(templates);
    //console.log(providers);
    //console.log(templates["R6Nucleus"]);
    console.log(templates[0]);
    //console.log(templates[0].R6Nucleus);

    let map=solve(templates[0].R6Nucleus);
    console.log(map);
    //alert("fin ejecucion");
    alert(keeganString(map));
    document.getElementById("finalString").innerHTML=myString;


}

