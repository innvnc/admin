'use client';
import React, { useState } from 'react';

import { FAQ_ITEMS } from '../utils';
import { FaqItem } from './FaqItem';

export const StudentFAQ = () => {
  const [ openItem, setOpenItem ] = useState<string | null>( null );

  const toggleItem = ( id: string ) => {
    setOpenItem( openItem === id ? null : id );
  };

  return (
    <section className="student-faq__section">
      <div className="student-faq__header">
        <h3 className="student-faq__subtitle">FAQ</h3>
        <h2 className="student-faq__title">PREGUNTAS FRECUENTES</h2>
      </div>
      <div className="student-faq">
        {
          FAQ_ITEMS.map( ( item ) => (
            <FaqItem
              key={ item.id }
              item={ item }
              isOpen={ openItem === item.id }
              onToggle={ () => toggleItem( item.id ) }
            />
          ) )
        }
      </div>
    </section>
  );
};