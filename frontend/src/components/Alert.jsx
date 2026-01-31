import { useEffect } from 'react';

function Alert({ message, variant = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  const variantClasses = {
    success: 'alert-success',
    danger: 'alert-danger',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  return (
    <div 
      className={`alert ${variantClasses[variant] || variantClasses.info} alert-dismissible fade show`} 
      role="alert"
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px',
        maxWidth: '500px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <div className="d-flex align-items-center">
        <div className="me-2">
          {variant === 'success' && '✅'}
          {variant === 'danger' && '❌'}
          {variant === 'warning' && '⚠️'}
          {variant === 'info' && 'ℹ️'}
        </div>
        <div className="flex-grow-1">{message}</div>
      </div>
      {onClose && (
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
}

export default Alert;
