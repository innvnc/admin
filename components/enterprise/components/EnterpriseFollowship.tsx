'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { getFollowshipContent, getTabsContent } from '../utils/enterpriseContent';
import { EnterpriseContent } from './EnterpriseContent';
import { EnterpriseTabs } from './EnterpriseTabs';


export const EnterpriseFollowship = () => {

  const [ selectedElement, setSelectedElement ] = useState<number>( 1 );
  const t = useTranslations( 'Enterprise' );
  const tCommon = useTranslations( 'Common' );

  const tabsContent = getTabsContent( t );
  const followshipContent = getFollowshipContent( t );

  return (
    <div className="enterprise-followship">
      <div className="enterprise-followship__container">

        <EnterpriseTabs
          tabsContent={ tabsContent }
          selectedElement={ selectedElement }
          onTabClick={ setSelectedElement }
        />

        <EnterpriseContent
          content={ followshipContent[ selectedElement - 1 ] }
          t={ t }
        />

      </div>
    </div>
  );
};