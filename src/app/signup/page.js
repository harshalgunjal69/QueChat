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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const router = useRouter();

    const clearInputs = () => {
        setEmail('');
        setPassword('');
        setPasswordAgain('');
        // now to clear the inputs in the ui
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('passwordAgain').value = '';
    };

    const signup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success('Account created successfully');
                setTimeout(() => {
                    toast('Redirecting to login page');
                }, 2000);
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    toast.error('Email already in use');
                    clearInputs();
                    return;
                }
                if (errorCode === 'auth/invalid-email') {
                    toast.error('Invalid email');
                    clearInputs();
                    return;
                }
                if (errorCode === 'auth/weak-password') {
                    toast.error('Password should be atleast 6 characters long');
                    clearInputs();
                    return;
                }
                toast.error(errorMessage);
            });
    };
    return (
        <div className="flex flex-wrap flex-col justify-center items-center h-screen">
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 md:mb-3">
                <span>
                    <Image
                        src={'/thunder.png'}
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
            <p className="hidden sm:flex sm:text-xl md:text-[1.35rem] max-w-xl md:max-w-2xl text-center text-muted-foreground mb-16">
                Your all-in-one solution for real-time chat, video, and voice
                calls. Connect with anyone, anywhere, and stay in touch
                effortlessly.
            </p>
            <Card className="mx-auto max-w-xs md:max-w-md lg:max-w-2xl shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">SignUp</CardTitle>
                    <CardDescription>
                        Enter your email and password to create a new account
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
                        <div className="space-y-2">
                            <Label htmlFor="password">Password Confirm</Label>
                            <Input
                                id="passwordAgain"
                                placeholder="Enter Your Password Again"
                                name="passwordAgain"
                                type="password"
                                autoComplete="current-password"
                                required
                                onChange={(e) =>
                                    setPasswordAgain(e.target.value)
                                }
                            />
                        </div>
                        <Button
                            disabled={
                                !email ||
                                !password ||
                                !passwordAgain ||
                                password !== passwordAgain
                            }
                            onClick={() => signup()}
                            className="w-full disabled:opacity-50"
                            type="submit"
                        >
                            <HiOutlineMail className="inline-block mr-2" />
                            SignUp
                        </Button>
                        <p className="mt-10 text-center text-sm text-gray-400">
                            Already a member?{' '}
                            <button
                                onClick={() => router.push('login')}
                                className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
