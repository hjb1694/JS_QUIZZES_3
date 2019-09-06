document.querySelector('#subbut').addEventListener('click', e => {
    e.preventDefault();


    const answerGroups = document.querySelectorAll('.question-tile__answer-group');
    let errs = 0;

    for(let i = 1; i <= answerGroups.length; i++){

        let radioGrp = document.querySelectorAll(`input[name="${i}"]`);

        
        function isChecked(grp){

            for(let item of grp){

                if(item.checked){

                    return true;

                }
            }

            return false;

        }

        !isChecked(radioGrp) ? errs++ : null;

    }

    if(errs){

        alert('Please finish the quiz before submitting.');

    } else {

        document.querySelector('#quizForm').submit();

    }


    });