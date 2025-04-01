
import { PageView } from '../layouts';
import { CategoriesList } from './CategoriesList';


export const CategoriesLayout = () => {
  return (
    <PageView
      content={ <CategoriesList /> }
      imageUrl="https://imgur.com/JYBEust"
      subtitle="Administra y edita las categorías en esta sección"
      title="Panel de Categorías"
    />
  );
};
