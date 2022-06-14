new bootstrap.Popover(
    document.querySelector("#log-in-btn-popover"),
    {
        html: true,
        placement: "bottom",
        sanitize: false,
        content: `
<form action="/log-in" method="post">
<label for="log-in-phone-input" class="text-light">Phone:</label><br>
<input type="tel" class="form-control mb-1 p-1 px-2" id="log-in-phone-input" placeholder="+380971234567" 
name="phone" required>

<label for="log-in-pw-input" class="text-light">Password:</label><br>
<input type="password" class="form-control p-1 px-2" id="log-in-pw-input" placeholder="********" 
name="password" required>
<a href="#" class="link-warning">Forgot Password?</a>
<button type="submit" class="btn btn-sm btn-warning mt-2 w-100 fw-bold">Log In</button>
</form>
`
    }
);