import React from 'react';

import { Icon } from '../';
import { siteConfig } from '../../config.js';


export default function({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed
        ? <div><h3><Icon name={siteConfig.siteIcon} /></h3></div>
        : <h3>{siteConfig.siteName}</h3>}
    </div>
  );
}
