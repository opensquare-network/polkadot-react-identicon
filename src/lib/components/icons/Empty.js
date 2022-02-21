import React from 'react';

function Identicon ({ className = '', size, style }) {
  return (
    <svg
      className={className}
      height={size}
      style={style}
      viewBox='0 0 64 64'
      width={size}
    />
  );
}

export const Empty = React.memo(Identicon);
