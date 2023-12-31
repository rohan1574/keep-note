import React, { useContext } from 'react';
import WelcomePage from '../../components/WelcomePage/WelcomePage';
import WelcomeToLogin from '../../components/WelcomePage/WelcomeToLogin';
import { Link } from 'react-router-dom';
import { UserProvider } from '../../context/AuthContext';


const Home = () => {
    const { user } = useContext(UserProvider)
    return (
        <div>
            {
                !user?.email ? <div>
                    <Link>
                        <WelcomeToLogin></WelcomeToLogin>
                    </Link>
                </div> : <div>
                    <Link >
                        <WelcomePage user={user}></WelcomePage>
                    </Link>
                </div>
            }
        </div >
    );
}


export default Home;