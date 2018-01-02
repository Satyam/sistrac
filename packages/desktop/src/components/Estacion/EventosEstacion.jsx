import React from 'react';

export default function Tipos(eventos, emergencias) {
  return (
    <div>
      <pre>{JSON.stringify(eventos, null, 2)}</pre>
      <hr />
      <pre>{JSON.stringify(eventos, null, 2)}</pre>
    </div>
  );
}
