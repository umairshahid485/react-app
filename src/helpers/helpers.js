import { useState } from 'react';
import validator from 'validator';


export function useAuth(){
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg,setMsg] = useState('All fields are required');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const disabled = (error)?"disabled":"";

    const handlePassword = (e) => {
        if(e.target.value.length < 6){
            setSubmitted(false);
            setMsg('Passowrd length should be greater >= 6')
            setError(true);
        }else{
            setMsg('')
            setError(false);
        }
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleFname = (e) => {
        setFname(e.target.value);
        setSubmitted(false);
    };
    
    const handleLname = (e) => {
        setLname(e.target.value);
        setSubmitted(false);
    };
    
    // Handling the email change
    const handleEmail = (e) => {
        var email = e.target.value;
        if (validator.isEmail(email)) {
            setMsg('')
            setError(false);
        }else{
            setMsg('Invalid email address!');
            setError(true);
        }
        setEmail(email);
        setSubmitted(false);
    };
    
    
    
    // Handling the form submission
    let handleSubmit = async (e) => {
        e.preventDefault();
        if (fname === '' || lname === '' || email === '' || password === '') {
            setError(true);
        } else {
            try{
                let res = await fetch("http://localhost:4000/users/register", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: fname,
                        lastName: lname,
                        username: email,
                        password: password,
                    }),
                });
                //let resJson = await res.json();
                if (res.status === 200) {
                    setSubmitted(true);
                    setError(false);
                }
                console.log(res);
            } catch (err) {
                console.log(err);
            }
            
        }
    };
    
    
    // Showing success message
    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h1>User {fname} successfully registered!!</h1>
        </div>
        );
    };
    
    // Showing error message if error is true
    const errorMessage = () => {
        return (
        <div
            className="error"
            style={{
            display: error ? '' : 'none',
            }}>
            <h1>{errorMsg}</h1>
        </div>
        );
    };

    let handleSubmitLogin = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
        setError(true);
        } else {
            try{
                let res = await fetch("http://localhost:4000/users/authenticate", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: email,
                        password: password,
                    }),
                });
                let resJson = await res.json();
                if (res.status === 200) {
                    localStorage.setItem('user',JSON.stringify(resJson));
                    setSubmitted(true);
                    setError(false);
                    setUser(resJson);
                }

                if(res.status === 400){
                    setError(true);
                    setMsg(resJson.message);
                }
               
            } catch (err) {
               
            }
        }
    };

    const successMessageLogin = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h1>User {user && user.firstName} LoggedIn successfully!!</h1>
        </div>
        );
    };

    const peoplesArr = ["Imran","kashif","Yasir","Jawad","khalid","Rehman","Saad","Rizwan","Ali","Raza"];
    const [peoples,setPeoples] = useState(peoplesArr);

    const handleUpdate = (event) => {
        event.preventDefault();
        var ind = event.target.index.value;
        var text = event.target.text.value;
        if(ind === "" || text === ""){
            setError(true);
        }else if(isNaN(ind)){
            setMsg("Invalid index!!");
            setError(true);
        }else{
            setError(false);
        }
        //console.log(peoples);
        const newpeoples = [...peoples];
        newpeoples[ind-1] = text;
        setPeoples(newpeoples);
        
    }

    const logout = (e) => {
        e.preventDefault();
        window.localStorage.removeItem("user");
        window.location.href = "/login";
    }

    return {
        fname,
        lname,
        email,
        password,
        disabled,
        user,
        peoples,
        handlePassword,
        handleFname,
        handleLname,
        handleEmail,
        errorMessage,
        successMessage,
        handleSubmit,
        handleSubmitLogin,
        successMessageLogin,
        handleUpdate,
        logout
    }

}
