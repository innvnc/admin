'use client';
import { UI } from '../shared';
import { CoursesTable } from './CoursesTable';
import { getCourseMenuOptions } from './helpers';

export const CoursesList = () => {
  const courseMenuOptions = getCourseMenuOptions();

  return (
    <div className="flex flex-col px-4">
      <div className="flex w-full flex-col">

        <UI.Tabs aria-label="Options" isVertical>
          { courseMenuOptions.map( ( option ) => (
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