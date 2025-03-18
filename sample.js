let inputName = document.getElementById('grocery');
let errorMessage = document.querySelector('.alert');
let listAppendingDiv = document.querySelector('.grocery-list');
let submit = document.querySelector('.submit-btn');
let check = true;
let arr =JSON.parse(localStorage.getItem('groceryitems'))|| [];
let obj = {};
let editId;
let editTarget;

window.onload=()=>{
    arr.forEach(x=>{
        appendingValues(x.productName)
    })
}

submit.addEventListener('click',(e)=>{
    e.preventDefault();

    let checkInput=/[@.#$!%^&*.?]/g.test(inputName.value)
    if(inputName.value.trim() == ""){errorMessage.className="alert-danger"; errorMessage.textContent="Input field is empty";  return}
    else if(checkInput){errorMessage.className="alert-danger"; errorMessage.textContent="Not include special characters"; return}
    else{
        errorMessage.className='alert-success';
        errorMessage.textContent="data added successfully !";
    }

    if(check==false){
        arr.forEach(x=>{
            if(x.productId == editId){
                x.productName=inputName.value
            }
        })
        editTarget.textContent=inputName.value
        localStorage.setItem('groceryitems',JSON.stringify(arr))
        inputName.value=""
        check=true; submit.textContent='submit'
        return
    }
    obj={productId:Math.random(),productName:inputName.value}
    arr.push(obj)
    console.log(arr)
    localStorage.setItem('groceryitems',JSON.stringify(arr))
    appendingValues(obj.productName)
    inputName.value=""

})

function appendingValues(itemname){
    let li = document.createElement('li')
    li.innerHTML = `<p>${itemname}</p>
    <i class="fa-solid fa-pen-to-square edit-btn"></i>
    <i class="fa-solid fa-trash delete-btn"></i>`
    listAppendingDiv.append(li)
}

listAppendingDiv.addEventListener('click',(e)=>{
    if(e.target.classList.contains('fa-pen-to-square')){ 
        inputName.value=e.target.parentElement.firstElementChild.textContent
        arr.forEach(x=>{
            if(x.productName==e.target.parentElement.firstElementChild.textContent){
                editId=x.productId                
            }
        })
        editTarget=e.target.parentElement.firstElementChild
        submit.textContent="edit";
        check=false
    }
    else if(e.target.classList.contains('fa-trash')){
        let deleteid;
       arr.forEach((x)=>{
        if(x.productName == e.target.parentElement.firstElementChild.textContent){
            deleteid=x.productId
        }
       })
       arr= arr.filter(n=>{return n.productId!=deleteid})
       e.target.parentElement.remove();
       errorMessage.className="alert-danger"; errorMessage.textContent="Item removed successfully";
    }
    localStorage.setItem('groceryitems',JSON.stringify(arr))
})

editId="";
editTarget="";

document.querySelector('.clear-btn').addEventListener('click',()=>{
    listAppendingDiv.remove();
    arr=[]
    localStorage.setItem('groceryitems',JSON.stringify(arr))
})

