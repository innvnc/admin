'use client';
import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';


interface Props {
  idClass: string | undefined;
}

export const CourseClassVideoForm = ( { idClass }: Props ) => {
  return (
    <div className="m-3">
      <UI.Button
        size="md"
        startContent={ <Icons.IoAddOutline size={ 24 } /> }
        variant="ghost"
      >
        Nuevo video
      </UI.Button>
    </div>
  );
};
