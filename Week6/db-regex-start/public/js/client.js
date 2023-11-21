window.onload = function () {
  console.log("we are loaded");
let responseDiv = document.querySelector("#responseContainer");
  //runa ssaerach request -- get back all entries which match the $geonear criteria (see server)
  document.querySelector("#findData").addEventListener(
    "click",

    async function () {
   
        let exp = document.querySelector("#inputRegex").value;
        let response = await fetch(
        `http://localhost:4200/sendSearch?${new URLSearchParams({exp})}`
      );
      console.log("the response::: ");
      responseDiv.innerHTML ='';
      let jsonRep = await response.json();
      for(let i=0; i<jsonRep.length; i++){
        console.log(jsonRep[i])
        let p = document.createElement("p");
       
        p.innerHTML = 
        `<span class = "title">feature_type: </span> ${jsonRep[i].feature_type}<br/> 
        <span class = "title"> chart: </span> ${jsonRep[i].chart}<br/>
        <span class = "title"> level: </span> ${jsonRep[i].watlev}<br/>`;
        responseDiv.appendChild(p);

      }
    }
  ); //click
};
