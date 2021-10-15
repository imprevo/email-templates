import React from 'react';

type UserWelcomeProps = {
  name: string;
  product: string;
};

export const UserWelcome = ({ name, product }: UserWelcomeProps) => (
  <table>
    <tr>
      <td>
        <div>Welcome to {product}</div>
      </td>
    </tr>
    <tr>
      <td>
        <div>
          Hello {name}!
          <br />
          Thank you for signing up for {product}. We&apos;re really happy to
          have you! Click the link below to login to your account:
        </div>
      </td>
    </tr>
  </table>
);
