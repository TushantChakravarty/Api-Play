console.log("hello")
function addelement(string){
    let div=document.createElement("div")
    div.innerHTML=string;
    return div.firstElementChild
}
let parameterbox=document.getElementById("parameterbox");
//hide the json initially 
jsonbox=document.getElementById("jsonbox");
jsonbox.style.display="none";
let pbox=document.getElementById("newparam")
let paramsradio=document.getElementById("paramsradio");
//if someone clicks on params radio, hide the json box
paramsradio.addEventListener("click",()=>{
   
jsonbox.style.display="none";
pbox.style.display="block";
parameterbox.style.display="block";
})
//if someone clicks on json radio, hide the parameter box
let jsonradio=document.getElementById("jsonradio");
jsonradio.addEventListener("click",()=>{
    
    parameterbox.style.display="none";
    pbox.style.display="none";
    jsonbox.style.display="block";
})
let i=0;
let newbtn=document.getElementById("plus");
newbtn.addEventListener("click",()=>{
   
    let newparam=document.getElementById("newparam");
    let string=`<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">parameters ${i+2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="key${i+2}" placeholder="enter parameter ${i+2} key">
    </div>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="value${i+2}" placeholder="enter parameter ${i+2} value">
    </div>
    <button id="plus" class="btn btn-primary deleteelement">-</button>`
    let paramelement=addelement(string);
    console.log(paramelement);
    newparam.appendChild(paramelement);
   
    let deleteelement=document.getElementsByClassName("deleteelement");
    for(item of deleteelement){
        item.addEventListener("click",(e)=>{
            
            if(confirm("do you want to delete?")){
                e.target.parentElement.remove();
            i--;}
            
        })
    }
    i++;
})
let submit=document.getElementById("submit")
submit.addEventListener("click",()=>{
document.getElementById("responsetxt").innerHTML="please wait....fetching data"
let url=document.getElementById("url").value;
let request=document.querySelector("input[name='request']:checked").value;
let content=document.querySelector("input[name='contenttype']:checked").value;

console.log(url)
console.log(request)
console.log(content)
if(content==`custom`){
    data={};
    for(let j=0;j<i+1;j++){
        if(document.getElementById("key"+(j+1))!=undefined){
        let key=document.getElementById(`key`+(j+1)).value;
        let value=document.getElementById(`value`+(j+1)).value;
 data[key]=value;
}
    }
    data=JSON.stringify(data);
}
else{
    data=document.getElementById("requestjsonbox").value;
}
console.log(data)
console.log(i)
if(request=='GET'){
    fetch(url,{
        method:'GET',
    })
    .then(response=>response.text())
    .then((text)=>{
        document.getElementById("responsetxt").innerHTML=text;
        Prism.highlightAll();
    })
}
else{
    fetch(url,{
        method:'POST',
        body:data,
        headers:{
            "content-type":"application/json;charset=UTF-8"
        }
    })
    .then(response=>response.text())
    .then((text)=>{
        document.getElementById("responsetxt").innerHTML=text;
    Prism.highlightAll();
    })
}
})
url.value="";
document.getElementById("key1").value="";
document.getElementById("value1").value="";
document.getElementById("requestjsonbox").value="";
   