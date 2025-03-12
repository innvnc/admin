import React from 'react';

import { IFaqItemProps } from '../interfaces';
import { Icons } from '../../shared/ui';



export const FaqItem: React.FC<IFaqItemProps> = ( { item, isOpen, onToggle } ) => {
  return (
    <div className="student-faq__item">

      <button
        className="student-faq__button"
        onClick={ onToggle }
        aria-expanded={ isOpen }
      >
        <span className="student-faq__number">{ item.id }.</span>
        <span className="student-faq__question">{ item.question }</span>
        <span className={ `student-faq__icon ${ isOpen ? 'student-faq__icon--open' : '' }` }>
          { isOpen ? <Icons.IoChevronUpOutline /> : <Icons.IoChevronDownOutline /> }
        </span>
      </button>

      {
        item.answer && (
          <div
            className={ `student-faq__answer ${ isOpen ? 'student-faq__answer--open' : '' }` }
          >
            { item.answer }
          </div>
        )
      }
      
    </div>
  );
};