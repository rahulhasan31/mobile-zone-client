import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import img from '../../assets/images/Secure login.gif'
import useToken from '../../Shared/Hook/useToken';

const Register = () => {
    const {createUser, updateUser}= useContext(AuthContext)
    const {register,handleSubmit, formState:{errors} }= useForm()
    const [signupError, setSignupError]= useState('')
    const [createUserEmail, setCreateUserEmail ]=useState('')
   
    const [token]=useToken(createUserEmail)

   const navigate=useNavigate
   ()
   
   const reload=()=>{
    window.location.reload();
   }

   if(token){
    navigate('/')
    reload()
   }

   

    const onSubmit=(data)=>{
        console.log(data);
        setSignupError('')
        createUser(data.email, data.password)
        .then(result=> {
            const user= result.user
            console.log(user);
           
            toast.success('Account Create Successfully !')
           
            const profile={
                displayName : data.name,
                role:data.role
            }
            updateUser(profile)
            .then(()=>{
                
              saveUser(data.name, data.email, data.role)
              
            })
        
        })
        .catch(e=>{
            console.log(e);
            setSignupError(e.message)
        })
    }
    const saveUser=(name, email, role )=>{
        const user= {name, email, role}
        fetch('https://y-alpha-sepia.vercel.app/users', {
            method:"POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setCreateUserEmail(email)
        })
    }

    return (
        <div className='h-[500px] flex justify-center items-center mt-12 mb-12 '>
        <div className='w-96 p-8'>
            <h2 className='text-xl text-center'>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text"
                    
                    {...register('name', {required: 'Name must be required'}
                    
                    )}
                     className="input input-bordered w-full max-w-xs" />
                        { errors.name && <p className='text-red-600'> {errors.name.message}</p> }

                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email"
                    
                    {...register("email", {required: 'email must be required' })}

                     className="input input-bordered w-full max-w-xs" />

                        { errors.email && <p className='text-red-600'> {errors.email.message}</p> }

                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Password</span></label>
                    <input type="password" 
                 
                 {...register("password", {required:'Give me Password',
                 minLength: {value: 6 , message: 'password must be six character'},
        pattern: {value : /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/ , message: 'password must be strong'}
                }
                
                 
                 )}
                     className="input input-bordered w-full max-w-xs" />
                      { errors.password && <p className='text-red-600'> {errors.password.message}</p> }
                  
                </div>
                <div>
                    {
                        signupError&& <p className='text-red-600'>{signupError}</p>
                    }
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Role</span></label>
                    <select 
                    {...register('role', {required: 'select your position'})}
                    
                    className="select input-bordered w-full max-w-xs">
      <option disabled selected>{}</option>
                    <option >user</option>
                     <option>seller</option>
    

                    </select>
                    { errors.role && <p className='text-red-600'> {errors.role.message}</p> }
                    <div>
                    {
                        signupError&& <p className='text-red-600'>{signupError}</p>
                    }
                </div>

                </div>
                <input className=' btn btn-warning bg-orange-500 w-full text-white mt-3' value="Sign Up" type="submit" />
            </form>
            <p className='text-center'>Already Have an account? <Link
             to={'/login'}className='text-primary'>Please Login</Link></p>
            <div className="divider">OR</div>
            <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>

           

        </div>
        <div>
        
        </div>
        <Toaster />
    </div>
    );
};

export default Register;