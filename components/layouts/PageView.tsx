import { ReactNode } from 'react';
import { UI } from '../shared';

interface PageViewProps {
	subtitle:  string;
	title:     string;
	imageUrl:  string;
	content:   ReactNode;
}

export const PageView = ({ content, subtitle, title, imageUrl }: PageViewProps) => {
  return (
    <div className="p-4">
      <UI.Card isBlurred shadow="sm">
        <UI.CardHeader className="flex gap-3">
          <UI.Image
            alt="imagen del curso"
            height={40}
            radius="sm"
            src={imageUrl}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{title}</p>
            <p className="text-small text-default-500">{subtitle}</p>
          </div>
        </UI.CardHeader>
        <UI.Divider />
        <UI.CardBody>{content}</UI.CardBody>
      </UI.Card>
    </div>
  );
};