'use client';
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineMail } from 'react-icons/hi';
import { auth } from '@/lib/utils';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLoginWithEmail = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            toast.success('Logged in successfully');
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                toast.error('User not found');
                return;
            }
            if (errorCode === 'auth/wrong-password') {
                toast.error('Wrong password');
                return;
            }
            if (errorCode === 'auth/invalid-email') {
                toast.error('Invalid email');
                return;
            }
            if (errorCode === 'auth/invalid-credential') {
                toast.error('Invalid credential');
                return;
            }
            toast.error(errorMessage);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const {
                displayName: name,
                email,
                photoUrl: profileImage,
            } = userCredential.user;
            console.log(name, email, profileImage);
            toast.success('Logged in successfully');
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/popup-closed-by-user') {
                toast.error('Popup closed by user');
                return;
            }
            if (errorCode === 'auth/popup-blocked') {
                toast.error('Popup blocked');
                return;
            }
            if (errorCode === 'auth/operation-not-allowed') {
                toast.error('Operation not allowed');
                return;
            }
            if (errorCode === 'auth/user-disabled') {
                toast.error('User disabled');
                return;
            }
            toast.error(errorMessage);
        }

        try {
        } catch (error) {}
    };
    return (
        <div className="flex flex-wrap flex-col justify-center items-center h-screen">
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12">
                <span>
                    <Image
                        src={'/thunder.png'}
                        alt="logo"
                        height={80}
                        width={80}
                        priority={true}
                        className="inline-block mr-2 md:mr-4 lg:mr-6 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden"
                    />
                </span>
                <span className="bg-gradient-to-b from-slate-950 to-slate-800 dark:bg-gradient-to-b dark:from-slate-400 dark:to-slate-100 inline-block text-transparent bg-clip-text">
                    QueChat
                </span>
            </h1>

            <Card className="mx-auto max-w-xs md:max-w-md lg:max-w-2xl shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="Enter Your Email"
                                required
                                type="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Enter Your Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className="mt-10 text-center text-sm text-muted-foreground">
                            Not a member?{' '}
                            <button
                                onClick={() => router.push('signup')}
                                className="font-semibold leading-6 text-primary-foreground hover:text-primary-foreground/80 hover:underline transition-all duration-75"
                            >
                                Sign Up
                            </button>
                        </p>
                        <Button
                            onClick={handleLoginWithEmail}
                            className="w-full"
                            type="submit"
                        >
                            <HiOutlineMail className="inline-block mr-2" />
                            Login with Email
                        </Button>
                        <div className="flex items-center space-x-2">
                            <hr className="flex-1" />
                            <span className="text-muted-foreground">or</span>
                            <hr className="flex-1" />
                        </div>
                        <Button className="w-full" onClick={handleGoogleLogin}>
                            <FcGoogle className="inline-block mr-2" />
                            Login with Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
