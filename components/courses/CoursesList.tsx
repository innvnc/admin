'use client';
import { UI } from '../shared';
import { CoursesTable } from './CoursesTable';
import { getCourseMenuOptions } from './helpers';


export const CoursesList = () => {

  const courseMenuOptions = getCourseMenuOptions();

  return (
    <div className="courses-list">
      <div className="courses-list__container">

        <UI.Tabs aria-label="Options" isVertical>
          {
            courseMenuOptions.map( ( option ) => (
              <UI.Tab
                key={ option.key }
                title={
                  <div className="courses-list__tab-title">

                    <span className="courses-list__icon">
                      { option.icon }
                    </span>

                    <span className="courses-list__label">
                      { option.label }
                    </span>

                  </div>
                }
              >

                <UI.Card>
                  <UI.CardBody>
                    <CoursesTable courseStatus={ option.status } />
                  </UI.CardBody>
                </UI.Card>

              </UI.Tab>
            ) )
          }
        </UI.Tabs>

      </div>
    </div>
  );

};
