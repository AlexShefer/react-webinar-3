export const getLastChildId = (comment) => {
  if (comment.children && comment.children.length > 0) {
    const lastChild = comment.children[comment.children.length - 1];
    return getLastChildId(lastChild);
  }
  return comment._id;
};