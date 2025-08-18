import { PageView } from "./";
import { UsersList } from '../users/components';

export const UsersLayout = () => {
  return (
    <PageView
      content={ <UsersList /> }
      imageUrl="https://i.imgur.com/xdgcsQ3.png"
      subtitle="Controla y administra los usuarios de la plataforma"
      title="Panel de Usuarios"
    />
  );
};
