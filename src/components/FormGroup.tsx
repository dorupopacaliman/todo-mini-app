const FormGroup = ({ children, label, error }: { children: React.ReactNode; label: string; error?: string }) => {
  return (
    <div className={`form-group ${error ? 'error' : ''}`}>
      <label htmlFor={label}>{label}</label>
      {children}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormGroup;