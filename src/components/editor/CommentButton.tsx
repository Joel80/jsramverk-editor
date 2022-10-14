import "./CommentButton.css";

export default  function CommentButton({handleCommentButtonClick}: {handleCommentButtonClick(): void}) {

    return (
            <button className="comment-button" onClick={handleCommentButtonClick}>Comment</button> 
    );
};
