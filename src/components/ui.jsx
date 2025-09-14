import clsx from 'clsx';

export function Button({ variant = 'primary', className, children, ...props }) {
  const styles = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
    ghost: 'text-gray-700 hover:bg-gray-100'
  };
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ label, error, className, ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      <input
        className={clsx(
          'w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary',
          'px-3 py-2 text-sm',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}

export function Select({ label, error, className, children, ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      <select
        className={clsx(
          'w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary',
          'px-3 py-2 text-sm',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}

export function Card({ className, children }) {
  return (
    <div className={clsx('bg-white rounded-lg shadow-card', className)}>
      {children}
    </div>
  );
}

export function Spinner({ className }) {
  return (
    <div className={clsx('h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-primary', className)} />
  );
}

export function Checkbox({ label, ...props }) {
  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" {...props} />
      <span>{label}</span>
    </label>
  );
}


