import { redirect } from '@sveltejs/kit';
import { blockedUrls } from '$lib/blocked-urls';

const isBlockedUrl = (url) => {
    const path = url.pathname;

    if (!Array.isArray(blockedUrls)) {
        console.error('blockedUrls is not defined or not an array');
        return false;
    }

    return blockedUrls.includes(path);
};

const isUserLoggedIn = (cookies) => {
    const token = cookies.get('token');
    return token !== undefined && token !== '';
};

export const handle = async ({ event, resolve }) => {
    const { cookies } = event;

    // Check if the URL is in the list of blocked URLs
    if (isBlockedUrl(event.url)) {
        // If the URL is protected, check if the user is logged in
        if (!isUserLoggedIn(cookies)) {
            console.log('User not logged in, redirecting to login');
            throw redirect(302, '/login');
        }
    }

    // If the user is logged in or the URL is not protected, resolve the request normally
    return resolve(event);
};
