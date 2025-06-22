const Comment = ({ text, userName }) => {
  return (
    <p>
      {userName}: {text}
    </p>
  );
};

export default Comment;
