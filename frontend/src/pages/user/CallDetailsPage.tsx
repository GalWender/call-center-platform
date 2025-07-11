import { useParams } from 'react-router-dom';

export const CallDetailsPage = () => {
  const { id } = useParams();
  return (
    <section className="call-details-page">
      <h3>Call Details {id}</h3>
      {/* details, tags assignment, tasks table UI will be implemented later */}
    </section>
  );
};

export default CallDetailsPage;
