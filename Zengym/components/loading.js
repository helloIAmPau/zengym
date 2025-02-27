export default function Loading({ children, isLoading }) {
  if(isLoading === true) {
    return;
  }

  return children;
};
