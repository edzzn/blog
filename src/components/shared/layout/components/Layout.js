import PropTypes from 'prop-types';
import React from 'react';

import Header from './Header';
import SEO from './Seo';
import Footer from './Footer';

class Layout extends React.Component {
  render() {
    const { children, seo } = this.props;
    return (
      <div className='flex flex-col min-h-screen font-sans text-gray-900'>
        <SEO
          title={seo.title}
          image={seo.image}
          description={seo.description}
          pageType={seo.pageType}
          datePublished={seo.datePublished}
          dateModified={seo.dateModified}
          keywords={seo.keywords}
          // breadcrumbs={seo.breadcrumbs}
          slug={seo.slug}
          cardSize={seo.cardSize}
          // exactTitle={seo.post.exactTitle}
        />
        <Header />

        <main className='flex-1 w-full max-w-6xl px-4 py-8 mx-auto md:px-8 md:pt-4 md:pb-8'>
          {children}
        </main>

        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seo: PropTypes.shape({
    pageType: PropTypes.string.isRequired,
    // post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    excerpt: PropTypes.string,
    slug: PropTypes.string.isRequired,
    datePublished: PropTypes.string,
    dateModified: PropTypes.string,
    // }).isRequired,
    image: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    cardSize: PropTypes.string,
  }).isRequired,
};

export default Layout;
