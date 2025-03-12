import Link from 'next/link';

import { COMPANY_LINKS, COURSE_LINKS, SOCIAL_LINKS } from './utils';
import { LogoFooterSvg } from '../shared/ui/svg';



export const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-content'>
          <div className='footer-sections'>
            <div className='footer-links'>
              <div className='footer-section'>
                <h2 className='footer-title'>
                  EMPRESA
                </h2>
                <ul className='footer-list'>
                  { COMPANY_LINKS.map( ( { href, text } ) => (
                    <li key={ href }>
                      <Link href={ href } className='footer-link'>{ text }</Link>
                    </li>
                  ) ) }
                </ul>
              </div>

              <div className='footer-section'>
                <h2 className='footer-title'>
                  <Link href='/cursos'>CURSOS</Link>
                </h2>
                <ul className='footer-list'>
                  { COURSE_LINKS.map( ( { href, text } ) => (
                    <li key={ text }>
                      <Link href={ href } className='footer-link'>{ text }</Link>
                    </li>
                  ) ) }
                </ul>
              </div>
            </div>

            <div className='footer-social'>
              <div className='footer-social-links'>
                { SOCIAL_LINKS.map( ( { href, icon: Icon } ) => (
                  <Link key={ href } href={ href } className='footer-social-icon'>
                    <Icon />
                  </Link>
                ) ) }
              </div>
              <Link href='/' className="footer-logo">
                <LogoFooterSvg />
              </Link>
            </div>
          </div>
        </div>

        <div className='footer-bottom'>
          <div className='footer-bottom-links'>
            <Link href='/privacidad' className='footer-link'>
              Políticas de privacidad
            </Link>
            <span className='footer-divider'>|</span>
            <Link href='/terminos' className='footer-link'>
              Términos y condiciones
            </Link>
          </div>
          <span className='footer-bottom-text'>
            INNOVANCE ACADEMY S.A. © { currentYear }
          </span>
        </div>
      </div>
    </footer>
  );
};