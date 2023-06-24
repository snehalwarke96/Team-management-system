var btntoshow= document.getElementById('btntoshow');
var container=document.querySelector('.container');
var navbar=document.querySelector('.nav');
var errorshow=document.querySelector('.errorshow');
var usersdata;
var api_data="";
var allclosebtn="";
var myteam=[];

var flag=false;



var readMyTeamData="";
readMyTeamData=JSON.parse(localStorage.getItem('myteamdata'));


if(readMyTeamData!= null){
    // console.log(readMyTeamData);
    readMyTeamData=JSON.parse(localStorage.getItem('myteamdata'));
    // console.log(readMyTeamData);
    readMyTeamData.forEach(function(e,i){
    myteam.push(e);
    // console.log(e);

    })
}
else{
    myteam=[];
    console.log(90);
}

Api_call("GET","https://teknopointstaging.com/api/mock/users.json").then(function(resolve){
    resolve=JSON.parse(resolve);
    api_data=resolve.items;
    // console.log(api_data);
    rederonDOM(api_data);
   
}).catch(function(reject){
    console.log(reject);
})

function Api_call(method,url){
    return new Promise((resolve, reject) => {
        let XML = new XMLHttpRequest();
        XML.open(method, url)
        XML.onload=function(){
            if(this.status==200){
                resolve(this.response)
            }
            else{
                reject("not found")
            }
        }
        XML.send();
        })
}


function rederonDOM(api_data){
    api_data.forEach(function(e,i){
        usersdata=
        '<div class="user">'+
        '<img src='+e.avatar+' alt="user">'+
        '<h3>Name: <span>'+e.name+'</span></h3>'+
        '<p>ID: <span>'+e.id+'</span></p>'+
        '<p>CreatedAt: <span>'+e.createdAt+'</span></p>'+
        ' <div class="closebtn">Add to Team</div>'+
    '</div>'

       container.innerHTML+=usersdata ;
    })
    allclosebtn=document.getElementsByClassName('closebtn');
    Array.from(allclosebtn).forEach((e,i)=>{
        e.addEventListener('click',(e=>{
            // console.log(myteam);
        // console.log(api_data[i].id);
        if(myteam.length==0){
         
            myteam.push(api_data[i]);
            localStorage.setItem("myteamdata",JSON.stringify(myteam))
            console.log('New Team Member');
            console.log(808);
            errorshow.innerHTML='New Team Member';
            flag=false;
        }
        else{
            flag=false;
            myteam.forEach(function(e){
                if(e.id==api_data[i].id){
                    flag=true;   
                }
             
            })
            if(!flag){
             
                console.log('New Team Member');
                myteam.push(api_data[i]);
                localStorage.setItem("myteamdata",JSON.stringify(myteam));
                errorshow.innerHTML='New Team Member';
                // console.log(301);
            }
            else{
                // console.log(401);
                console.log('Error:Team Member has already added');
                errorshow.innerHTML='Error:Team Member has already added';
            }
        }
        setTimeout(() => {
            errorshow.innerHTML='';
        }, 2000);
       
       
        }))
    })
}

document.getElementById('hamclk').addEventListener('click',(e=>{
    console.log(90);
    container.classList.toggle('hidden');
    navbar.classList.toggle('navshow');

}))


