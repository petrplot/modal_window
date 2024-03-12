const headerBox = document.querySelector('.header__auth')
const reg = document.querySelector('.auth__registr')
const login = document.querySelector('.auth__login')
const logout = document.querySelector('.auth__logout')
const hiBlock = document.querySelector('.auth__hi')
let isAuth = false


if (isAuth) {
    authTrue()
}else{
    authFalse()
}

headerBox.addEventListener('click',(e)=>{
        if(e.target.classList.contains('logout')){
            authFalse()
        }
        
    })

function authTrue(params) {
    logout.classList.remove('hidden')
    hiBlock.classList.remove('hidden')
    login.classList.add('hidden')
    reg.classList.add('hidden')
}
function authFalse() {
    logout.classList.add('hidden')
    hiBlock.classList.add('hidden')
    login.classList.remove('hidden')
    reg.classList.remove('hidden')
}


const links = document.querySelectorAll('.link-popap')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')
let unlock = true

const timeout = 800

if (links.length > 0) {
    for (let i = 0; i < links.length; i++) {
        const popapLink = links[i];
        popapLink.addEventListener('click',(e)=>{
            const popapName = popapLink.getAttribute('href').replace('#', '')
            const curentPopap = document.getElementById(popapName)
            popapOpen(curentPopap)
            e.preventDefault()
        })
    }
}

const popapCloseIcon = document.querySelectorAll('.close-popap')

if(popapCloseIcon.length > 0){
    for (let i = 0; i < popapCloseIcon.length; i++) {
        const el = popapCloseIcon[i];
        el.addEventListener('click',(e)=>{
            popapClose(el.closest('.modal'))
            e.preventDefault()
        })
    }
}

function popapOpen(popap) {

    if(popap&&unlock){
        const popapActive = document.querySelector('.modal.open')
        if(popapActive){
            popapClose(popapActive, false)
        }else{
            bodyLock()
        }
        popap.classList.add('open')
        popap.addEventListener('click',(e)=>{
            if(!e.target.closest('.modal__content')){
                popapClose(e.target.closest('.modal'))
            }
        })
    }
}

function bodyLock() {
    // let lockPaddingValue = document.body.scrollWidth - document.body.clientWidth
    // console.log(lockPaddingValue);
    let lockPaddingValue = "0px"

    if(lockPadding.length > 0){
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRigth = lockPaddingValue
        } 
    }
    
    body.style.paddingRight = lockPaddingValue
    
    body.classList.add('lock')
    unlock = false
    setTimeout(() => {
        unlock = true
    }, timeout);
}

function popapClose(popap,doUnlock = true) {
    if (unlock) {
        popap.classList.remove('open')
        if (doUnlock) {
            bodyUnlock()
        }
    }
}

function bodyUnlock(params) {

    setTimeout(() => {
        if(lockPadding.length > 0){
             for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRigth = '0px'
            }
        }

        body.style.paddingRight = '0px'
        body.classList.remove('lock')

    }, timeout);

    unlock = false
    setTimeout(() => {
        unlock = true
    }, timeout);
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        const popapActive = document.querySelector('.modal.open')
        popapClose(popapActive)
    }
})


// //полифилы не работают
// (function x(){

//     // проверяем поддержку
//     if (!Element.prototype.closest) {
  
//       // реализуем
//       Element.prototype.closest = function(css) {
//         var node = this;
  
//         while (node) {
//           if (node.matches(css)) return node;
//           else node = node.parentElement;
//         }
//         return null;
//       };
//     }
  
//   })();

//   (function a(){

//     // проверяем поддержку
//     if (!Element.prototype.matches) {
  
//       // определяем свойство
//       Element.prototype.matches = Element.prototype.matchesSelector ||
//         Element.prototype.webkitMatchesSelector ||
//         Element.prototype.mozMatchesSelector ||
//         Element.prototype.msMatchesSelector;
  
//     }
  
//   })();


  let eyeIcon = document.querySelectorAll('#eyeicon')
  let password = document.querySelectorAll('#pass')
    eyeIcon.forEach((btn, i) =>{
        btn.addEventListener('click',()=>{
            if(password[i].type =='password'){
                password[i].type = 'text'
                btn.src = 'img/eye.svg'
            }else{
                password[i].type = 'password'
                btn.src = 'img/eye-off.svg'
            }
        })
    })

function validation(form) {

    let res = true

    form.querySelectorAll('.input__inp').forEach((input)=>{

        removeError(input)
            
        if(input.dataset.pass === 'true'){
            if(input.value.length >= 6 && input.value.length < 8 ){
                paswordPowerRemove(input)
                paswordPowerShow(input, 'lose')
            }
            if(input.value.length >= 8 && input.value.length < 10 ){
                paswordPowerRemove(input)
                paswordPowerShow(input, 'normal')
            }
            if(input.value.length >= 10 && input.value.length < 12 ){
                paswordPowerRemove(input)
                paswordPowerShow(input, 'hard')
            }
            if(input.value.length >= 12){
                paswordPowerRemove(input)
                paswordPowerShow(input, 'superhard')
            }
            if(input.value.length > 16){
                paswordPowerRemove(input)
            }
        }

        if(input.dataset.min ){
            if(input.value.length < input.dataset.min){
                removeError(input)
                paswordPowerRemove(input)
                createError(input, `минимальное количество символов:${input.dataset.min}` )
                res = false
            }
        }
        
        if(input.dataset.max ){
            if(input.value.length > input.dataset.max){
                removeError(input)
                createError(input, `максимальное количество символов:${input.dataset.max}` )
                res = false
            }
        }

        if(input.dataset.check == 'true'){
            if (input.value == '') {
                removeError(input)
                paswordPowerRemove(input)
                createError(input,'Важно заполнить это поле')
                res = false
            }
        }
        
    })
    return res
}

function paswordPowerShow(input, status) {

    const parent = input.parentNode;

    const box = document.createElement('div')
    const img = document.createElement('img')
    const p = document.createElement('p')

    box.classList.add('password__'+status)
    box.classList.add('box')

    box.insertBefore(p, null)
    box.insertBefore(img,p)

    switch (status) {
        case 'lose':
            img.src ='img/circlered.svg'
            p.innerText = 'Слабый пароль'
            break;
        case 'normal':
            img.src ='img/circleyelllo.svg'
            p.innerText = 'Средний пароль'
            break;
        case 'hard':
            img.src ='img/circlegreen.svg'
            p.innerText = 'Сильный пароль'
            break;
        case 'superhard':
            img.src ='img/circleviolet.svg'
            p.innerText = 'Суперсильный пароль'
            break;
    }

    parent.insertAdjacentHTML('beforeend', box.outerHTML)
     
}

function createError(input, text) {

    const parent = input.parentNode;
    const errorMessage = document.createElement('p')

    errorMessage.classList.add('error-text')
    errorMessage.textContent = text

    parent.classList.add('error')
    parent.append(errorMessage)

}

function removeError(input) {
    const parent = input.parentNode;
    if(parent.classList.contains('error')){
        parent.querySelector('.error-text').remove()
        parent.classList.remove('error')
    }
}

function paswordPowerRemove(input) {

    const parent = input.parentNode;
    const child = parent.querySelector('.box')

    if(child){
        parent.removeChild(child)
    }
}


let res = false

document.getElementById('f1').addEventListener('input',function(e){
   e.preventDefault()
    res = validation(this)

})

function submitClear( inputList ) {
        inputList.forEach((input)=>{
            input.value = ''
            removeError(input)
            paswordPowerRemove(input)
            popapClose(input.closest('.modal'))
            authTrue()
        })
        
       
}
const inputList = document.getElementById('f1').querySelectorAll('input')
const btnSubmit = document.getElementById('f1').querySelector('.btn')
btnSubmit.addEventListener('click', ()=>{
        if(res){
            submitClear(inputList)
            res = false
        }
    })

 
   
    
     

document.getElementById('f2').addEventListener('input',function(e){
    e.preventDefault()
    res = validation(this)
})
  

const inputList2 = document.getElementById('f2').querySelectorAll('input')
const btnSubmit2 = document.getElementById('f2').querySelector('.btn')
btnSubmit2.addEventListener('click', ()=>{
            if(res){
                submitClear(inputList2)
                res = false
            }
})