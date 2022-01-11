// Selectors
var email = $('#email');
var password = $('#password');
var confirmPassword = $('#confirmPassword');
var signInForm = $('#signInForm');
var signUpForm = $('#signUpForm');

// Event Listeners
$("#signInForm").submit(function (event) { signIn(event) });
$("#signUpForm").submit(function (event) { signUp(event) });
$('#signOutBtn').click(function () { signOut() });

// Functions
function signIn(e) {
    e.preventDefault();

    //sign in - ajax request
    if (email.val() && password.val()) {
        $.post('http://localhost:3001/api/auth/signIn', { 
            email: email.val(),
            password: password.val()
        })
            .then(function (data) {
                if (data.token) {
                    localStorage.setItem('token', data.token)
                }

                if (data.completedMeasurements) {
                    localStorage.setItem('completedMeasurements', 'true')
                } else {
                    localStorage.setItem('completedMeasurements', 'false')
                }
                //check if user completed onboarding flow
                if (data.token && data.completedMeasurements) {
                    window.location.href = "http://localhost:3001/dashboard.html"
                } else if (data.token && !data.completedMeasurements) {
                    window.location.href = "http://localhost:3001/onboarding.html"
                }
            })
            .catch(function (err) {
                alert("There was a problem signing in")
            })
    } else {
        alert("Check your input")
    }
}

// Functions
 //sign up - ajax request
function signUp(e) {
    e.preventDefault();

    if (email.val() && password.val() && password.val() === confirmPassword.val()) {
        $.post('http://localhost:3001/api/auth/signUp', {
            email: email.val(),
            password: password.val()
        })
            .then(function (data) {
                signIn(e)
            })
            .catch(function (err) {
                alert("There was a problem signing up")
            })
    } else {
        alert("Check your input")
    }
}

function signOut() {
    localStorage.clear()
    window.location.href = "http://localhost:3001/index.html"
}