import { useAuth } from './helpers/helpers';

function Dashboard(props){
    const {
        peoples,
        errorMessage,
        handleUpdate,
        logout
    } = useAuth();    


   return (
        <div className="dashboard">
            <p>Hi {props.user.firstName}, Your are logged in</p>
            <ol>
                {peoples.map(function(people, i){
                    return <li key={i}>{people}</li>;
                })}
            </ol>
            <div className="messages">
                {errorMessage()}
            </div>
            <form id="updateValue" onSubmit={handleUpdate}>
                <div>
                    <label className="label">Index no:</label>
                    <input className="input" type="number" name="index" min="1" max={peoples.length} />
                </div>

                <div>
                    <label className="label">Text:</label>
                    <input className="input" type="text" name="text" />
                </div>

                <button className="btn" type="submit">
                    Update
                </button>
            </form>

            <button className='btn' type='submit' onClick={logout}>Log Out</button>
        </div>
   ); 
}

export default Dashboard;