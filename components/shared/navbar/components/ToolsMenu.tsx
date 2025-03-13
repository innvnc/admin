'use client';
import Link from 'next/link';

import { UI } from '../../ui';
import { menuItems } from '../helpers';



export const ToolsMenu = () => {

  return (
    <div className="tools-menu">
      <div className="tools-menu__container">
        { menuItems.map( ( item, index ) => (
          <Link
            key={ index }
            href={ item.route }
            className="tools-menu__item group"
          >

            <div className="tools-menu__icon-container group-hover:bg-white/10">
              <UI.Image
                src={ item.icon }
                alt={ item.label }
                className="tools-menu__icon group-hover:scale-125"
              />
            </div>

            <span className="tools-menu__label group-hover:opacity-100">
              { item.label }
            </span>
          </Link>
        ) ) }
      </div>
    </div>
  );
};