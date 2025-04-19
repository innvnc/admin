'use client';

import { UI } from '@/components/shared';
import { Icons } from '@/components/shared/ui';
import { useState } from 'react';

import { CourseSectionForm } from './CourseSectionForm';

interface Props {
    id?: string;
    courseId: string;
    isOpen?: boolean;
    name: string;
    onOpenChange?: (isOpen: boolean) => void;
    triggerElement?: React.ReactNode;
}

export const CourseSectionFormLayout = ({
    id,
    courseId,
    isOpen: externalIsOpen,
    name,
    onOpenChange: externalOnOpenChange,
    triggerElement
}: Props) => {

    const internalDisclosure = UI.useDisclosure();
    const [modalKey, setModalKey] = useState(Date.now());

    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalDisclosure.isOpen;

    const onOpen = externalOnOpenChange
        ? () => { setModalKey(Date.now()); externalOnOpenChange(true); }
        : () => { setModalKey(Date.now()); internalDisclosure.onOpen(); };

    const handleOpenChange = () => {
        setModalKey(Date.now());
        if (externalOnOpenChange) {
            externalOnOpenChange(false);
        } else {
            internalDisclosure.onClose();
        }
    };

    return (
        <>
            {triggerElement ? (
                <span className="w-full cursor-pointer" onClick={onOpen}>
                    {triggerElement}
                </span>
            ) : (
                <UI.Button
                    onPress={onOpen}
                    startContent={<Icons.IoAddOutline size={24} />}
                    variant="light"
                >
                    Crear {name}
                </UI.Button>
            )}

            <UI.Modal
                key={modalKey}
                backdrop="blur"
                isDismissable={false}
                isOpen={isOpen}
                onClose={handleOpenChange}
                classNames={{
                    base: "max-w-md",
                    body: "px-6 py-6 w-full"
                }}
                hideCloseButton
            >
                <UI.ModalContent>
                    {(onClose) => (
                        <>
                            <UI.ModalHeader className="flex flex-row gap-1 justify-center items-center">
                                {id ? (
                                    <>
                                        <Icons.IoPencilOutline size={24} /> Editar {name}
                                    </>
                                ) : (
                                    <>
                                        <Icons.IoAddOutline size={24} /> Crear {name}
                                    </>
                                )}
                            </UI.ModalHeader>

                            <UI.ModalBody className="w-full">
                                <CourseSectionForm id={id} courseId={courseId} onClose={onClose} />
                            </UI.ModalBody>

                            <UI.ModalFooter className="justify-center flex items-center space-x-3">
                                <UI.Button
                                    color="danger"
                                    onPress={onClose}
                                    startContent={<Icons.IoArrowBackOutline size={24} />}
                                    variant="light"
                                >
                                    Cerrar
                                </UI.Button>

                                <UI.Button
                                    color="secondary"
                                    form="section-form"
                                    startContent={<Icons.IoSaveOutline size={24} />}
                                    type="submit"
                                >
                                    Guardar
                                </UI.Button>
                            </UI.ModalFooter>
                        </>
                    )}
                </UI.ModalContent>
            </UI.Modal>
        </>
    );
};