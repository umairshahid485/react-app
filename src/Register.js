import { useAuth } from './helpers/helpers';

export default function Register() {
const {
	fname,
	lname,
	email,
	password,
	disabled,
	handlePassword,
	handleFname,
	handleLname,
	handleEmail,
	errorMessage,
	successMessage,
	handleSubmit
} = useAuth();


return (
	<div className="form">
	<div>
		<h1>Register</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		{/* Labels and inputs for form data */}
		<label className="label">First name</label>
		<input onChange={handleFname} className="input"
		value={fname} type="text" />

        <label className="label">Last name</label>
		<input onChange={handleLname} className="input"
		value={lname} type="text" />

		<label className="label">Email</label>
		<input onChange={handleEmail} className="input"
		value={email} type="email" />

		<label className="label">Password</label>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />

		<button onClick={handleSubmit} className="btn" type="submit" disabled={disabled}>
		    Submit
		</button>
	</form>
	</div>
);
}
