import { UI } from '../shared';

export const CoursesLayout = () => {
  return (
    <div className="p-4">
      <UI.Card isBlurred shadow="sm">
        <UI.CardHeader className="flex gap-3">
          <UI.Image
            alt="heroui logo"
            height={ 40 }
            radius="sm"
            src="https://i.imgur.com/kuaBMr3.png"
            width={ 40 }
          />
          <div className="flex flex-col">
            <p className="text-md">Cursos</p>
            <p className="text-small text-default-500">Panel de editor de cursos</p>
          </div>
        </UI.CardHeader>
        <UI.Divider />
        <UI.CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </UI.CardBody>
      </UI.Card>
    </div>
  );
};
