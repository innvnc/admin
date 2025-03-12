import { ITabContent } from '../interfaces';


interface IEnterpriseTabsProps {
  tabsContent: ITabContent[];
  selectedElement: number;
  onTabClick: ( idx: number ) => void;
}

export const EnterpriseTabs = ( {
  tabsContent,
  selectedElement,
  onTabClick
}: IEnterpriseTabsProps ) => {
  return (
    <div className="enterprise-followship__tabs">
      { tabsContent.map( ( { title }, index ) => {
        const idx = index + 1;
        return (
          <div
            key={ index }
            onClick={ () => onTabClick( idx ) }
            className={ `enterprise-followship__tab ${ selectedElement === idx ? 'enterprise-followship__tab--active' : ''
              }` }
          >
            { title }
          </div>
        );
      } ) }
    </div>
  );
};