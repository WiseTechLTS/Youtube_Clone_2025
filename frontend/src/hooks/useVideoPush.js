import { useNavigate } from "react-router-dom";

const useVideoPush = () => {
  const navigate = useNavigate();

  const handleVideoPush = (video) => {
    navigate(`/${video.id.videoId}`, {
      state: {
        title: video.snippet.title,
        description: video.snippet.description,
      },
    });
  };
  return { handleVideoPush };
};

export default useVideoPush;
