'use client';

import { UI } from '../shared';
import { Icons } from '../shared/ui';
import { CoursesTable } from './CoursesTable';

type CourseStatus = "published" | "hidden" | "deleted";

export const CoursesList = () => {
  const tabOptions = [
    {
      key: "publicados",
      icon: <Icons.IoEyeOutline size={ 20 } />,
      label: "Publicados",
      status: 'published' as CourseStatus
    },
    {
      key: "ocultos",
      icon: <Icons.IoEyeOffOutline size={ 20 } />,
      label: "Eliminados",
      status: 'hidden' as CourseStatus
    },
    {
      key: "eliminados",
      icon: <Icons.IoTrashOutline size={ 20 } />,
      label: "Eliminados",
      status: 'deleted' as CourseStatus
    }
  ];

  return (
    <div className="flex flex-col px-4">
      <div className="flex w-full flex-col">

        <UI.Tabs aria-label="Options" isVertical>
          { tabOptions.map( ( option ) => (
            <UI.Tab
              key={ option.key }
              title={
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center">
                    { option.icon }
                  </span>
                  <span>{ option.label }</span>
                </div>
              }
            >
              <UI.Card>
                <UI.CardBody>
                  <CoursesTable courseStatus={ option.status } />
                </UI.CardBody>
              </UI.Card>
            </UI.Tab>
          ) ) }
        </UI.Tabs>
      </div>
    </div>
  );
};