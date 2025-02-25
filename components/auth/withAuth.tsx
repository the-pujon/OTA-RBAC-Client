/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hook';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { isTokenExpired } from '@/utils/isTokenExpired';
import { getAuthCookie } from '@/utils/cookies';
// import Loading from '@/components/shared/Loading';
// import { toast } from 'sonner';
// import { isTokenExpired } from '@/utils/isTokenExpired';
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>,allowedRoles?: string[]) {
    return function AuthenticatedComponent(props: P) {
        const router = useRouter();
        const currentUser = useAppSelector(selectCurrentUser);
        // const token = useAppSelector(useCurrentToken);
        const token = getAuthCookie();
        console.log("token is herererere", token);
        const isJwtTokenExpired = isTokenExpired(token as string);


        useEffect(() => {
            if (!token) {
                router.push('/auth/signin');
            } else if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role || '')) {
                // toast.error('You are not authorized to access this page');
                // alert('You are not authorized to access this page');
                router.push("/dashboard");
                // router.back();
            }
            if (isJwtTokenExpired) {
                router.push("/auth/signin");
            }
        },[currentUser,token,router,isJwtTokenExpired]);

        if (!token) {
            return <div>Loading...</div>;
        }

        if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role || '')) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
}