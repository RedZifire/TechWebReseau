function CommentCard({ comment }) {
  return (
    <div className="border rounded p-3 mb-2 bg-white">
      <strong>{comment.username}</strong>
      <p className="mb-0">{comment.content}</p>
    </div>
  )
}

export default CommentCard