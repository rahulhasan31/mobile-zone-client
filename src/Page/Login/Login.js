import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Shared/Hook/useToken';


const Login = () => {
    const { register,formState: { errors }, handleSubmit } = useForm();
    const {loginUser, googleLogin}=useContext(AuthContext)
    const [loginError, setLoginError]=useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();
    
  const from = location.state?.from?.pathname || '/'

 
  if (token) {
    navigate(from, { replace: true });
}

  
    const handleLogin=data=>{
        console.log(data);
        setLoginError('')
        loginUser(data.email, data.password)
        .then(result=>{
            const user=result.user
            console.log(user)
            setLoginUserEmail(data.email)
           
        })
        .catch(e=>{
            console.log(e.message)
            setLoginError(e.message)
        
        })
       }


       
       const handleGoogleLogin=()=>{
        googleLogin()
        .then(result=>{
            
            const user=result.user
                console.log(user)
        })
        .catch(e=>{console.log(e);})
      }
    return (
        <div className='h-[500px] flex justify-center items-center'>
        <div className='w-96 p-8'>
            <h2 className='text-xl text-center'>Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>


                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email"
                     {...register("email", {required: 'Email Address is required'})} 
                     
                     className="input input-bordered w-full max-w-xs" />
                       {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Password</span></label>
                    <input type="password" 
                    {...register("password", {required: "password is required",
                    minLength: {value: 6 , message: 'password must be siz character'}
                
                })}
                     className="input input-bordered w-full max-w-xs" />
                     {errors.Password && <p className='text-red-600'>{errors.Password?.message}</p>}
                     <div>
                    {
                        loginError && <p className='text-red-600'>{loginError}</p>
                    }
                </div>
                    <label className="label"> <span className="label-text">Forget Password</span></label>
                </div>
                <input className='btn btn-warning bg-orange-500 w-full text-white' value="Login" type="submit" />
               
            </form>
            <p className='text-center'>Dont have Account? <Link to={'/signup'}className='text-primary'>Create new account</Link></p>
            <div className="divider">OR</div>
            <button onClick={handleGoogleLogin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
        </div>
        <div>
        
        </div>
    </div>
    );
};

export default Login;