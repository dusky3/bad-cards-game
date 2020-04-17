import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { FirebaseContext } from '../FirebaseContext';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/gameActions';

import devilLogo from '../assets/devil.svg';

import HeaderButton from './HeaderButton';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();

  const username = useSelector((state) => state.username);
  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);
  const logged = useSelector((state) => state.logged);

  const [headerClosed, setHeaderClosed] = useState(true);

  const onLogout = async () => {
    if (firebase) {
      dispatch(await logout(firebase));
    }
  };

  return (
    <nav className="flex-shrink-0 flex flex-row justify-between sm:items-center flex-wrap bg-gray-900 px-6 py-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={devilLogo} className="fill-current h-8 w-8 mr-2" alt="Bad Cards logo" />
        <span className="font-semibold text-xl tracking-tight">Bad Cards</span>
      </div>
      <div className="block sm:hidden">
        <button
          onClick={() => setHeaderClosed(!headerClosed)}
          className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
        >
          {headerClosed ? (
            <FontAwesomeIcon size="xs" icon={['fas', 'bars']} title="Menu" />
          ) : (
            <FontAwesomeIcon size="xs" icon={['fas', 'times']} title="Menu" />
          )}
        </button>
      </div>
      <div className={classNames('w-full block flex-grow sm:flex sm:items-center sm:w-auto', { hidden: headerClosed })}>
        <div className="text-sm sm:flex-grow">
          <Link to="/home" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
            Home
          </Link>
          {logged && (
            <>
              <Link to="/game" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white mr-4">
                Game
              </Link>
              <Link to="/packEditor" className="block mt-4 sm:inline-block sm:mt-0 text-blue-200 hover:text-white">
                Pack editor
              </Link>
            </>
          )}
        </div>
        {userInfoLoaded && (
          <div className="flex flex-col sm:flex-row sm:items-center">
            {logged ? (
              <>
                <div
                  className="hidden -my-2 sm:flex bg-gray-600 text-gray-100 rounded-full h-12 w-12 flex items-center justify-center cursor-default mr-4"
                  title={username}
                >
                  {username
                    .split(' ')
                    .map((w) => w.charAt(0).toUpperCase())
                    .join(' ')}
                </div>
                <HeaderButton className="block mt-4 sm:inline-block sm:mt-0" onClick={onLogout}>
                  Logout
                </HeaderButton>
              </>
            ) : (
              <>
                <Link to="/login" className="sm:mr-4 block mt-4 sm:mt-0">
                  <HeaderButton className="block w-full sm:w-auto">Login</HeaderButton>
                </Link>
                <Link to="/signup" className="block mt-4 sm:mt-0">
                  <HeaderButton className="block w-full sm:w-auto">Register</HeaderButton>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
