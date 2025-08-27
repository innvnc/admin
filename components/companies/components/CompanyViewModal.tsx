"use client";

import { useGetCompany } from "../hooks";
import { UI } from "@/components";
import { Icons } from "@/components/shared/ui";

interface Props {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyViewModal = ( { id, isOpen, onClose }: Props ) => {
  const { company, isLoading } = useGetCompany( id || "" );

  return (
    <UI.Modal isOpen={ isOpen } onOpenChange={ onClose }>
      <UI.ModalContent>
        <UI.ModalHeader className="flex flex-row justify-center space-x-2">
          <Icons.IoBusinessOutline size={ 24 } />
          <h3 className="text-lg font-semibold">Ver empresa</h3>
        </UI.ModalHeader>

        <UI.ModalBody>
          { isLoading ? (
            <div className="flex items-center justify-center py-8">
              <UI.Spinner color="secondary" label="Cargando empresa..." />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-default-200 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icons.IoIdCardOutline className="text-default-500" size={ 20 } />
                  <span className="text-sm text-default-500">Nombre</span>
                </div>
                <div className="text-base font-semibold">{ company?.name ?? "-" }</div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-default-200 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Icons.IoMailOutline className="text-default-500" size={ 20 } />
                    <span className="text-sm text-default-500">Correo electrónico</span>
                  </div>
                  <div className="text-base">{ company?.email ?? "-" }</div>
                </div>

                <div className="rounded-2xl border border-default-200 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Icons.IoCallOutline className="text-default-500" size={ 20 } />
                    <span className="text-sm text-default-500">Teléfono</span>
                  </div>
                  <div className="text-base">{ company?.phone ?? "-" }</div>
                </div>

                <div className="rounded-2xl border border-default-200 p-4 md:col-span-2">
                  <div className="mb-2 flex items-center gap-2">
                    <Icons.IoLocationOutline className="text-default-500" size={ 20 } />
                    <span className="text-sm text-default-500">Dirección</span>
                  </div>
                  <div className="text-base">{ company?.address ?? "-" }</div>
                </div>
              </div>

              <div className="rounded-2xl border border-default-200 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icons.IoDocumentTextOutline className="text-default-500" size={ 20 } />
                  <span className="text-sm text-default-500">Descripción</span>
                </div>
                <div className="text-base whitespace-pre-wrap">{ company?.description ?? "-" }</div>
              </div>
            </div>
          ) }
        </UI.ModalBody>

        <UI.ModalFooter className="flex flex-row justify-center space-x-2">
          <UI.Button
            color="default"
            startContent={ <Icons.IoArrowBackOutline size={ 20 } /> }
            variant="flat"
            onPress={ onClose }
          >
            Cerrar
          </UI.Button>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
};
