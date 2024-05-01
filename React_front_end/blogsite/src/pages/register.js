import React from "react";
import './register.css'



export default function Register(){




return(
<div  className="body">

<div class="container">
        <h2>Create an Account</h2>
        <form action="/register" method="post" id="registrationForm">
            <div>
          <label for="email">Email:</label>
                <input type="email" id="email" name="useremail" />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="userpassword" />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" name="username" />
            </div>
            <button type="submit"><a>Register</a></button>
            <h5>already have  an account.<a id="haveAccount" href="/login">Log in</a></h5>
        </form>
        
    </div>
</div>


)
}