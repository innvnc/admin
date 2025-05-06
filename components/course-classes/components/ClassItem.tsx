"use client";

import { UI } from "@/components/shared";
import { Icons } from "@/components/shared/ui";
import { ICourseClassesResponse } from "../interfaces";

interface Props {
  classItem: ICourseClassesResponse;
  onEdit: ( id: string ) => void;
  onDelete: ( id: string, title: string ) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const ClassItem = ( {
  classItem,
  onEdit,
  onDelete,
  dragHandleProps,
}: Props ) => {
  return (
    <UI.Card className="w-full mb-2">
      <UI.CardBody className="py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 flex-1">
            { dragHandleProps && (
              <div
                className="cursor-grab active:cursor-grabbing text-default-400"
                { ...dragHandleProps }
              >
                <Icons.IoReorderThreeOutline size={ 20 } />
              </div>
            ) }
            <div className="flex flex-col">
              <span className="font-medium">{ classItem.title }</span>
              <p className="text-xs text-gray-500 line-clamp-1">
                { classItem.description }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <UI.Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={ () => onEdit( classItem.id ) }
            >
              <Icons.IoPencilOutline className="text-default-500" size={ 16 } />
            </UI.Button>
            <UI.Button
              isIconOnly
              color="danger"
              size="sm"
              variant="light"
              onPress={ () => onDelete( classItem.id, classItem.title ) }
            >
              <Icons.IoTrashOutline className="text-danger" size={ 16 } />
            </UI.Button>
            { classItem.positionOrder !== undefined && (
              <UI.Chip color="primary" size="sm">
                Posición: { classItem.positionOrder }
              </UI.Chip>
            ) }
          </div>
        </div>
      </UI.CardBody>
    </UI.Card>
  );
};