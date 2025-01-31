import SpinnerIcon from './icons/SpinnerIcon';

export enum ButtonType {
  Primary,
  Secondary,
}

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  type = ButtonType.Secondary,
  onClick = () => {},
  disabled = false,
  isLoading = false,
}: Readonly<ButtonProps>) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      className={`border font-semibold transition rounded px-4 py-3 min-w-40 disabled:cursor-not-allowed outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        ${
          type === ButtonType.Primary
            ? 'bg-primary text-negative disabled:bg-primary-disabled hover:enabled:bg-primary-accent active:enabled:bg-primary-active'
            : 'bg-white text-primary hover:enabled:bg-accent active:enabled:bg-active border-primary'
        }
          `}
    >
      {isLoading ? (
        <div className="flex">
          <div className="mr-3 animate-spin fill-negative">
            <SpinnerIcon />
          </div>
          <div>Loading...</div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
