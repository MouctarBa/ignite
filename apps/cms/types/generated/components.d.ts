import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAboutHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_about_heroes';
  info: {
    displayName: 'aboutHero';
  };
  attributes: {
    background: Schema.Attribute.Media<'images'>;
    description1: Schema.Attribute.Text;
    description2: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
  };
}

export interface SharedAward extends Struct.ComponentSchema {
  collectionName: 'components_shared_awards';
  info: {
    displayName: 'award';
  };
  attributes: {
    alt: Schema.Attribute.String;
    label: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedExperience extends Struct.ComponentSchema {
  collectionName: 'components_shared_experiences';
  info: {
    displayName: 'experience';
  };
  attributes: {
    dates: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    website: Schema.Attribute.String;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    newsletter: Schema.Attribute.Boolean;
    newsletterHeading: Schema.Attribute.String & Schema.Attribute.Required;
    newsletterSubtext: Schema.Attribute.Text & Schema.Attribute.Required;
    socialLinks: Schema.Attribute.Component<'shared.social-link', true>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    displayUrl: Schema.Attribute.String;
  };
}

export interface SharedPressItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_press_items';
  info: {
    displayName: 'pressItem';
  };
  attributes: {
    category: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'socialLink';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'LinkedIn', 'Email']
    > &
      Schema.Attribute.Required;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.about-hero': SharedAboutHero;
      'shared.award': SharedAward;
      'shared.experience': SharedExperience;
      'shared.footer': SharedFooter;
      'shared.link': SharedLink;
      'shared.press-item': SharedPressItem;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
