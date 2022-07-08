/* eslint-disable no-unused-vars */
'use strict';

try {

    const
        // elements list : mobile navigation icon, navigation menu, signup form, signup form modal popup, modal popup close button, modal popup post submission close button
        eltsSelectors = [ `.icon`, `#myTopnav`, `form[name="reserve"]`, `.bground`, `.close`, `#close-confirm` ],
        // retrieve DOM elements
        [ navIcon, navMenu, signupForm, signupFormPopup, signupFormCloseButton, signupFormConfirmCloseButton ] = eltsSelectors.map(x => document.querySelector(x)),
        // signup buttons desktop + mobile
        signupButtons = document.querySelectorAll(`.modal-btn`),
        // form fields list
        fldsSelectors = [ `#first`, `#last`, `#email`, `#birthdate`, `#quantity`, `input[name="location"]`, `#checkbox1` ];

    navIcon
        // Toggle navigation menu on mobile
        .addEventListener(`click`, () => (navMenu.className = navMenu.className === `topnav` ? `topnav responsive` : `topnav`));

    fldsSelectors
        // reset error message on input
        .forEach(x => document.querySelector(x).addEventListener(`input`, e => e.target.parentElement.removeAttribute(`data-error-visible`)));

    signupForm
        // manage form submission
        .addEventListener(`submit`, e => {
            const
                // check form fields validity
                submit = fldsSelectors
                    // ensure all error messages are displayed
                    .reduce((r, x) => {
                        const
                            // use nested destructuring on all possible properties
                            {parentElement, validity: {valueMissing, patternMismatch, typeMismatch, rangeUnderflow, rangeOverflow}} = document.querySelector(x),
                            // current field validity state
                            cfv = valueMissing || patternMismatch || typeMismatch ||  rangeUnderflow || rangeOverflow;
                        // display error message or reset
                        cfv ? parentElement.setAttribute(`data-error-visible`, `true`) : parentElement.removeAttribute(`data-error-visible`);
                        // update accumulator and return
                        return r && !cfv;
                    // form is valid by default
                    }, true);

            if (submit === true)
                // hide form and display the confirmation message
                signupForm.style.display = `none`;

            // prevent actual submission regardless of validity, ajax should be used to submit the form if the confirmation message is to be displayed weSmart
            e.preventDefault();
        });

    [ signupFormCloseButton, signupFormConfirmCloseButton ]
        // manage popup close buttons
        .forEach(x => x.addEventListener(`click`, () => (signupFormPopup.style.display = `none`)));

    signupButtons
        // manage popup open buttons
        .forEach(x => x.addEventListener(`click`, () => {
            // reset form
            signupForm.reset();
            // display form
            signupForm.style.display = `block`;
            // display popup
            signupFormPopup.style.display = `block`;
        }));

} catch (err) {
    // write to console
    console.error(`error occured: ${ err.message }`);
}

/* ERRORS MESSAGES ONE BY ONE

// check form fields validity
[ `#first`, `#last`, `#email`, `#birthdate`, `#quantity`, `input[name="location"]`, `#checkbox1`, `#checkbox2` ]
    .forEach(x => {
        const
            // use nested destructuring on all possible properties
            {parentElement, validity: {valueMissing, patternMismatch, typeMismatch, rangeUnderflow, rangeOverflow}} = document.querySelector(x);
        // if a field is failing
        if (valueMissing || patternMismatch || typeMismatch ||  rangeUnderflow || rangeOverflow) {
            // display error
            parentElement.setAttribute(`data-error-visible`, `true`);
            // throw error
            throw new Error(parentElement.getAttribute(`data-error`));
        // reset field
        } else {
            // remove error
            parentElement.removeAttribute(`data-error-visible`);
        }
    });

// bust modal popup contents and display a confirmation message
document.querySelector(`.modal-body`).innerHTML =
    `<div class="submit-confirm">
        <span>&nbsp;</span>
        <span>Merci pour votre inscription</span>
        <input type="button" id="close-confirm" class="btn-submit" value="Fermer" />
    </div>`;

document.querySelector(`#close-confirm`)
    // manage popup close button
    .addEventListener(`click`, () => (signupFormPopup.style.display = `none`));

*/