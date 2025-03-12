'use client';

import { UI } from '../../ui';
import Link from 'next/link';

export const ToolsMenu = () => {
  const menuItems = [
    { icon: 'https://i.imgur.com/kuaBMr3.png', label: 'Cursos', route: '/cursos' },
    { icon: 'https://i.imgur.com/Y6T1ctb.png', label: 'Usuarios', route: '/usuarios' },
    { icon: 'https://i.imgur.com/TSxxmZF.png', label: 'Ventas', route: '/ventas' },
    { icon: 'https://i.imgur.com/sf4QSy6.png', label: 'Empresas', route: '/empresas' },
    { icon: 'https://i.imgur.com/BfKrsvl.png', label: 'Contacto', route: '/contacto' },
    { icon: 'https://i.imgur.com/awfTxzg.png', label: 'Notificaciones', route: '/notificaciones' },
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
      <div className="flex items-center gap-6 px-8 py-4 rounded-full backdrop-blur-2xl bg-white/15 border border-white/20 shadow-xl">
        { menuItems.map( ( item, index ) => (
          <Link
            key={ index }
            href={ item.route }
            className="group relative flex flex-col items-center cursor-pointer"
          >
            <div className="p-2 rounded-full transition-all duration-300 ease-out group-hover:bg-white/10">
              <UI.Image
                src={ item.icon }
                alt={ item.label }
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-125"
              />
            </div>
            <span className="absolute -bottom-7 text-xs font-semibold text-white backdrop-blur-md bg-black/50 px-3 py-1 rounded-full opacity-0 transition-all duration-200 group-hover:opacity-100 whitespace-nowrap shadow-md">
              { item.label }
            </span>
          </Link>
        ) ) }
      </div>
    </div>
  );
};