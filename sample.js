let inputName = document.getElementById('grocery');
let errorMessage = document.querySelector('.alert');
let listAppendingDiv = document.querySelector('.grocery-list');
let submit = document.querySelector('.submit-btn');
let check = true;
let ele;
let arr =JSON.parse(localStorage.getItem('groceryitems'))|| [];
let obj = {};

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
        let val=ele.textContent;
        ele.textContent=inputName.value
        arr.forEach(x=>{
            if(x.productName == val){
                x.productName=ele.textContent
            }
        })
        localStorage.setItem('groceryitems',JSON.stringify(arr))
        inputName.value=""
        check=true; submit.textContent='submit'
        return
    }

    obj={productId:Math.random(),productName:inputName.value}
    arr.push(obj)
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
        ele=e.target.parentElement.firstElementChild;
        inputName.value=ele.textContent
        submit.textContent="edit";
        check=false
    }
    else if(e.target.classList.contains('fa-trash')){
       arr=arr.filter((x)=>{
        return x.productName != e.target.parentElement.firstElementChild.textContent
       })
       e.target.parentElement.remove();
       errorMessage.className="alert-danger"; errorMessage.textContent="Item removed successfully";
    }
    localStorage.setItem('groceryitems',JSON.stringify(arr))
})

ele='';

document.querySelector('.clear-btn').addEventListener('click',()=>{
    listAppendingDiv.remove();
    arr=[]
    localStorage.setItem('groceryitems',JSON.stringify(arr))
})

