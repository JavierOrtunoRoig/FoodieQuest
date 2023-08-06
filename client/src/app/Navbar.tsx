import React from 'react';

import Link from 'next/link';
import { ROUTES } from '@/routes';

function Navbar () {
  return (
    <nav>
      <ul>
        {
          Object
            .entries(ROUTES)
            .map(([label, route]) => (
              <li key={label}>
                <Link
                  key={label}
                  href={route}
                >
                  {label}
                </Link>
              </li>
            ))
        }
      </ul>
    </nav>
  );
}

export default Navbar;
