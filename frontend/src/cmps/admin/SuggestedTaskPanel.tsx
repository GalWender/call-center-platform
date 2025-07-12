import SuggestedTaskTable from '../SuggestedTaskTable';

const SuggestedTaskPanel = () => {
  return (
    <section className="suggested-task-panel">
      <h2 className="panel-title">Suggested tasks</h2>
      <SuggestedTaskTable />
    </section>
  );
};

export default SuggestedTaskPanel;
