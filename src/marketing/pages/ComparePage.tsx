import { Navigate, useParams } from 'react-router-dom';

/** Individual compare slugs fold into the compare index for now */
export default function ComparePage() {
  const { slug } = useParams();
  return <Navigate to="/compare" replace state={{ from: slug }} />;
}
