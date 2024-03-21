import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './utils';

const withAuth = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const router = useRouter();
        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                console.log(user);
                if (!user) {
                    router.push('/login');
                }
            });
            return () => unsubscribe();
        }, [router]);
        return <WrappedComponent {...props} />;
    };
    return AuthenticatedComponent;
};
export default withAuth;
