
export const ClassVideo = () => {
  return (
    <div>
      <iframe
        src="https://iframe.mediadelivery.net/embed/423063/c42c9b5d-0275-4e72-9fe1-ed7e4561bac6?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
        loading="lazy"
        style={ {
          border: 0,
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
        } }
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        allowFullScreen={ true }
      ></iframe>
    </div>
  );
};
