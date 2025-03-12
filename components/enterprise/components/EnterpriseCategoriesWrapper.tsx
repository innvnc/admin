'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

import { CATALOG_ICON, CATEGORIES_ILLUSTRATION, getEnterpriseCategories } from '../utils';
import { EnterpriseCategory } from './EnterpriseCategory';
import { UI } from '../../shared/ui';



export const EnterpriseCategoriesWrapper = () => {

  const t = useTranslations( 'Enterprise' );
  const enterpriseCategories = getEnterpriseCategories( t );

  return (
    <div className="enterprise-categories">
      <div className="enterprise-categories__container">
        <h3 className="text-title-secondary mb-5">
          { t( 'categories_title' ) }
        </h3>
        <div className="enterprise-categories__wrapper">
          <div className="enterprise-categories__grid">
            
            { enterpriseCategories.map( ( { title, description, icon_src, icon_alt }, index ) => (
              <EnterpriseCategory
                key={ index }
                title={ title }
                description={ description }
                icon_src={ icon_src }
                icon_alt={ icon_alt }
              />
            ) ) }

            <div className="enterprise-categories__catalog">
              <UI.Image
                src={ CATALOG_ICON }
                width={ 35 }
                height={ 35 }
                alt="Explore Catalog Icon"
              />
              <h4 className="enterprise-categories__catalog-title">
                CATÁLOGO
              </h4>
              <div className="enterprise-categories__catalog-description">
                See the complete catalog of all our courses.
              </div>
              <a href="/courses" className="enterprise-categories__catalog-link">
                { t( 'explore_all' ) }
              </a>
            </div>
          </div>

          <UI.Image
            src={ CATEGORIES_ILLUSTRATION }
            alt="Our Categories"
          />

        </div>
      </div>
    </div>
  );
};