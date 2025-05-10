import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

// This component provides a wrapper around Font Awesome icons
// to ensure consistent usage throughout the application
export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  return <i className={`fas fa-${name} ${className}`}></i>;
};

// Common icon components for reuse across the application
export const NetworkIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="network-wired" className={className} />
);

export const SearchIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="search" className={className} />
);

export const UserSecretIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="user-secret" className={className} />
);

export const BugIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="bug" className={className} />
);

export const EmailIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="envelope" className={className} />
);

export const KeyIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="key" className={className} />
);

export const GlobeIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="globe" className={className} />
);

export const ClockIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="clock" className={className} />
);

export const ArrowRightIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="arrow-right" className={className} />
);

export const ArrowDownIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="arrow-down" className={className} />
);

export const WarningIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="exclamation-triangle" className={className} />
);

export const CheckIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="check-circle" className={className} />
);

export const AngleRightIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="angle-right" className={className} />
);

export const SaveIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="save" className={className} />
);

export const SettingsIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="cog" className={className} />
);

export const HelpIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="question" className={className} />
);

export const MenuIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="bars" className={className} />
);

export const ShieldIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="shield-alt" className={className} />
);

export const DoorOpenIcon = ({ className = '' }: { className?: string }) => (
  <Icon name="door-open" className={className} />
);

// Helper function to get icon component by name
export const getIconByName = (name: string, className: string = '') => {
  switch (name) {
    case 'network-wired':
      return <NetworkIcon className={className} />;
    case 'search':
      return <SearchIcon className={className} />;
    case 'user-secret':
      return <UserSecretIcon className={className} />;
    case 'bug':
      return <BugIcon className={className} />;
    case 'envelope':
      return <EmailIcon className={className} />;
    case 'key':
      return <KeyIcon className={className} />;
    case 'globe':
      return <GlobeIcon className={className} />;
    case 'clock':
      return <ClockIcon className={className} />;
    case 'arrow-right':
      return <ArrowRightIcon className={className} />;
    case 'arrow-down':
      return <ArrowDownIcon className={className} />;
    case 'exclamation-triangle':
      return <WarningIcon className={className} />;
    case 'check-circle':
      return <CheckIcon className={className} />;
    case 'angle-right':
      return <AngleRightIcon className={className} />;
    case 'save':
      return <SaveIcon className={className} />;
    case 'cog':
      return <SettingsIcon className={className} />;
    case 'question':
      return <HelpIcon className={className} />;
    case 'bars':
      return <MenuIcon className={className} />;
    case 'shield-alt':
      return <ShieldIcon className={className} />;
    case 'door-open':
      return <DoorOpenIcon className={className} />;
    default:
      return <Icon name={name} className={className} />;
  }
};
