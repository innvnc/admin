'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { UI } from '../shared/ui';
import { IPageWelcomeProps } from './interfaces';



export const PageWelcome = ( {
  title,
  description,
  orientationImage = 'left',
  imgSrc,
  imgAlt,
}: IPageWelcomeProps ) => {
  
  const t = useTranslations( 'Common' );

  return (
    <div
      className={ `page-welcome__root-container ${ orientationImage == 'right' ? 'sm:flex-row-reverse' : 'sm:flex-row'
        }` }
    >
      <UI.Image alt={ imgAlt } src={ imgSrc } />

      <div className="page-welcome__text--wrapper">

        <h3 className="page-welcome__title-display">{ title }</h3>

        <p className="text-body">{ description }</p>

        <div className="page-welcome__button-container">

          <Link href="/contacto" className="w-full lg:w-44 page-welcome__button">
            { t( 'contact' ) }
          </Link>

          <Link href="/cursos" className="w-full lg:w-44 page-welcome__button-secondary">
            { t( 'explore_courses' ) }
          </Link>

        </div>

      </div>
    </div>
  );
};
