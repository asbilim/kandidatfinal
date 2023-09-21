import { NextResponse} from "next/server";

export function middleware(nextRequest) {
    if (nextRequest.nextUrl.pathname.startsWith('/auth') || nextRequest.nextUrl.pathname.startsWith('/status') || nextRequest.nextUrl.pathname.startsWith('/reset')) {
        if (nextRequest.cookies.has('auth')) {
            let accessToken;
            try {
                accessToken = nextRequest.cookies.get('auth')
            } catch(err) {
                return NextResponse.next()
            }

            if (accessToken) {
                // assuming you want to redirect to 'http://localhost:8000/originalPath'
                const redirectUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME;
                return NextResponse.redirect(redirectUrl)
            }
        }
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: ['/auth/:path*', '/status/:path*', '/reset/:path*'],
}
