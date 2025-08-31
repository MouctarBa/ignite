import type { Schema, Struct } from '@strapi/strapi';

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.footer-link', true>;
    newsletter: Schema.Attribute.Boolean;
    newsletterHeading: Schema.Attribute.String & Schema.Attribute.Required;
    newsletterSubtext: Schema.Attribute.Text & Schema.Attribute.Required;
    socialLinks: Schema.Attribute.Component<'shared.social-link', true>;
  };
}

export interface SharedFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_links';
  info: {
    displayName: 'footerLink';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
  };
}

export interface SharedNavigation extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigations';
  info: {
    displayName: 'navigation';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
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
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetRegex<'^https://'>;
    icon: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'LinkedIn', 'Email']
    > & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.footer': SharedFooter;
      'shared.footer-link': SharedFooterLink;
      'shared.navigation': SharedNavigation;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
