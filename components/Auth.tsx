import {ReactElement, useState} from 'react';
import { supabase } from '../util/supabaseClient';

export default function Auth():ReactElement{
    const [loading, setLoading ] = useState(false);
    const [email, setEmail] = useState<string>('');

    const handleLogin = async (email:string) => {
        try {
            setLoading(true);
            const {error } = await supabase.auth.signIn({email})
            if(error) throw error;
            alert('Check your email for the login link');
            
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="row flex flex-center">
            <h1 className="header">Supabase + Next.js</h1>
            <div className="col-6 form-widget">
            <h1 className="header">Supabase + Next.js</h1>
            <h1 className="header">Supabase + Next.js</h1>
             <p className="description">Sign in via magic link with your email below</p>
            <div>
            <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
    </div>
    )


}