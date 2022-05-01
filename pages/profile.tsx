import react, {useRef} from 'react';
import { supabase } from '../util/supabaseClient';
import { User } from '@supabase/supabase-js';


export default function profile(){
    const username = useRef<HTMLInputElement | null>(null);
    const bio = useRef<HTMLInputElement | null>(null);

    async function updateProfile(){
        const user = await supabase.auth.user();
        console.log(user);
        
        if(user && username.current && bio.current ){
            try {
                const {data, error} = await supabase.from('Profile').insert({username: username.current.value, uid: user.id,  bio: bio.current.value});
                console.log(data, error);
            } catch (error) {
                
            }

        }   
    }

    function handleFormSubmit(e: react.FormEvent<HTMLFormElement>){
        e.preventDefault();
        updateProfile();

    }

    return (

        <div>
            <h1>Update Profile</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
            <label htmlFor="username">Username</label>
            <input ref={username}type="text" name="username" />
            <label htmlFor="bio">Bio</label>
            <input ref={bio} type="textarea" name="bio"  />
            <button type='submit'>Submit</button>
            </form>
        </div>
    )
}