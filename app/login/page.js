'use client';

import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginBox from '@/components/login';
export default function Login() {
    const [user] = useAuthState(auth);

    return (
        <div className="login-page m-3">
            {user ? (
                <div>
                    <p>You are logged in.</p>
                    <Button onClick={() => auth.signOut()}>Sign out</Button>
                </div>
            ) : (
                <LoginBox />
            )}
        </div>
    );
}
