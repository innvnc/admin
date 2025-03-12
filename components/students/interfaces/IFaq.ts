import { ReactNode } from 'react';

export interface IFaqItem {
  id:       string;
  question: string;
  answer?:  string | ReactNode;
}


export interface IFaqItemProps {
  item:     IFaqItem;
  isOpen:   boolean;
  onToggle: () => void;
}