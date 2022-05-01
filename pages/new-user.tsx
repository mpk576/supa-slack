import react, {useRef} from 'react';
import { supabase } from '../util/supabaseClient';
import { User } from '@supabase/supabase-js';


export default function NewUser(){
    const usernameInput = useRef<HTMLInputElement | null>(null);
    const passwordInput = useRef<HTMLInputElement | null>(null);

    async function setupUser(uid:string, username: string, password: string) {
        try {
            const {data, error} = await supabase.auth.update({ password: password });
            console.log(data, error);

            if(data && !error){
                const {data, error} = await supabase.from('Profile').insert({id: uid, username: username});
                console.log(data, error);
                
            }
            
        } catch (error) {
            alert('Oops an error occurred');
        }
    }



    async function handleSubmit(e:react.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const user = await supabase.auth.user();

        if(usernameInput.current && passwordInput.current && user){
            setupUser(user.id ,usernameInput.current.value, passwordInput.current.value);
        }    

    }
    

    return ( 
    <div>
        <h1>Welcome</h1>
        <p>Lets get you set up!</p>
        <form  onSubmit={(e) => handleSubmit(e)} action='none'>
            <label htmlFor="username">Please enter a unique username</label>
            <input  ref={usernameInput}type="text" name='username' />
            <label htmlFor="password">Please enter a secure password</label>
            <input ref={passwordInput}type="password" name="password" />
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}