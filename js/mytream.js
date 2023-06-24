var navbar=document.querySelector('.nav');
var container=document.querySelector('.container');
usersdata="";
document.getElementById('hamclk2').addEventListener('click',(e=>{
    console.log(90);
    navbar.classList.toggle('navshow');

}))

var readMyTeamData="";
readMyTeamData=JSON.parse(localStorage.getItem('myteamdata'));
var header;


if(readMyTeamData.length!=0){
    container.innerHTML="";
    console.log(readMyTeamData);
    readMyTeamData=readMyTeamData.filter(function(e){
        return e;
    })
    if(readMyTeamData.length==0){
        // console.log(80);
    
            header=document.createElement('h2');
            header.innerHTML="You have not added team members yet...";
            container.appendChild(header);
    
        
    }
    console.log(readMyTeamData);
    readMyTeamData.forEach(function(e,i){
        // console.log(e);
        usersdata=
        '<div class="user">'+
        '<img src='+e.avatar+' alt="user">'+
        '<h3>Name: <span>'+e.name+'</span></h3>'+
        '<p>ID: <span>'+e.id+'</span></p>'+
        '<p>CreatedAt: <span>'+e.createdAt+'</span></p>'+
        // '<p>Website:<span><a href="#">'+e.avatar+'</a></span></p>'+
        // '<p>website:<p><a href="#">'+e.avatar+'</a></p></p>'+
        ' <div class="closebtn">Remove From Team</div>'+
    '</div>'

       container.innerHTML+=usersdata ;
    })
  

    allclosebtn=document.getElementsByClassName('closebtn');
    Array.from(allclosebtn).forEach((e,i)=>{
        e.addEventListener('click',((e)=>{
            // console.log(readMyTeamData);
            console.log(i);
            readMyTeamData.splice(i,1,"");
            console.log(readMyTeamData);
            if(readMyTeamData.length==0){
                header=document.createElement('h2');
        header.innerHTML="You have not added team members yet...";
        container.appendChild(header);
            }
            
            // console.log(readMyTeamData);
            localStorage.setItem('myteamdata',JSON.stringify(readMyTeamData));
        // console.log( e.target.parentElement);
        e.target.parentElement.remove();
        allclosebtn=document.getElementsByClassName('closebtn');
        }))
    })
}
