'use client';

import { PageView } from "../layouts";
import { CompaniesList } from "./CompaniesList";

export const CompaniesLayout = () => {
  return (
    <PageView
      content={ <CompaniesList /> }
      imageUrl="https://i.imgur.com/r85Wz7s.png"
      subtitle="Administra los datos de las empresas registradas"
      title="Panel de Empresas"
    />
  );
};
