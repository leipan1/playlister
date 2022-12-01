import { Link } from 'react-router-dom'
export default function SplashScreen() {

    return (
        <div id="splash-screen">
            <div id="splash-screen-text">
                Welcome to
                <div id="splash-screen-playlister-text">
                    Playlister
                </div>
                Your go-to playlist organizer
                <div id="splash-screen-credit">
                    by Leila Pan
                </div>
            </div>
            <div id="splash-screen-logins">
                <Link to='/register/'>
                <button id="splash-screen-create-account">
                    Create Account
                </button>
                </Link>
                <Link to='/login/'>
                <button id="splash-screen-login">
                    Login
                </button>
                </Link>
            </div>
            <button id="splash-screen-continue-as-guest">
                    Continue as Guest
            </button>
        </div>
    )
}