import Dashboard from './Dashboard';
import { useAuth } from './helpers/helpers';

function Login(){

    const {
        user,
        email,
        password,
        disabled,
        handlePassword,
        handleEmail,
        errorMessage,
        successMessageLogin,
        handleSubmitLogin
    } = useAuth();
 
    
    if(user){
        return (<Dashboard user={user} />);
    }

    return (
        <div className="form">
            <div>
                <h1>Login</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessageLogin()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                value={email} type="email" />

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                value={password} type="password" />

                <button onClick={handleSubmitLogin} className="btn" type="submit" disabled={disabled}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login;