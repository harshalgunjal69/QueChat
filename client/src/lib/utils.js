import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const firebaseConfig = {
    apiKey: 'AIzaSyBv7TEpQVDHYpqve_PfcX0F3V3EkI442vc',
    authDomain: 'quechat-acfe9.firebaseapp.com',
    projectId: 'quechat-acfe9',
    storageBucket: 'quechat-acfe9.appspot.com',
    messagingSenderId: '349361291249',
    appId: '1:349361291249:web:b27513e1311e9d6d764e50',
    measurementId: 'G-E8LW613N0S',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
