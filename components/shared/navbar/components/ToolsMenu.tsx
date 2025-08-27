"use client";

import Link from "next/link";

import { menuItems, useAuthTokenRefresh } from "../helpers";
import { UI } from "../../ui";


export const ToolsMenu = () => {

  const { isAuthenticated, isClient } = useAuthTokenRefresh();

  if ( !isClient ) {
    return null;
  }

  if ( !isAuthenticated ) {
    return null;
  }

  return (
    <div className="tools-menu">
      <div className="tools-menu__container">
        { menuItems.map( ( item, index ) => (
          <Link
            key={ index }
            className="tools-menu__item group"
            href={ item.route }
          >
            <div className="tools-menu__icon-container group-hover:bg-white/10">
              <UI.Image
                alt={ item.label }
                className="tools-menu__icon group-hover:scale-125"
                src={ item.icon }
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
