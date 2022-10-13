
const messageContainer=document.querySelector(`.list_of_replies`)
const container=document.querySelector(".container")

if(JSON.parse(localStorage.getItem("data"))==undefined){
    fetch("./data.json")
    .then((res)=>res.json())
    .then(data=>{
        
        localStorage.setItem("data",JSON.stringify(data.comments))
        localStorage.setItem("currentUser",JSON.stringify(data.currentUser))
        
        createComments(data.comments)
    })
}
let comments=JSON.parse(localStorage.getItem("data"))
let currentUser=JSON.parse(localStorage.getItem("currentUser"))



createComments(comments)

container.addEventListener("click",(event)=>{
    
    let {type,id}=event.target.dataset
    if(type=="increment"){
        comments.forEach(comment => {
            if(comment.id==id){
                comment.score=comment.score+1
                // let parent=event.target.parentElement.parentElement
                // let score=parent.querySelector(".like_count")
                // score.innerHTML=comment.score
                localStorage.setItem("data",JSON.stringify(comments))
                comments=JSON.parse(localStorage.getItem("data"))
            }
        });
    }
    else if(type=="decrement"){
        comments.forEach(comment => {
            if(comment.id==id){
                comment.score=comment.score-1
                localStorage.setItem("data",JSON.stringify(comments))
                comments=JSON.parse(localStorage.getItem("data"))
            }
        });
    }
    else if(type=="addNew"){
        let content=document.querySelector(`#send_input`)
        if(content.value===""){
            alert("please type on inputbox")
        }
        else{
            let id=Math.random()*100
            comments.push(createComment(id,content.value,"today"))
            localStorage.setItem("data",JSON.stringify(comments))
            comments=JSON.parse(localStorage.getItem("data"))
            document.querySelector(`#send_input`).value= ""
        }
    }
    else if(type=="delete"){
        comments=comments.filter((comment)=>comment.id!=id)
        localStorage.setItem("data",JSON.stringify(comments))
        comments=JSON.parse(localStorage.getItem("data"))
            
    }
    clearComments()
    
    createComments(comments)
    

})

function clearComments(){
    messageContainer.innerHTML=""
}
function createComments(comments){
   
    let elems=comments.map(comment => {
        return createMessage(comment)
     }).join("")

     messageContainer.innerHTML=elems
     

}


function createMessage(e){
    const message=`<li  class="message">
            <div class="message_container">
            <div class="likes">
                <div>

                    <img data-id=${e.id} data-type="increment"  src="./images/icon-plus.svg"/>
                </div>
                <div>
                    <span id="like-count${e.id}" class="like_count ${e.id}">${e.score}</span>
                </div>
                <div>
                    <img data-id=${e.id} data-type="decrement" src="./images/icon-minus.svg"/>
                </div>
            </div>
            <div class="message_body">
                <div class="message_navbar">
                    <div class="message_navbar_left">
                    <img src=${e.user.image.png} alt="logo"/>
                    <p class="name">${e.user.username}</p>
                    <p class="time">${e.createdAt}</p>
                    </div>
                    <div class="message_navbar_right">
                            <img data-id=${e.id} data-type="delete" src="./images/icon-delete.svg"/>  
                    </div>

                </div>
                <div class="message_content">
                    <p>
                        ${e.content}
                    </p>
                </div>
            </div>
            </div>   
            </li>
            
    `

    return message
}




function createComment(id,content,date){
    
    return {
        "id": id,
        "content": content,
        "createdAt": date,
        "score": 0,
        "user": {
            "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
        },
        "replies": []
    }
}