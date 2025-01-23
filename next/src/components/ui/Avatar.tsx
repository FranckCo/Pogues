import { User } from 'iconoir-react';

interface AvatarProps {
  initials?: string;
}

/**
 * Display the user initials in a round circle.
 *
 * If initials are not provided, display a user icon instead.
 *
 * Should be clickable and open a menu.
 */
export default function Avatar({ initials }: Readonly<AvatarProps>) {
  return (
    <div className="rounded-full bg-primary size-10 text-center content-center">
      {initials ? (
        <span className="text-negative font-semibold">{initials}</span>
      ) : (
        <User className="size-7 center" />
      )}
    </div>
  );
}