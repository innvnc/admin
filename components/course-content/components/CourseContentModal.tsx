'use client';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { CourseContentLayout } from './CourseContentLayout';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
}

export const CourseContentModal = ( {
  isOpen,
  onClose,
  courseId,
  courseTitle,
}: Props ) => {
  return (
    <UI.Modal
      isOpen={ isOpen }
      onOpenChange={ onClose }
      size="full"
      scrollBehavior="inside"
    >
      <UI.ModalContent>
        { ( onCloseModal ) => (
          <>
            <UI.ModalHeader className="flex flex-row justify-between items-center">
              <div className="flex items-center gap-2">
                <Icons.IoListOutline size={ 24 } />
                <span>Contenido del curso: { courseTitle }</span>
              </div>
              <UI.Button
                isIconOnly
                color="danger"
                variant="light"
                onPress={ onCloseModal }
              >
                <Icons.IoCloseOutline size={ 24 } />
              </UI.Button>
            </UI.ModalHeader>

            <UI.ModalBody>
              <CourseContentLayout courseId={ courseId } courseTitle={ courseTitle } />
            </UI.ModalBody>
          </>
        ) }
      </UI.ModalContent>
    </UI.Modal>
  );
};