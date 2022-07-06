/* eslint-disable no-unused-vars */
'use strict';

try {

    const
        // mobile navigation icon
        navIcon = document.querySelector(`.icon`),
        // site navigation menu
        navMenu = document.querySelector(`#myTopnav`),
        // signup buttons desktop + mobile
        signupButtons = document.querySelectorAll(`.modal-btn`),
        // signup form
        signupForm = document.querySelector(`form[name="reserve"]`),
        // signup form modal popup
        signupFormPopup = document.querySelector(`.bground`),
        // modal popup close button
        signupFormCloseButton = document.querySelector(`.close`);

    navIcon
        // Toggle navigation menu on mobile
        .addEventListener(`click`, () => (navMenu.className = navMenu.className === `topnav` ? `topnav responsive` : `topnav`));

    signupFormCloseButton
        // manage popup close button
        .addEventListener(`click`, () => (signupFormPopup.style.display = `none`));

    signupButtons
        // show signup popup
        .forEach(x => x.addEventListener(`click`, () => (signupFormPopup.style.display = `block`)));

    signupForm
        // manage form submission
        .addEventListener(`submit`, e => {
            try {

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

            } catch (err) {
                // write to console
                console.error(`error occured: ${ err.message }`);
                // prevent form submission
                e.preventDefault();
            }
        });

} catch (err) {
    // write to console
    console.error(`error occured: ${ err.message }`);
}