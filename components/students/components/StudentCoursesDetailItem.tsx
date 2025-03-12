import React from 'react';

import { IStudentCoursesDetailItemProps } from '../interfaces';


export const StudentCoursesDetailItem = ( {
  title,
  description,
  img,
}: IStudentCoursesDetailItemProps ) => {
  return (
    <div className="student-courses-details__item">

      <img
        alt="learn at your own pace"
        src={ img }
        className="student-courses-details__item-image"
      />

      <div className="student-courses-details__item-content">
        <h5 className="student-courses-details__title--medium">{ title }</h5>
        <p className="student-courses-details__text">{ description }</p>
      </div>
    </div>
  );
};