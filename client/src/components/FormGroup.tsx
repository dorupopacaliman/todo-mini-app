const FormGroup = ({ children, label, error, htmlFor }: { children: React.ReactNode; label: string; error?: string; htmlFor: string }) => {
  return (
    <div className={`form-group ${error ? 'error' : ''}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormGroup;