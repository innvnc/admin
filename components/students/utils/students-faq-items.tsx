import React from 'react';
import { IFaqItem } from '../interfaces/IFaq';

export const FAQ_ITEMS: IFaqItem[] = [
  {
    id: '01',
    question: '¿Para quién es Innovance?',
    answer: 'Innovance está orientado a estudiantes y graduados de carreras universitarias que quieran continuar sumando habilidades aplicables al mercado laboral.'
  },
  {
    id: '02',
    question: '¿Cuáles son los medios de pago?',
    answer: 'Podés abonar la suscripción con tarjeta de crédito, y para comprar cursos individuales también podés usar Mercadopago o tarjeta de débito.'
  },
  {
    id: '03',
    question: '¿Existe la posibilidad de cancelar?',
    answer: 'Sí, podés cancelar tu suscripción en cualquier momento, al hacerlo ya no se debitarán los meses próximos. Sin embargo, no ofrecemos devolución del mes ya empezado.'
  },
  {
    id: '04',
    question: '¿Obtengo algún certificado al finalizar?',
    answer: 'Sí. Todos nuestros cursos cuentan con certificados propios. Además, vas a contar con la posibilidad de obtener credenciales de expertise al completar un camino de aprendizaje.'
  },
  {
    id: '05',
    question: 'Tengo otras dudas',
    answer: (
      <>
        Por otras dudas o consultas, no dudes en contactarnos a:{' '}
        <a 
          href="mailto:contacto@innovance.academy"
          className="student-faq__email"
        >
          contacto@innovance.academy
        </a>
      </>
    )
  }
];