import { UI } from '../../shared/ui';
import { IFollowshipItem } from '../interfaces';


interface IEnterpriseContentProps {
  content: IFollowshipItem[];
  t: ( key: string ) => string;
}

export const EnterpriseContent = ( { content, t }: IEnterpriseContentProps ) => {
  return (
    <div className="enterprise-followship__content">
      { content.map( ( { title, description, icon }, index ) => (
        <div
          key={ index }
          className="enterprise-followship__item"
        >
          <div className="enterprise-followship__image">
            <UI.Image src={ icon.src } alt={ icon.alt } />
          </div>
          <div className="enterprise-followship__info">
            <h3 className="enterprise-followship__title">{ title }</h3>
            <p className="enterprise-followship__description">{ description }</p>
            <a href="#form-empresa" className="enterprise-demo__button">
              { t( 'tailer_made_btn' ) }
            </a>
          </div>
        </div>
      ) ) }
    </div>
  );
};