document.querySelector('#sign-up-form.needs-validation').addEventListener('submit',
    function (event) {
        const [pwInput, pw2Input] = document.querySelectorAll("#sign-up-form input[type='password']");
        const pwMatches = pwInput.value === pw2Input.value;

        if (this.checkValidity() && pwMatches)
            return;

        if (!pwMatches)
            pw2Input.nextElementSibling.classList.add("d-block");

        event.stopPropagation();
        event.preventDefault();
        this.classList.add("was-validated");
    }, false);