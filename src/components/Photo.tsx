import { PhotoProps } from '../services/upsplash';

interface PhotoComponentProps {
  photoInfo: PhotoProps
}

export const Photo = (props: PhotoComponentProps) => {

  // console.log(props.photoInfo.urls.regular);

  return (
    <div className="feed">
      <ul className="columnUl">
        <li className="li">
          <img className="img" src={props.photoInfo.urls.regular} />
          <a
            className="credit"
            target="_blank"
            href={`https://unsplash.com/@${props.photoInfo.user.username}`}
          >
            {props.photoInfo.user.name}
          </a>
        </li>
      </ul>
    </div>
  );
}
