import Link from 'next/link';

import { AuthButtons } from './AuthButtons';



export const NavbarActions = () => {
  return (
    <div className="navbar__actions">

      <button className="navbar__contact-button">
        CONTACTARSE
      </button>

      <Link className="navbar__courses-link" href="/cursos">
        CURSOS
      </Link>

      <AuthButtons />

    </div>
  );
};
