import { NextPage } from 'next';
import react, {ReactElement, useRef} from 'react';
import { supabase } from '../util/supabaseClient';

const PasswordReset = () => {
    const passwordInput = useRef<HTMLInputElement |null>(null);
    const confirmInput = useRef<HTMLInputElement | null>(null);

    async function handleSubmit(e:react.FormEvent<HTMLFormElement>){
        e.preventDefault();
        
        const password = passwordInput.current?.value;
        const passwordConfirm = confirmInput.current?.value;
        if(password && passwordConfirm && password === passwordConfirm){
            try {
            } catch (error) {
                
            }
        }



    }

    return (<article>
        <h1>Password reset</h1>
        <form onSubmit={e => handleSubmit(e)} >

            <label htmlFor="password">New Password</label>
            <input type="password" name="password" />
            <label htmlFor="confirm-password">Confirm password</label>
            <input type="password" name="confirm-password"/>
            <button type="submit">Submit</button>
        </form>
        </article>
    )
}

export default PasswordReset;