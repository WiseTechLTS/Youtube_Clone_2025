const VideoInfo = ({ title, description }) => {
  return (
    <>
      <h2>{title}</h2>
      <h3>
        {description.length < 100 ? description : description.slice(0, 100)}
      </h3>
    </>
  );
};

export default VideoInfo;
