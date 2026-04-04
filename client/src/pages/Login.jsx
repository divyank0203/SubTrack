import { useState } from "react";
import API from "../utils/api.js";



function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlelogin = async (e) => {
        e.preventDefault();
        try{
            const res = await API.post('/auth/login', {
                email,
                password
            })
            localStorage.setItem('token', res.data.token);
            alert("Login successful");

        }
        catch(error){
            alert("Login error: ", error.message);
        }
        
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 shadow-md">

            <form 
            onSubmit={handlelogin}
            className="bg-white p-6 rounded-xl shadow-md w-80"
            >
                <h2 className=" text-xl font-bold mb-4 text-center">Sign in to Subtrack</h2>
                <input type="email" className="w-full p-2 mb-3 border rounded border-gray-400" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="w-full p-2 mb-3 border rounded border-gray-400" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-slate-400 hover:bg-slate-800 rounded-lg p-2 text- w-full hover:text-white " >
                    Login
                    </button>
            </form>
        </div>
    )
}

export default Login;