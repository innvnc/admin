
import { Icons } from '@/components/shared/ui';
import { Tabs, Tab, Card, CardBody } from '@heroui/react';


interface Props {
  idClass: string | undefined;
}

export const CourseContentForm = ( { idClass }: Props ) => {

  return (
    <div>
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <Icons.IoVideocamOutline />
              <span>Video</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="Texto"
          title={
            <div className="flex items-center space-x-2">
              <Icons.IoReaderOutline />
              <span>Texto</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="Slides"
          title={
            <div className="flex items-center space-x-2">
              <Icons.IoAlbumsOutline />
              <span>Slides</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div >
  );
};
