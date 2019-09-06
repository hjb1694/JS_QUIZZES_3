import validator from 'validator';

const subbut = document.querySelector('#subbut');

const disableButton = () => {
    subbut.disabled = true;
    subbut.classList.remove('btn--primary');
    subbut.classList.add('btn--disabled');
    subbut.innerHTML = '<img src="/blocks-spinner.gif" width="20px"/> Wait...';
}

const enableButton = () => {
    subbut.disabled = false;
    subbut.classList.remove('btn--disabled');
    subbut.classList.add('btn--primary');
    subbut.innerHTML = 'Submit';
}

subbut.addEventListener('click', e => {
    e.preventDefault();

    const errbox = document.querySelector('#errbox');
    errbox.innerHTML = null;

    let errs = 0;
    let errMsgs = [];

    const fields = {
        name : document.querySelector('#name').value.trim(), 
        email : document.querySelector('#email').value.trim(),
        password : document.querySelector('#password').value, 
        confirmPass : document.querySelector('#confirmPassword').value
    }

    const regs = {
        uppercase : /[A-Z]/g,
        lowercase : /[a-z]/g, 
        specialChar : /[1-9]/g
    }

    const error = (msg) => {
        errs++;;
        errMsgs.push(msg);
    }

    !validator.isLength(fields.name,{min:2}) ? error('<p>Please enter a valid name.</p>') : null;
    !validator.isEmail(fields.email) ? error('<p>Please enter a valid email address.</p>') : null;

    if(
        !validator.isLength(fields.password,{min:8}) || 
        !regs.uppercase.test(fields.password) || 
        !regs.lowercase.test(fields.password) || 
        !regs.specialChar.test(fields.password)){

        error('<p>Passwords must contain a minimum of 8 characters and contain at least on uppercase letter, one lowercase letter, and at least one number.</p>');

    }

    if(fields.password !== fields.confirmPass){
        error('<p>Confirm password does not match</p>');
    }


    if(errs){

        for(let msg of errMsgs){
            errbox.insertAdjacentHTML('beforeend', msg);
        }

    } else {

        disableButton();

        fetch('http://localhost:3000/user/register',{
            method: 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify(fields)
        })
        .then(resp => resp.json())
        .then(resp => {

            if(resp.error){
                enableButton();
                errbox.innerHTML = resp.error;
            }else if(resp.okMsg){
                window.location.replace('/quiz');
            } else {
                throw new Error();
            }


        })
        .catch(e => {
            enableButton();
            errbox.innerHTML = 'There was an issue processing your request';
        });


    }

    
});