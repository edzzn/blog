import React from 'react';

import Layout from '../components/shared/layout';
import { Hero } from '../components/home';
import RecentArticles from '../components/home/components/RecerArticles';

function IndexPage() {
  return (
    <Layout
      seo={{
        title: 'Home',
        keywords: [`react`, `flutter`, `aws`],
      }}
    >
      <div className='grid grid-cols-12 gap-4'>
        {/* <aside className='col-span-12 lg:col-span-3 bg-gray-100'>aside</aside> */}
        <section className='col-span-12 lg:col-span-auto'>
          <Hero />
          <RecentArticles />
        </section>
      </div>
    </Layout>
  );
}

export default IndexPage;
