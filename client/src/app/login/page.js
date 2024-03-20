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
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';

export default function Login() {
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const {user:{displayName:name, email, photoUrl:profileImage}} = userCredential.user;
            console.log(user);
        } catch (error) {
            console.log(error);
        }
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
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Enter Your Password"
                                required
                                type="password"
                            />
                        </div>
                        <Button className="w-full" type="submit">
                            <HiOutlineMail className="inline-block mr-2" />
                            Login with Email
                        </Button>
                        <div className="flex items-center space-x-2">
                            <hr className="flex-1" />
                            <span className="text-gray-500">or</span>
                            <hr className="flex-1" />
                        </div>
                        <Button
                            className="w-full"
                            onClick={() => {
                                handleGoogleLogin();
                            }}
                        >
                            <FcGoogle className="inline-block mr-2" />
                            Login with Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
