import React from 'react';
import { useAuth } from '@clerk/clerk-react';

function MyComponent() {
  const { userId } = useAuth(); // Get user ID

  return (
    <div>
      <h1>Welcome, User!</h1>
      <p>Your User ID: {userId}</p>
    </div>
  );
}

export default MyComponent;
