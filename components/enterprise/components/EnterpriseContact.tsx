import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';


import { UI } from '@/components';



export const EnterpriseContact = () => {

  const t = useTranslations( 'Contact' );

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col gap-3.5 lg:hidden">
        <p className="text-title-m">{ t( 'title' ) }</p>
        <p className="text-title">{ t( 'subtitle' ) }</p>
      </div>
      <div className="flex flex-row gap-5 lg:gap-20 xl:gap-32">
        <div className="hidden sm:flex flex-col w-full gap-7 lg:gap-10">
          <div className="hidden lg:flex flex-col gap-6">
            <p className="text-title-m">{ t( 'title' ) }</p>
            <p className="text-title">{ t( 'subtitle' ) }</p>
          </div>
          <div className="example-welcome-image w-full aspect-video">
            <UI.Image
              src="https://res.cloudinary.com/dobwqzgth/image/upload/f_auto,q_auto/v1/public/images/cubxfsrms6v7wttrt5fk"
              alt="Contact Enterprise"
            />
          </div>
          <div className="flex flex-row items-center gap-3 w-full min-w-[220px]">
            <UI.Image
              alt="envelope icon"
              className="system-icon w-4  h-3.5 basis"
              src="https://res.cloudinary.com/dobwqzgth/image/upload/f_auto,q_auto/v1/public/images/qzlpooxp9aawzzqowohn"
            />
            <Link href="mailto:contacto@innovance.academy">
              <p className="text-body">
                contacto@innovance.academy
              </p>
            </Link>
          </div>
        </div>
        <div className="max-w-[500px]">
          {/* <ContactForm /> */ }
          <div className="flex flex-row items-center gap-3 sm:hidden mt-4">
            <UI.Image
              alt="envelope icon"
              className="system-icon w-4  h-3.5"
              src="https://res.cloudinary.com/dobwqzgth/image/upload/f_auto,q_auto/v1/public/images/cubxfsrms6v7wttrt5fk"
            />
            <p className="text-body">Contacto@innovance.academy</p>
          </div>
        </div>
      </div>
    </div>
  );
};
