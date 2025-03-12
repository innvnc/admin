import { TranslationValues } from 'next-intl';

export interface EnterpriseCategory {
  title: string;
  description: string;
  icon_src: string;
  icon_alt: string;
}

export const getEnterpriseCategories = (t: (key: string, values?: TranslationValues) => string): EnterpriseCategory[] => {
  return [
    {
      title: t('categories_finance_title'),
      description: t('categories_finance_description'),
      icon_src: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276722/z8ld7jw5nftfkhkllyq9.svg',
      icon_alt: 'Finance Icon',
    },
    {
      title: t('categories_economy_title'),
      description: t('categories_economy_description'),
      icon_src: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276720/drdgmot3ftpbdyyc09bj.svg',
      icon_alt: 'Economy Icon',
    },
    {
      title: t('categories_accounting_title'),
      description: t('categories_accounting_description'),
      icon_src: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276717/gzkbhtw7fzi1yycfdc8a.svg',
      icon_alt: 'Accounting Icon',
    },
    {
      title: t('categories_law_title'),
      description: t('categories_law_description'),
      icon_src: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276719/sxroesyioyrqt1ith7p7.svg',
      icon_alt: 'Law Icon',
    },
    {
      title: t('categories_programming_title'),
      description: t('categories_programming_description'),
      icon_src: 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276727/qdtgx7qh4qeti5dlai3x.svg',
      icon_alt: 'Programming Icon',
    },
  ];
};

export const CATALOG_ICON = 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276722/qlsv3brsw9xecsi8pr1x.svg';
export const CATEGORIES_ILLUSTRATION = 'https://res.cloudinary.com/dlgkf6feq/image/upload/v1736276726/rsvoiq2oxulqwrbfcjta.svg';