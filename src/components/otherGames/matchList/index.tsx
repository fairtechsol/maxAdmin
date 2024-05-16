import React from 'react';
import "./style.scss";

const NavComponent = () => {
  const navItems = [
    { id: 1, name: 'HALF_TIME', link: 'javascript:void(0)' },
    { id: 2, name: 'OVER_UNDER_15', link: 'javascript:void(0)' },
    { id: 3, name: 'OVER_UNDER_25', link: 'javascript:void(0)' },
    { id: 4, name: 'OVER_UNDER_05', link: 'javascript:void(0)' },
    { id: 5, name: 'MATCH_ODDS', link: 'javascript:void(0)' },
    { id: 6, name: 'Bookmaker', link: 'javascript:void(0)' },
    { id: 1, name: 'HALF_TIME', link: 'javascript:void(0)' },
    { id: 2, name: 'OVER_UNDER_15', link: 'javascript:void(0)' },
    { id: 3, name: 'OVER_UNDER_25', link: 'javascript:void(0)' },
    { id: 4, name: 'OVER_UNDER_05', link: 'javascript:void(0)' },
    { id: 5, name: 'MATCH_ODDS', link: 'javascript:void(0)' },
    { id: 6, name: 'Bookmaker', link: 'javascript:void(0)' },
    { id: 1, name: 'HALF_TIME', link: 'javascript:void(0)' },
    { id: 2, name: 'OVER_UNDER_15', link: 'javascript:void(0)' },
    { id: 3, name: 'OVER_UNDER_25', link: 'javascript:void(0)' },
    { id: 4, name: 'OVER_UNDER_05', link: 'javascript:void(0)' },
    { id: 5, name: 'MATCH_ODDS', link: 'javascript:void(0)', active: true },
    { id: 6, name: 'Bookmaker', link: 'javascript:void(0)' }

  ];

  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="nav mb-3">
          {navItems.map(item => (
            <li key={item.id} className="nav-items">
              <a href={item.link} className={`market-tab-link ${item.active ? 'active' : ''}`}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavComponent;