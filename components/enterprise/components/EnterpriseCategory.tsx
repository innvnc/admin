import React from 'react';
import Link from 'next/link';

import { Icons, UI } from '../../shared/ui';
import { IEnterpriseCategoryProps } from '../interfaces';



export const EnterpriseCategory = ( {
  title,
  description,
  icon_src,
  icon_alt,
}: IEnterpriseCategoryProps ) => {
  return (
    <div className="flex flex-col justify-between bg-ia-white-1 w-full sm:w-64 h-64 p-6">

      <UI.Image src={ icon_src } width={ 35 } height={ 35 } alt={ icon_alt } />

      <h4 className="text-title-m dark-text border-b border-dotted border-ia-aqua-4 pb-3">
        { title }
      </h4>

      <p className="text-body-m dark-text">{ description }</p>

      <button className="flex justify-center items-center w-[28px] h-[28px] border border-ia-aqua-1 text-ia-aqua-1 text-[11px] font-semibold rounded-full py-2 gap-2">
        <Link
          className="flex items-center justify-center h-full w-full"
          //href={`/categoria/${title.toLowerCase()}`}
          href="/cursos"
        >
          <Icons.IoChevronForwardOutline size={ 16 } />
        </Link>
      </button>
    </div>
  );
};
