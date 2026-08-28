interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  label?: string;
  disabled?: boolean;
}

/**
 * A clean, reliable, modern sliding toggle switch.
 * Designed with precise proportions and smooth physics.
 */
export function Switch({ checked, onChange, id, label, disabled = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      id={id}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-hidden active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
        checked
          ? "bg-primary shadow-xs"
          : "bg-secondary/90 border border-border/80"
      }`}
    >
      <span
        className={`pointer-events-none inline-block size-6 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
