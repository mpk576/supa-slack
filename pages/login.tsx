import react, {ReactElement, useState, useEffect, useRef} from 'react';
import { supabase } from '../util/supabaseClient';

export default function Login({session}:any):ReactElement {
    const emailInput = useRef<HTMLInputElement | null>(null);
    const passwordInput = useRef<HTMLInputElement | null>(null);
    

    async function handleSubmit (e: react.FormEvent<HTMLFormElement>){
        e.preventDefault();
       const email = emailInput.current?.value;
       const password = passwordInput.current?.value;

        if(email && password){
            try {
                await supabase.auth.signIn({email, password})
                
            } catch (error) {
                console.error(error);
            }

        }

    }

    async function handleReset(){
        
        const email = emailInput.current?.value;
        if(email){
            try {
               const response = await supabase.auth.api.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/password-reset`,
              });
                alert('Password reset sent!');
            } catch (error) {
                alert('Oops and error occurred');
            }
        }

    }

    return <div>
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)} >
            <label htmlFor="email">Email</label>
            <input ref={emailInput} type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" />
            <button type="submit">Log in</button>
        </form>
        <div>
            <span>Forgot password?</span>
                <button onClick={() => handleReset()}>Reset it</button>
        </div>
    </div>
}