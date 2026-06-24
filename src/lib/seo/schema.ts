export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Prontly Notify",
    url: "https://prontly.in",
    logo: "https://prontly.in/logo.png",
    sameAs: [
      "https://twitter.com/prontly",
      "https://github.com/prontly",
    ],
    description:
      "AI-assisted browser push notification platform for publishers, SaaS, and e-commerce.",
    foundingDate: "2025",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Prontly Notify",
    url: "https://prontly.in",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://prontly.in/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

type Plan = {
  name: string;
  price: number;
  currency: string;
  billingPeriod: string;
  description: string;
};

export function productSchema(plans: Plan[]) {
  return plans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Prontly Notify - ${plan.name}`,
    description: plan.description,
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: plan.currency,
      url: "https://prontly.in/pricing",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0],
      category: plan.billingPeriod,
    },
  }));
}

export function blogPostingSchema(post: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.headline,
        description: post.description,
        url: `https://prontly.in/blog/${post.slug}`,
        datePublished: post.datePublished,
        dateModified: post.dateModified ?? post.datePublished,
        image: post.imageUrl ?? "https://prontly.in/og-default.png",
        author: {
          "@type": "Person",
          name: post.authorName,
          url: post.authorUrl ?? "https://prontly.in/about",
        },
        publisher: {
          "@type": "Organization",
          name: "Prontly Notify",
          logo: {
            "@type": "ImageObject",
            url: "https://prontly.in/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://prontly.in/blog/${post.slug}`,
        },
      },
      breadcrumbSchema([
        { name: "Home", url: "https://prontly.in" },
        { name: "Blog", url: "https://prontly.in/blog" },
        { name: post.headline, url: `https://prontly.in/blog/${post.slug}` },
      ]),
    ],
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function techArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: article.title,
        description: article.description,
        url: `https://prontly.in/docs/${article.slug}`,
        datePublished: article.datePublished,
        dateModified: article.dateModified ?? article.datePublished,
        author: {
          "@type": "Organization",
          name: "Prontly Notify",
        },
        publisher: {
          "@type": "Organization",
          name: "Prontly Notify",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://prontly.in/docs/${article.slug}`,
        },
      },
      {
        "@type": "HowTo",
        name: article.title,
        description: article.description,
        step: article.steps.map((step) => ({
          "@type": "HowToStep",
          name: step.name,
          text: step.text,
        })),
      },
      breadcrumbSchema([
        { name: "Home", url: "https://prontly.in" },
        { name: "Docs", url: "https://prontly.in/docs" },
        { name: article.title, url: `https://prontly.in/docs/${article.slug}` },
      ]),
    ],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
