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

    const fields = {
        email : document.querySelector('#email').value.trim(),
        password : document.querySelector('#password').value
    }

    let errs = 0;
    const errMsgs = [];
    const errbox = document.querySelector('.errbox');
    errbox.innerHTML = null;


    if(!validator.isEmail(fields.email)){
        errs++;
        errMsgs.push('<p>Please enter a valid email address.</p>');
    }

    if(!validator.isLength(fields.password, {min:1})){
        errs++;
        errMsgs.push('<p>Please enter a password.</p>');
    }

    if(errs){
        for(let msg of errMsgs){
            errbox.insertAdjacentHTML('beforeend', msg);
        }
    } else {

        disableButton();

        fetch('http://localhost:3000/user/login', {
            method : 'POST',
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
            }

            if(resp.okMsg){

                window.location.replace('/quiz');

            }


        })
        .catch(e => {
            enableButton();
            errbox.innerHTML = '<p>Your request could not be processed.</p>';
        });



    }
});