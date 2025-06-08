// Google Analytics 4 implementation
// Replace 'G-XXXXXXXXXX' with your actual measurement ID after creating a GA4 property

// Initialize Google Analytics
(function() {
  // Standard GA4 initialization
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-7KRB3T9944'); // Google Analytics Measurement ID

  // Track article clicks if on blog page
  document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('blog.html')) {
      const articleLinks = document.querySelectorAll('.blog-table a');
      articleLinks.forEach(link => {
        link.addEventListener('click', function() {
          const articleName = this.textContent;
          const articlePath = this.getAttribute('href');
          
          // Send article click event to Google Analytics
          console.log('Sending GA4 event:', articleName, articlePath);
          gtag('event', 'article_click', {
            'article_name': articleName.toLowerCase().replace(/\s+/g, '_'), // Normalize article name
            'article_path': articlePath
          });
          
          // We won't prevent default - let the navigation happen naturally
        });
      });
    }
  });
})();
