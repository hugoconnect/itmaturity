import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-8 text-center text-sm text-hugo-dark">
      <div className="mb-2">
        HUGO CONNECT LLC 161 N. Clark Street, Suite 1600 Chicago, Illinois 60601
      </div>
      <div className="space-x-3">
        <span>o. 312.796.9007</span>
        <span>|</span>
        <span>m. 312.620.7911</span>
        <span>|</span>
        <a 
          href="mailto:hugo@hugoconnect.com" 
          className="text-hugo-primary hover:text-hugo-anchor transition-colors duration-200"
        >
          hugo@hugoconnect.com
        </a>
        <span>|</span>
        <a 
          href="https://www.hugoconnect.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-hugo-primary hover:text-hugo-anchor transition-colors duration-200"
        >
          www.hugoconnect.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;